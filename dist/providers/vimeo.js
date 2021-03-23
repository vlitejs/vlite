(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vlitejsVimeo"] = factory();
	else
		root["vlitejsVimeo"] = factory();
})(globalThis, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!********************************!*\
  !*** ./src/providers/vimeo.js ***!
  \********************************/


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

if (typeof vlitejs === 'undefined') {
  throw new TypeError('vlitejs :: The library is not available.');
}

let vimeoQueue = [];
/**
 * vlitejs Player Vimeo
 * @module vlitejs/Player/PlayerVimeo
 */

class PlayerVimeo extends vlitejs.Player {
  /**
   * Instanciate the constructor
   * @constructor
   * @param {HTMLElement} element Player HTML element
   * @param {Object} options Player options
   * @param {Function} onReady Callback function executed when the player is ready
   */
  constructor({
    element,
    options,
    onReady
  }) {
    // Init Player class
    super({
      element,
      options,
      onReady
    });
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onVideoEnded = this.onVideoEnded.bind(this);
    this.onPlaying = this.onPlaying.bind(this);
    this.onWaiting = this.onWaiting.bind(this);
    this.onSeeking = this.onSeeking.bind(this);
    this.onSeeked = this.onSeeked.bind(this);
  }

  isApiReady() {
    return new window.Promise(resolve => {
      if (typeof window.Vimeo !== 'undefined') {
        resolve();
      } else {
        vimeoQueue.push(this);
      }
    });
  }

  initReady() {
    super.initReady(); // Init Vimeo player with API

    this.initVimeoPlayer();
  }
  /**
   * Initialize the Vimeo player
   */


  initVimeoPlayer() {
    this.instancePlayer = new window.Vimeo.Player(this.element.getAttribute('id'), {
      id: this.element.getAttribute('data-vimeo-id'),
      controls: true
    });
    this.instancePlayer.ready().then(this.onPlayerReady());
  }
  /**
   * Function executed when the player is ready
   */


  onPlayerReady() {
    this.element = this.instancePlayer.element;
    super.playerIsReady();
    this.addSpecificEvents();
  }
  /**
   * Create event listeners
   * All listeners are created on class properties to facilitate the deletion of events
   */


  addSpecificEvents() {
    if (this.options.controls) {
      if (this.options.time) {
        // On durationchange event, update duration if value is different
        this.instancePlayer.on('durationchange', this.updateDuration);
      } // On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar


      this.instancePlayer.on('timeupdate', this.onTimeUpdate);
    } // On ended event, show poster and reset progressBar and time


    this.instancePlayer.on('ended', this.onVideoEnded);
    this.instancePlayer.on('playing', this.onPlaying);
    this.instancePlayer.on('waiting', this.onWaiting);
    this.instancePlayer.on('seeking', this.onSeeking);
    this.instancePlayer.on('seeked', this.onSeeked);
  }
  /**
   * Get the player instance
   * @returns {Object} Vimeo API instance
   */


  getInstance() {
    return this.instancePlayer;
  }
  /**
   * Get the player current time
   * @returns {Float|Integer} Current time of the video
   */


  getCurrentTime() {
    return new window.Promise(resolve => {
      this.instancePlayer.getCurrentTime().then(seconds => resolve(seconds));
    });
  }
  /**
   * Set the new current time for the player
   * @param {Float|Integer} Current time video
   */


  setCurrentTime(newTime) {
    this.instancePlayer.setCurrentTime(newTime);
  }
  /**
   * Get the player duration
   * @returns {Float|Integer} Duration of the video
   */


  getDuration() {
    return new window.Promise(resolve => {
      this.instancePlayer.getDuration().then(duration => resolve(duration));
    });
  }
  /**
   * Function executed on the video progress changed
   * @param {Object} e Event listener datas
   */


  onProgressChanged(e) {
    this.getDuration().then(duration => {
      this.setCurrentTime(e.target.value * duration / 100);
    });
  }
  /**
   * Play method of the player
   */


  methodPlay() {
    this.instancePlayer.play();
  }
  /**
   * Pause method of the player
   */


  methodPause() {
    this.instancePlayer.pause();
  }
  /**
   * Mute method of the player
   */


  methodMute() {
    this.instancePlayer.setVolume(0);
  }
  /**
   * Unmute method of the player
   */


  methodUnMute() {
    this.instancePlayer.setVolume(1);
  }
  /**
   * Function executed when the video is waiting
   */


  onWaiting() {
    this.loading(true);
  }
  /**
   * Function executed when the video is playing
   */


  onPlaying() {
    this.loading(false);
  }
  /**
   * Function executed when the video is seeking
   */


  onSeeking() {
    this.loading(true);
  }
  /**
   * Function executed when the video seek is done
   */


  onSeeked() {
    this.loading(false);
  }
  /**
   * Unbind event listeners
   */


  removeSpecificEvents() {
    this.options.time && this.instancePlayer.off('durationchange', this.updateDuration);
    this.instancePlayer.off('timeupdate', this.onTimeUpdate);
    this.instancePlayer.off('playing', this.onPlaying);
    this.instancePlayer.off('waiting', this.onWaiting);
    this.instancePlayer.off('seeking', this.onSeeking);
    this.instancePlayer.off('seeked', this.onSeeked);
    this.instancePlayer.off('ended', this.onVideoEnded);
  }
  /**
   * Remove the Vimeo instance
   */


  removeInstance() {
    this.instancePlayer.destroy();
  }

}

function onVimeoApiReady() {
  vimeoQueue.forEach(item => item.initReady());
  vimeoQueue = [];
}

if (typeof window.YT === 'undefined') {
  const script = document.createElement('script');
  script.async = true;
  script.type = 'text/javascript';
  script.src = 'https://player.vimeo.com/api/player.js';

  script.onload = () => onVimeoApiReady();

  document.getElementsByTagName('body')[0].appendChild(script);
}

var _default = PlayerVimeo;
exports.default = _default;
})();

__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=vimeo.js.map