import Player from './player';

/**
 * vLite Player HTML5
 * @module vLite/Player/PlayerHtml5
 */
export default class PlayerHtml5 extends Player {
	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {String|Object} selector CSS selector or query selector
	 * @param {Object} options Player options
	 * @param {Function} callback Callback function executed when the player is ready
	 */
	constructor({selector, options, callback}) {

		// Init Player class
		super({
			selector: selector,
			options: options,
			callback: callback
		});

		// Create Promise to check when the video is ready
		this.waitUntilVideoIsReady().then(this.onPlayerReady.bind(this));

		if(!this.skinDisabled){
			this.bindSpecificEvents();
		}

	}

	/**
	 * Function executed when the player is ready
	 */
	onPlayerReady() {
		super.playerIsReady();
		this.updateDuration();
	}

	/**
	 * Wait until the video is ready
	 * @returns {Promise} Loading of the video with a Promise
	 */
	waitUntilVideoIsReady() {

		return new window.Promise((resolve, reject) => {

			// Check if the video is ready
			if (typeof this.player.duration === 'number' && isNaN(this.player.duration) === false) {
				resolve();
			} else {

				this.onDurationChange = () => {
					this.player.removeEventListener('durationchange', this.onDurationChange);
					this.player.removeEventListener('error', this.onError);

					resolve();
				};

				this.onError = (error) => {
					this.player.removeEventListener('error', this.onError);
					this.player.removeEventListener('durationchange', this.onDurationChange);

					reject(error);
				};

				// Listen error or durationchange events to detect when the video is ready
				this.player.addEventListener('durationchange', this.onDurationChange, false);
				this.player.addEventListener('error', this.onError, false);

			}

		});

	}

	/**
	 * Create event listeners
	 * All listeners are created on class properties to facilitate the deletion of events
	 */
	bindSpecificEvents() {

		if (this.options.controls){

			if(this.options.time) {

				//On durationchange event, update duration if value is different
				this.player.addEventListener('durationchange', (e) => this.updateDuration(e), false);

			}

			//On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar
			this.player.addEventListener('timeupdate', (e) => this.updateCurrentTime(e), false);

		}

		//On ended event, show poster and reset timeline and time
		this.player.addEventListener('ended', (e) => this.onVideoEnded(e), false);

		this.onPlayingEvent = () => {
			this.onPlaying();
		};
		this.player.addEventListener('playing', (e) => this.onPlayingEvent(e), false);

		this.onWaitingEvent = () => {
			this.onWaiting();
		};
		this.player.addEventListener('waiting', (e) => this.onWaitingEvent(e), false);

		this.onSeekingEvent = () => {
			this.onSeeking();
		};
		this.player.addEventListener('seeking', (e) => this.onSeekingEvent(e), false);

		this.onSeekedEvent = () => {
			this.onSeeked();
		};
		this.player.addEventListener('seeked', (e) => this.onSeekedEvent(e), false);

	}

	/**
	 * Get the player instance
	 * @returns {Object} Video element
	 */
	getInstance() {
		return this.player;
	}

	/**
	 * Get the player current time
	 * @returns {Float|Integer} Current time of the video
	 */
	getCurrentTime() {
		return this.player.currentTime;
	}

	/**
	 * Set the new current time for the player
	 * @param {Float|Integer} Current time video
	 */
	setCurrentTime(newTime) {
		this.player.currentTime = newTime;
	}

	/**
	 * Get the player duration
	 * @returns {Float|Integer} Duration of the video
	 */
	getDuration() {
		return this.player.duration;
	}

	/**
	 * Function executed on the video progress changed
	 * @param {Object} e Event listener datas
	 */
	onProgressChanged(e) {
		this.setCurrentTime((e.target.value * this.getDuration()) / 100);
	}

	/**
	 * Play method of the player
	 */
	methodPlay() {
		this.player.play();
	}

	/**
	 * Pause method of the player
	 */
	methodPause() {
		this.player.pause();
	}

	/**
	 * Mute method of the player
	 */
	methodMute() {
		this.player.muted = true;
	}

	/**
	 * Unmute method of the player
	 */
	methodUnMute() {
		this.player.muted = false;
	}

	/**
	 * Function executed when the video is waiting
	 */
	onWaiting(){
		this.loading(true);
	}

	/**
	 * Function executed when the video is playing
	 */
	onPlaying(){
		this.loading(false);
	}

	/**
	 * Function executed when the video is seeking
	 */
	onSeeking(){
		this.loading(true);
	}

	/**
	 * Function executed when the video seek is done
	 */
	onSeeked(){
		this.loading(false);
	}

	/**
	 * Unbind event listeners
	 */
	unBindSpecificEvents() {

		if (this.options.time) {
			this.player.removeEventListener('durationchange', this.updateDuration);
		}

		this.player.removeEventListener('timeupdate', this.updateCurrentTime);
		this.player.removeEventListener('playing', this.onPlaying);
		this.player.removeEventListener('waiting', this.onWaiting);
		this.player.removeEventListener('seeking', this.onSeeking);
		this.player.removeEventListener('seeked', this.onSeeked);
		this.player.removeEventListener('ended', this.onVideoEnded);

	}

}
