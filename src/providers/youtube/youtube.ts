import type { playerParameters } from 'shared/assets/types/types.js'

/**
 * Normalized text track shape shared across providers.
 */
type NormalizedTextTrack = {
	language: string
	label: string
	kind: string
	mode: string
}

declare global {
	interface Window {
		Vlitejs: {
			Player: any
		}
		VlitejsYoutubeQueue: any[]
		YT: {
			Player: any
			PlayerState: {
				BUFFERING: number
				ENDED: number
				PLAYING: number
				PAUSED: number
				UNSTARTED: number
			}
		}
		onYouTubeIframeAPIReady: () => void
	}
}

/**
 * The provider function returns the provider Class which is extended from vLitejs Player
 * @param Player
 * @returns Provider class extended from vLitejs Player
 */
export default function YoutubeProvider(Player: any) {
	const providerObjectName = 'YT'
	window.VlitejsYoutubeQueue = window.VlitejsYoutubeQueue || []

	// Load the player API if it is not available
	if (typeof window[providerObjectName] === 'undefined') {
		const script = document.createElement('script')
		script.async = true
		script.type = 'text/javascript'
		script.src = 'https://youtube.com/iframe_api'

		// Run the queue when the provider API is ready
		window.onYouTubeIframeAPIReady = () => {
			window.VlitejsYoutubeQueue.forEach((itemClass: any) => {
				itemClass.initYoutubePlayer().then(() => {
					itemClass.onReady()
				})
			})
			window.VlitejsYoutubeQueue = []
		}
		document.getElementsByTagName('body')[0].appendChild(script)
	}

	/**
	 * vlitejs Player Youtube
	 * @module vlitejs/Player/PlayerYoutube
	 */
	return class PlayerYoutube extends Player {
		params: object
		instance: any
		captionsModuleReady: Promise<any>
		captionsModuleResolve!: (value: any) => void

		constructor(props: playerParameters) {
			super(props)
			const DEFAULT_PARAMS = {
				autohide: 1,
				controls: 0,
				fs: this.options.fullscreen ? 1 : 0,
				modestbranding: 0,
				playsinline: this.options.playsinline ? 1 : 0,
				rel: 0,
				showinfo: 0,
				wmode: 'transparent'
			}
			this.params = { ...DEFAULT_PARAMS, ...this.options.providerParams }
			this.captionsModuleReady = new window.Promise((resolve) => {
				this.captionsModuleResolve = resolve
			})
		}

		/**
		 * Initialize the player when the API is ready
		 */
		init() {
			this.waitUntilVideoIsReady().then(() => {
				super.onReady()
			})
		}

		/**
		 * Wait until the API is ready
		 * @returns The player is ready
		 */
		waitUntilVideoIsReady(): Promise<void> {
			return new window.Promise((resolve) => {
				// Initialize the player if the API is already available
				if (typeof window[providerObjectName] !== 'undefined') {
					this.initYoutubePlayer().then(resolve)
				} else {
					window.VlitejsYoutubeQueue.push(this)
				}
			})
		}

		/**
		 * Initialize the player
		 */
		initYoutubePlayer(): Promise<void> {
			return new window.Promise((resolve) => {
				this.instance = new window.YT.Player(this.media.getAttribute('id'), {
					videoId: this.media.getAttribute('data-youtube-id'),
					height: '100%',
					width: '100%',
					playerVars: this.params,
					origin: window.location.origin,
					events: {
						onReady: (data: any) => {
							this.media = data.target.getIframe()
							resolve()
						},
						onStateChange: (e: Event) => this.onPlayerStateChange(e),
						onApiChange: () => this.onApiChange()
					}
				})
			})
		}

		/**
		 * Function executed when the player state changed
		 * @param e Event listener datas
		 */
		onPlayerStateChange(e: any) {
			this.rafPlaying && window.cancelAnimationFrame(this.rafPlaying)

			switch (e.data) {
				case window.YT.PlayerState.ENDED:
					super.onMediaEnded()
					break

				case window.YT.PlayerState.PLAYING:
					super.loading(false)
					this.options.controls && window.requestAnimationFrame(this.onRafPlaying.bind(this))
					break

				case window.YT.PlayerState.BUFFERING:
					super.loading(true)
					break
			}
		}

		/**
		 * On request animation frame while the video is playing
		 */
		onRafPlaying() {
			super.onTimeUpdate()

			// Re-trigger the RAF only if the video is playing
			if (!this.isPaused) {
				this.rafTimeout = setTimeout(() => {
					this.rafPlaying = window.requestAnimationFrame(this.onRafPlaying.bind(this))
				}, 100)
			}
		}

		/**
		 * Get the player instance
		 * @returns Youtube API instance
		 */
		getInstance(): any {
			return this.instance
		}

		/**
		 * Function executed when the player API modules change (e.g. captions module loaded)
		 * Resolves the captions module promise so text tracks can be queried
		 */
		onApiChange() {
			const modules = this.instance.getOptions()
			if (modules && modules.indexOf('captions') !== -1) {
				this.captionsModuleResolve(true)
				this.dispatchEvent('texttracksready')
			}
		}

		/**
		 * Get the available text tracks
		 * @returns Normalized text tracks
		 */
		getTextTracks(): Promise<NormalizedTextTrack[]> {
			return window.Promise.race([
				this.captionsModuleReady,
				new window.Promise((resolve) => setTimeout(() => resolve([]), 5000))
			]).then(() => {
				const tracklist = this.instance.getOption('captions', 'tracklist') || []
				return tracklist.map((track: any) => ({
					language: track.languageCode || '',
					label: track.displayName || track.languageName || track.languageCode || '',
					kind: track.kind || 'subtitles',
					mode: track.is_default ? 'showing' : 'disabled'
				}))
			})
		}

		/**
		 * Enable a text track by language
		 * @param language Language code of the track
		 * @param kind Optional track kind
		 */
		enableTextTrack(language: string, _kind?: string): Promise<void> {
			this.instance.setOption('captions', 'track', { languageCode: language })
			return window.Promise.resolve()
		}

		/**
		 * Disable all text tracks
		 */
		disableTextTrack(): Promise<void> {
			this.instance.setOption('captions', 'track', {})
			return window.Promise.resolve()
		}

		/**
		 * Get the player current time
		 * @returns Current time of the video
		 */
		getCurrentTime(): Promise<number> {
			return new window.Promise((resolve) => resolve(this.instance.getCurrentTime()))
		}

		/**
		 * Get the player duration
		 * @returns Duration of the video
		 */
		getDuration(): Promise<number> {
			return new window.Promise((resolve) => resolve(this.instance.getDuration()))
		}

		/**
		 * Change source method of the player
		 * {@link https://developers.google.com/youtube/iframe_api_reference#loadVideoById}
		 */
		methodSetSource(id: string) {
			this.instance.loadVideoById(id)
		}

		/**
		 * Play method of the player
		 */
		methodPlay() {
			this.instance.playVideo()
		}

		/**
		 * Pause method of the player
		 */
		methodPause() {
			this.instance.pauseVideo()
		}

		/**
		 * Set volume method of the player
		 * @param volume New volume
		 */
		methodSetVolume(volume: number) {
			this.instance.setVolume(volume * 100)
		}

		/**
		 * Get volume method of the player
		 * @returns Player volume
		 */
		methodGetVolume(): Promise<number> {
			return new window.Promise((resolve) => resolve(this.instance.getVolume() / 100))
		}

		/**
		 * Mute method of the player
		 */
		methodMute() {
			this.instance.mute()
		}

		/**
		 * Unmute method of the player
		 */
		methodUnMute() {
			this.instance.unMute()
		}

		/**
		 * Set the new current time for the player
		 * @param Current time video
		 */
		methodSeekTo(newTime: number) {
			// Youtube triggers the play when the video is not yet started
			// Video should be muted according to autoplay policy
			if (this.isPaused === null && !this.options.muted) {
				this.mute()
				this.play()
			}

			this.instance.seekTo(newTime)

			// The function can be trigger by the tabulation and Youtube does not have the "timeupdate" event
			// Trigger the "timeupdate" to update the progress bar
			super.onTimeUpdate()
		}

		/**
		 * Remove the Youtube player (instance, timer)
		 */
		destroy() {
			clearTimeout(this.rafTimeout)
			this.instance.destroy()
			super.destroy()
		}
	}
}
