// Import SVG icons
import svgBigPlay from '../svg/big-play.svg';
import svgPlay from '../svg/play.svg';
import svgPause from '../svg/pause.svg';
import svgVolumeHigh from '../svg/volume-high.svg';
import svgVolumeMute from '../svg/volume-mute.svg';
import svgFullscreen from '../svg/fullscreen.svg';
import svgFullscreenExit from '../svg/fullscreen-exit.svg';

/**
 * vlitejs Player
 * @module vlitejs/Player
 */
export default class Player {
	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {String|Object} selector CSS selector or query selector
	 * @param {Object} options Player options
	 * @param {Function} callback Callback function executed when the player is ready
	 */
	constructor({ selector, options, callback }) {
		this.callback = callback;
		this.isFullScreen = false;
		this.isPaused = null;
		this.player = selector;
		this.touchSupport = this.isTouch();
		this.skinDisabled = false;
		this.delayAutoHide = 3000;

		let customOptions = {};

		const DEFAULT_OPTIONS = {
			autoplay: false,
			controls: true,
			playPause: true,
			timeline: true,
			time: true,
			volume: true,
			fullscreen: true,
			poster: null,
			bigPlay: true,
			autoHide: false,
			nativeControlsForTouch: false,
			playsinline: true
		};

		// Check if options have gone through DOM with data attribute
		if (this.player.hasAttribute('data-options')) {
			// Check if there is a conflict with the constructor options
			if (options !== undefined) {
				console.warn(`vLitejs :: Option passed in '${selector}' by data attribute is priority over object in constructor.`);
			}

			customOptions = JSON.parse(this.player.getAttribute('data-options'));
		} else {
			// No conflict, we can use options in the constructor
			customOptions = options;
		}

		this.options = Object.assign({}, DEFAULT_OPTIONS, customOptions)

		// Keep player native control and disable custom skin
		if (this.options.nativeControlsForTouch) {
			this.skinDisabled = true;
			this.player.setAttribute('controls', 'controls');
			this.options.controls = false;
		}

		// Add play inline attribute
		if (this.options.playsinline) {
			this.player.setAttribute('playsinline', true);
			this.player.setAttribute('webkit-playsinline', true);
		}

		// Check fullscreen support API on different browsers and cached prefixs
		this.supportFullScreen = this.constructor.checkSupportFullScreen();

		this.buildPlayer();
		this.bindEvents();
	}

	/**
	 * Build the DOM of the player
	 */
	buildPlayer() {
		// Create a wrapper for each player
		const wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'v-vlite v-firstStart v-paused v-loading');
		wrapper.setAttribute('tabindex', 0);
		this.player.parentNode.insertBefore(wrapper, this.player);
		wrapper.appendChild(this.player);
		this.wrapperPlayer = this.player.parentNode;
		this.player.setAttribute('data-v-togglePlayPause', '');

		if (this.skinDisabled) {
			this.wrapperPlayer.classList.add('v-forceControls');
		}

		const cssstylePoster = this.options.poster !== null ? `background-image: url(${this.options.poster});` : "";

		const htmlControls = `${!this.options.nativeControlsForTouch ?
								`<div class="v-overlayVideo" data-v-togglePlayPause>
									${!this.touchSupport ?
										`<div class="v-overlayLeft" data-v-fastForward data-direction="left"></div>
										<div class="v-overlayRight" data-v-fastForward data-direction="right"></div>`
									: ``}
								</div>`
							: ``}
							<div class="v-loader">
								<div class="v-loaderContent">
									<div class="v-loaderBounce1"></div>
									<div class="v-loaderBounce2"></div>
									<div class="v-loaderBounce3"></div>
								</div>
							</div>
							<div class="v-poster v-active" data-v-togglePlayPause style="${cssstylePoster}"></div>
							${this.options.bigPlay ?
								`<div class="v-bigPlayButton" data-v-togglePlayPause>
									 <span class="v-playerIcon v-iconBigPlay">${svgBigPlay}</span>
								</div>`
							: ``}
							${this.options.controls ?
								`<div class="v-controlBar">
									${this.options.timeline ?
										`<div class="v-progressBar">
											<div class="v-progressSeek"></div>
											<input type="range" class="v-progressInput" min="0" max="100" step="0.01" value="0" orient="horizontal" />
										</div>`
									: ``}
									<div class="v-controlBarContent">
										${this.options.playPause ?
											`<div class="v-playPauseButton" data-v-togglePlayPause>
												<span class="v-playerIcon v-iconPlay">${svgPlay}</span>
												<span class="v-playerIcon v-iconPause">${svgPause}</span>
											</div>`
										: ``}
										${this.options.time ?
											`<div class="v-time">
												<span class="v-currentTime">00:00</span>&nbsp;/&nbsp;<span class="v-duration"></span>
											</div>`
										: ``}
										${this.options.volume ?
											`<div class="v-volume">
												<span class="v-playerIcon v-iconVolumeHigh">${svgVolumeHigh}</span>
												<span class="v-playerIcon v-iconVolumeMute">${svgVolumeMute}</span>
											</div>`
										: ``}
										${this.options.fullscreen ?
											`<div class="v-fullscreen">
												<span class="v-playerIcon v-iconFullscreen">${svgFullscreen}</span>
												<span class="v-playerIcon v-iconShrink">${svgFullscreenExit}</span>
											</div>`
										: ``}
									</div>
								</div>`
								: ``
							}`;

		wrapper.insertAdjacentHTML('beforeend', htmlControls);
	}

	/**
	 * Create event listeners
	 * All listeners are created on class properties to facilitate the deletion of events
	 */
	bindEvents() {
		if (this.options.controls && this.options.timeline) {
			// Create progress bar event listener
			this.onChangeProgressBar = e => {
				this.onProgressChanged(e);
			};
			this.wrapperPlayer.querySelector('.v-progressInput').addEventListener('change', this.onChangeProgressBar, false);
		}

		// Create play/pause button event listener
		this.onClickTogglePlayPause = e => {
			e.preventDefault();
			this.togglePlayPause();
		};
		const playPauseButtons = this.wrapperPlayer.querySelectorAll('[data-v-togglePlayPause]');
		playPauseButtons.forEach(button => {
			button.addEventListener('click', this.onClickTogglePlayPause, false);
		});

		// Create double click to fast-forward video current time (only on desktop, mobile doesn't support event)
		if (!this.touchSupport) {
			this.onDblclickFastForward = e => {
				e.preventDefault();
				this.fastForward(e);
			};
			const fastForwardButtons = [...this.wrapperPlayer.querySelectorAll('[data-v-fastForward]')]
			fastForwardButtons.forEach(button => {
				button.addEventListener('dblclick', this.onDblclickFastForward, false);
			});
		}

		if (this.options.controls && this.options.volume) {
			// Create volume button event listener
			this.onCLickToggleVolume = e => {
				e.preventDefault();
				this.toggleVolume();
			};
			this.wrapperPlayer.querySelector('.v-volume').addEventListener('click', this.onCLickToggleVolume, false);
		}

		if (this.options.controls && this.options.fullscreen) {
			// Create fullscreen button event listener
			this.onClickToggleFullscreen = e => {
				e.preventDefault();
				this.toggleFullscreen();
			};
			this.wrapperPlayer.querySelector('.v-fullscreen').addEventListener('click', this.onClickToggleFullscreen, false);

			// Create double click event to trigger fullscreen change
			this.onDblclickVideo = e => {
				e.preventDefault();
				// Prevent double click to fast-forward video current time
				if (e.target.classList.contains('[data-v-fastForward]')) return;
				this.toggleFullscreen();
			};
			this.wrapperPlayer.querySelector('.v-overlayVideo').addEventListener('dblclick', this.onDblclickVideo, false);
		}

		if (this.options.controls) {
			this.onKeyupEvent = e => {
				this.onKeyup(e);
			};
			this.wrapperPlayer.addEventListener('keyup', this.onKeyupEvent, false);

			this.onMousemoveEvent = e => {
				this.onMousemove(e);
			};
			this.wrapperPlayer.addEventListener('mousemove', this.onMousemoveEvent, false);
		}

		// Create fullscreen button event listener
		// Detect fullscreen change, particulary util for esc key because state is not updated
		// More information on MDN : https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
		this.onChangeFullScreen = e => {
			if (!document[this.supportFullScreen.isFullScreen] && this.isFullScreen) {
				this.exitFullscreen(e.target);
			}
		};
		window.addEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen, false);
	}

	/**
	 * Function executed when the player is ready
	 */
	playerIsReady() {
		this.loading(false);

		// Execute the constructor callback
		if (typeof this.callback === 'function') {
			this.callback(this);
		}

		// If player has autoplay option, play now
		if (this.options.autoplay) {

			// Autoplay on video is authorize only when the video is muted
			if(!this.player.muted){
				this.mute();
				console.warn(`vLitejs :: Video muted to authorize autoplay option`);
			}

			this.togglePlayPause();
		}
	}

	/**
	 * Update the loader status
	 * @param {Boolean} state Status of the loader
	 */
	loading(state) {
		if (state) {
			this.wrapperPlayer.classList.add('v-loading');
		} else {
			this.wrapperPlayer.classList.remove('v-loading');
		}
	}

	/**
	 * Update player duration
	 */
	updateDuration() {
		this.wrapperPlayer.querySelector('.v-duration').innerHTML = this.constructor.formatVideoTime(this.getDuration());
	}

	/**
	 * Function executed when is video is ended
	 */
	onVideoEnded() {
		this.wrapperPlayer.classList.replace('v-playing', 'v-paused');
		this.wrapperPlayer.classList.add('v-firstStart');
		this.wrapperPlayer.querySelector('.v-poster').classList.add('v-active');

		if (this.options.constrols) {
			this.wrapperPlayer.querySelector('.v-progressSeek').style.width = '0%';
			this.wrapperPlayer.querySelector('.v-progressInput').setAttribute('value', 0);
			this.wrapperPlayer.querySelector('.v-currentTime').innerHTML = '00:00';
		}
	}

	/**
	 * Function executed to toggle the video status (play, pause)
	 */
	togglePlayPause() {
		if (this.wrapperPlayer.classList.contains('v-paused')) {
			this.play();
		} else {
			this.pause();
		}
	}

	/**
	 * Trigger the video fast forward (front and rear)
	 * @param {Object} e Event listener datas
	 */
	fastForward(e) {
		if (e.target.getAttribute('data-direction') === 'left') {
			this.seekTo(this.getCurrentTime() - 10);
		} else {
			this.seekTo(this.getCurrentTime() + 10);
		}
	}

	/**
	 * Play the video
	 */
	play() {
		if (this.wrapperPlayer.classList.contains('v-firstStart')) {
			this.wrapperPlayer.classList.remove('v-firstStart');
			this.wrapperPlayer.querySelector('.v-poster').classList.remove('v-active');
		}

		this.methodPlay();
		this.isPaused = false;
		this.afterPlayPause();
	}

	/**
	 * Pause the video
	 */
	pause() {
		this.methodPause();
		this.isPaused = true;
		this.afterPlayPause();
	}

	/**
	 * Function executed after the play or pause method
	 */
	afterPlayPause() {
		if (this.isPaused) {
			this.wrapperPlayer.classList.replace('v-playing', 'v-paused');
		} else {
			this.wrapperPlayer.classList.replace('v-paused', 'v-playing');
		}

		if (this.options.autoHide && this.options.controls) {
			if (this.isPaused) {
				this.wrapperPlayer.querySelector('.v-controlBar').classList.remove('hidden');
			} else {
				this.timerAutoHide = setTimeout(() => {
					this.wrapperPlayer.querySelector('.v-controlBar').classList.add('hidden');
				}, this.delayAutoHide);
			}
		}
	}

	/**
	 * Toggle the volume on the video
	 */
	toggleVolume() {
		const volumeButton = this.wrapperPlayer.querySelector('.v-volume');

		if (volumeButton.classList.contains('v-muted')) {
			this.unMute();
		} else {
			this.mute();
		}
	}

	/**
	 * Mute the volume on the video
	 */
	mute() {
		this.methodMute();
		this.wrapperPlayer.querySelector('.v-volume').classList.add('v-muted');
	}

	/**
	 * Toggle the volume on the video
	 */
	unMute() {
		this.methodUnMute();
		this.wrapperPlayer.querySelector('.v-volume').classList.remove('v-muted');
	}

	/**
	 * Update the current time of the video
	 * @param {Float|Integer} newTime New current time of the video
	 */
	seekTo(newTime) {
		this.setCurrentTime(newTime);
	}

	/**
	 * Toggle the fullscreen of the video
	 */
	toggleFullscreen() {
		if (this.isFullScreen) {
			this.exitFullscreen();
		} else {
			this.requestFullscreen();
		}
	}

	/**
	 * Check fullscreen support API on different browsers and cached prefixs
	 */
	static checkSupportFullScreen() {
		let prefixs = ['', 'moz', 'webkit', 'ms', 'o'];
		let lengthPrefixs = prefixs.length;
		let requestFn;
		let cancelFn;
		let changeEvent;
		let isFullScreen;

		if (document.cancelFullscreen !== undefined) {
			requestFn = 'requestFullscreen';
			cancelFn = 'exitFullscreen';
			changeEvent = 'fullscreenchange';
		} else {
			while (lengthPrefixs--) {
				if ((prefixs[lengthPrefixs] !== 'moz' || document.mozFullScreenEnabled) && document[prefixs[lengthPrefixs] + 'CancelFullScreen'] !== undefined) {
					requestFn = prefixs[lengthPrefixs] + 'RequestFullScreen';
					cancelFn = prefixs[lengthPrefixs] + 'CancelFullScreen';
					changeEvent = prefixs[lengthPrefixs] + 'fullscreenchange';
					isFullScreen = prefixs[lengthPrefixs] === 'webkit' ? prefixs[lengthPrefixs] + 'IsFullScreen' : prefixs[lengthPrefixs] + 'FullScreen';
				}
			}
		}

		const fullscreen = {
			requestFn: requestFn,
			cancelFn: cancelFn,
			changeEvent: changeEvent,
			isFullScreen: isFullScreen
		};

		return requestFn ? fullscreen : false;
	}

	/**
	 * Request fullscreen after user action
	 */
	requestFullscreen() {
		const { requestFn } = this.supportFullScreen;

		if (this.player[requestFn]) {
			//Request fullscreen on parentNode player, to display custom controls
			this.player.parentNode[requestFn]();
			this.isFullScreen = true;
			this.wrapperPlayer.classList.add('v-fullscreen-display');
			this.wrapperPlayer.querySelector('.v-fullscreen').classList.add('v-exit');
		}
	}

	/**
	 * Exit fullscreen after user action
	 */
	exitFullscreen() {
		const { cancelFn } = this.supportFullScreen;

		if (document[cancelFn]) {
			document[cancelFn]();

			this.wrapperPlayer.classList.remove('v-fullscreen-display');
			this.wrapperPlayer.querySelector('.v-fullscreen').classList.remove('v-exit');

			this.isFullScreen = false;
		}
	}

	/**
	 * Function executed on keyup event listener
	 * Toggle the video on spacebar press
	 * @param {Object} e Event listener datas
	 */
	onKeyup(e) {
		if (e.keyCode === 32) {
			this.togglePlayPause();
		}
	}

	/**
	 * Function executed on mousemove event listener
	 * Toggle controls display on mousemove event
	 */
	onMousemove() {
		if (this.isPaused === false && this.options.autoHide && this.options.controls) {
			this.wrapperPlayer.querySelector('.v-controlBar').classList.remove('hidden');
			clearTimeout(this.timerAutoHide);

			this.timerAutoHide = setTimeout(() => {
				this.wrapperPlayer.querySelector('.v-controlBar').classList.add('hidden');
			}, this.delayAutoHide);
		}
	}

	/**
	 * Update current time displaying in the control bar and the width of the progress bar
	 */
	updateCurrentTime() {
		const currentTime = Math.round(this.getCurrentTime());
		const duration = this.getDuration();
		const width = (currentTime * 100) / duration;
		const timeElement = this.wrapperPlayer.querySelector('.v-currentTime');

		this.wrapperPlayer.querySelector('.v-progressSeek').style.width = `${width}%`;

		if (timeElement !== null) {
			timeElement.innerHTML = this.constructor.formatVideoTime(currentTime);
		}
	}

	/**
	 * Unbind event listeners
	 */
	unBindEvents() {
		const playPauseButtons = [...this.wrapperPlayer.querySelectorAll('[data-v-togglePlayPause]')]
		playPauseButtons.forEach(button => {
			button.removeEventListener('click', this.onClickTogglePlayPause);
		});
		this.onClickTogglePlayPause = null;

		if (!this.touchSupport) {
			const fastForwardButtons = [...this.wrapperPlayer.querySelectorAll('[data-v-fastForward]')]
			fastForwardButtons.forEach(button => {
				button.removeEventListener('dblclick', this.onDblclickFastForward);
			});
			this.onDblclickFastForward = null;
		}

		if (this.options.controls && this.options.timeline) {
			this.wrapperPlayer.querySelector('.v-progressInput').removeEventListener('change', this.onChangeProgressBar, false);
			this.onChangeProgressBar = null;
		}

		if (this.options.controls && this.options.volume) {
			this.wrapperPlayer.querySelector('.v-volume').removeEventListener('click', this.onCLickToggleVolume);
			this.onCLickToggleVolume = null;
		}

		if (this.options.controls) {
			this.wrapperPlayer.removeEventListener('keyup', this.onKeyupEvent);
			this.wrapperPlayer.removeEventListener('mousemove', this.onMousemoveEvent);
			this.onKeyupEvent = null;
			this.onMousemoveEvent = null;
		}

		if (this.options.controls && this.options.fullscreen) {
			this.wrapperPlayer.querySelector('.v-fullscreen').removeEventListener('click', this.onClickToggleFullscreen);
			this.wrapperPlayer.querySelector('.v-overlayVideo').removeEventListener('dblclick', this.onDblclickVideo);
			this.onClickToggleFullscreen = null;
			this.onDblclickVideo = null;
		}

		window.removeEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen);
	}

	/**
	 * Destroy the player
	 * Remove event listeners, player instance and player HTML
	 */
	destroy() {
		this.pause();
		this.unBindEvents();

		if (typeof this.unBindSpecificEvents === 'function') {
			this.unBindSpecificEvents();
		}

		if (typeof this.removeInstance === 'function') {
			this.removeInstance();
		}

		this.wrapperPlayer.remove();
	}

	/**
	 * Check if browser support touch event
	 * @returns {Boolean} Touch event support
	 */
	isTouch() {
		return 'ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch);
	}

	/**
	 * Convert video time second to 00:00 display
	 * @param {Float|Integer} time Current time
	 */
	static formatVideoTime(time) {
		const ms = time * 1000;
		const min = (ms / 1000 / 60) << 0;
		const sec = (ms / 1000) % 60 << 0;
		let timeInString = '';

		timeInString += min < 10 ? '0' : '';
		timeInString += min + ':';
		timeInString += sec < 10 ? '0' : '';
		timeInString += sec;

		return timeInString;
	}
}
