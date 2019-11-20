(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vlitejs"] = factory();
	else
		root["vlitejs"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/vlite/config.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/vlite/config.js":
/*!*****************************!*\
  !*** ./src/vlite/config.js ***!
  \*****************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vlite = _interopRequireDefault(__webpack_require__(/*! ./js/vlite.js */ "./src/vlite/js/vlite.js"));

__webpack_require__(/*! ./css/reset.css */ "./src/vlite/css/reset.css");

__webpack_require__(/*! ./css/vars.css */ "./src/vlite/css/vars.css");

__webpack_require__(/*! ./css/loader.css */ "./src/vlite/css/loader.css");

__webpack_require__(/*! ./css/controls.css */ "./src/vlite/css/controls.css");

__webpack_require__(/*! ./css/player.css */ "./src/vlite/css/player.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import JS
// Import CSS
var _default = _vlite.default;
exports.default = _default;

/***/ }),

/***/ "./src/vlite/css/controls.css":
/*!************************************!*\
  !*** ./src/vlite/css/controls.css ***!
  \************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/vlite/css/loader.css":
/*!**********************************!*\
  !*** ./src/vlite/css/loader.css ***!
  \**********************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/vlite/css/player.css":
/*!**********************************!*\
  !*** ./src/vlite/css/player.css ***!
  \**********************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/vlite/css/reset.css":
/*!*********************************!*\
  !*** ./src/vlite/css/reset.css ***!
  \*********************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/vlite/css/vars.css":
/*!********************************!*\
  !*** ./src/vlite/css/vars.css ***!
  \********************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/vlite/js/player-html5.js":
/*!**************************************!*\
  !*** ./src/vlite/js/player-html5.js ***!
  \**************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _player = _interopRequireDefault(__webpack_require__(/*! ./player */ "./src/vlite/js/player.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * vlitejs Player HTML5
 * @module vlitejs/Player/PlayerHtml5
 */
class PlayerHtml5 extends _player.default {
  /**
   * Get the type of the player
   */
  get type() {
    return 'html5';
  }
  /**
   * Instanciate the constructor
   * @constructor
   * @param {String|Object} selector CSS selector or query selector
   * @param {Object} options Player options
   * @param {Function} callback Callback function executed when the player is ready
   */


  constructor({
    selector,
    options,
    callback
  }) {
    // Init Player class
    super({
      selector: selector,
      options: options,
      callback: callback
    }); // Create Promise to check when the video is ready

    this.waitUntilVideoIsReady().then(this.onPlayerReady.bind(this));

    if (!this.skinDisabled) {
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

        this.onError = error => {
          this.player.removeEventListener('error', this.onError);
          this.player.removeEventListener('durationchange', this.onDurationChange);
          reject(error);
        }; // Listen error or durationchange events to detect when the video is ready


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
    if (this.options.controls) {
      if (this.options.time) {
        //On durationchange event, update duration if value is different
        this.player.addEventListener('durationchange', e => this.updateDuration(e), false);
      } //On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar


      this.player.addEventListener('timeupdate', e => this.updateCurrentTime(e), false);
    } //On ended event, show poster and reset timeline and time


    this.player.addEventListener('ended', e => this.onVideoEnded(e), false);

    this.onPlayingEvent = () => {
      this.onPlaying();
    };

    this.player.addEventListener('playing', e => this.onPlayingEvent(e), false);

    this.onWaitingEvent = () => {
      this.onWaiting();
    };

    this.player.addEventListener('waiting', e => this.onWaitingEvent(e), false);

    this.onSeekingEvent = () => {
      this.onSeeking();
    };

    this.player.addEventListener('seeking', e => this.onSeekingEvent(e), false);

    this.onSeekedEvent = () => {
      this.onSeeked();
    };

    this.player.addEventListener('seeked', e => this.onSeekedEvent(e), false);
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
    this.setCurrentTime(e.target.value * this.getDuration() / 100);
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
    this.player.setAttribute('muted', '');
  }
  /**
   * Unmute method of the player
   */


  methodUnMute() {
    this.player.muted = false;
    this.player.removeAttribute('muted');
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

exports.default = PlayerHtml5;

/***/ }),

/***/ "./src/vlite/js/player-youtube.js":
/*!****************************************!*\
  !*** ./src/vlite/js/player-youtube.js ***!
  \****************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _player = _interopRequireDefault(__webpack_require__(/*! ./player */ "./src/vlite/js/player.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * vlitejs Player Youtube
 * @module vlitejs/Player/PlayerYoutube
 */
class PlayerYoutube extends _player.default {
  /**
   * Get the type of the player
   */
  get type() {
    return 'youtube';
  }
  /**
   * Instanciate the constructor
   * @constructor
   * @param {String|Object} selector CSS selector or query selector
   * @param {Object} options Player options
   * @param {Function} callback Callback function executed when the player is ready
   */


  constructor({
    selector,
    options,
    callback
  }) {
    // Init Player class
    super({
      selector: selector,
      options: options,
      callback: callback
    }); // Init Youtube player with API

    this.initYoutubePlayer();
  }
  /**
   * Initialize the Youtube player
   */


  initYoutubePlayer() {
    this.instancePlayer = new window.YT.Player(this.player.getAttribute('id'), {
      videoId: this.player.getAttribute('data-youtube-id'),
      height: '100%',
      width: '100%',
      playerVars: {
        'showinfo': 0,
        'modestbranding': 0,
        'autohide': 1,
        'rel': 0,
        'fs': this.options.fullscreen ? 1 : 0,
        'wmode': 'transparent',
        'playsinline': this.options.playsinline ? 1 : 0,
        'controls': this.skinDisabled ? 1 : 0
      },
      events: {
        'onReady': data => this.onPlayerReady(data),
        'onStateChange': state => this.onPlayerStateChange(state)
      }
    });
  }
  /**
   * Function executed when the player is ready
   * @param {Object} data Youtube datas from the player API
   */


  onPlayerReady(data) {
    this.player = data.target.getIframe();
    super.playerIsReady();
  }
  /**
   * Get the player instance
   * @returns {Object} Youtube API instance
   */


  getInstance() {
    return this.instancePlayer;
  }
  /**
   * Function executed when the player state changed
   * @param {Object} e Event listener datas
   */


  onPlayerStateChange(e) {
    switch (e.data) {
      case window.YT.PlayerState.UNSTARTED:
        if (this.options.controls && this.options.time) {
          super.updateDuration();
        }

        break;

      case window.YT.PlayerState.ENDED:
        super.onVideoEnded();
        break;

      case window.YT.PlayerState.PLAYING:
        this.loading(false);

        if (this.options.controls) {
          setInterval(() => {
            super.updateCurrentTime();
          }, 100);
        }

        super.afterPlayPause('play');
        break;

      case window.YT.PlayerState.PAUSED:
        super.afterPlayPause('pause');
        break;

      case window.YT.PlayerState.BUFFERING:
        this.loading(true);
        break;
    }
  }
  /**
   * Set the new current time for the player
   * @param {Float|Integer} Current time video
   */


  setCurrentTime(newTime) {
    this.instancePlayer.seekTo(newTime);
  }
  /**
   * Get the player current time
   * @returns {Float|Integer} Current time of the video
   */


  getCurrentTime() {
    return this.instancePlayer.getCurrentTime();
  }
  /**
   * Get the player duration
   * @returns {Float|Integer} Duration of the video
   */


  getDuration() {
    return this.instancePlayer.getDuration();
  }
  /**
   * Function executed on the video progress changed
   * @param {Object} e Event listener datas
   */


  onProgressChanged(e) {
    this.setCurrentTime(e.target.value * this.getDuration() / 100);
  }
  /**
   * Play method of the player
   */


  methodPlay() {
    this.instancePlayer.playVideo();
  }
  /**
   * Pause method of the player
   */


  methodPause() {
    this.instancePlayer.pauseVideo();
  }
  /**
   * Mute method of the player
   */


  methodMute() {
    this.instancePlayer.mute();
  }
  /**
   * Unmute method of the player
   */


  methodUnMute() {
    this.instancePlayer.unMute();
  }
  /**
   * Remove the Youtube instance
   */


  removeInstance() {
    this.instancePlayer.destroy();
  }

}

exports.default = PlayerYoutube;

/***/ }),

/***/ "./src/vlite/js/player.js":
/*!********************************!*\
  !*** ./src/vlite/js/player.js ***!
  \********************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bigPlay = _interopRequireDefault(__webpack_require__(/*! ../svg/big-play.svg */ "./src/vlite/svg/big-play.svg"));

var _play = _interopRequireDefault(__webpack_require__(/*! ../svg/play.svg */ "./src/vlite/svg/play.svg"));

var _pause = _interopRequireDefault(__webpack_require__(/*! ../svg/pause.svg */ "./src/vlite/svg/pause.svg"));

var _volumeHigh = _interopRequireDefault(__webpack_require__(/*! ../svg/volume-high.svg */ "./src/vlite/svg/volume-high.svg"));

var _volumeMute = _interopRequireDefault(__webpack_require__(/*! ../svg/volume-mute.svg */ "./src/vlite/svg/volume-mute.svg"));

var _fullscreen = _interopRequireDefault(__webpack_require__(/*! ../svg/fullscreen.svg */ "./src/vlite/svg/fullscreen.svg"));

var _fullscreenExit = _interopRequireDefault(__webpack_require__(/*! ../svg/fullscreen-exit.svg */ "./src/vlite/svg/fullscreen-exit.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import SVG icons

/**
 * vlitejs Player
 * @module vlitejs/Player
 */
class Player {
  /**
   * Instanciate the constructor
   * @constructor
   * @param {String|Object} selector CSS selector or query selector
   * @param {Object} options Player options
   * @param {Function} callback Callback function executed when the player is ready
   */
  constructor({
    selector,
    options,
    callback
  }) {
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
    }; // Check if options have gone through DOM with data attribute

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

    this.options = Object.assign({}, DEFAULT_OPTIONS, customOptions); // Keep player native control and disable custom skin

    if (this.options.nativeControlsForTouch) {
      this.skinDisabled = true;
      this.player.setAttribute('controls', 'controls');
      this.options.controls = false;
    } // Add play inline attribute


    if (this.options.playsinline) {
      this.player.setAttribute('playsinline', true);
      this.player.setAttribute('webkit-playsinline', true);
    } // Check fullscreen support API on different browsers and cached prefixs


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
    this.player.setAttribute('data-v-toggle-play-pause', '');

    if (this.skinDisabled) {
      this.wrapperPlayer.classList.add('v-forceControls');
    }

    const cssstylePoster = this.options.poster !== null ? `background-image: url(${this.options.poster});` : "";
    const htmlControls = `${!this.options.nativeControlsForTouch ? `<div class="v-overlayVideo" data-v-toggle-play-pause>
									${!this.touchSupport ? `<div class="v-overlayLeft" data-v-fast-forward data-direction="left"></div>
										<div class="v-overlayRight" data-v-fast-forward data-direction="right"></div>` : ``}
								</div>` : ``}
							<div class="v-loader">
								<div class="v-loaderContent">
									<div class="v-loaderBounce1"></div>
									<div class="v-loaderBounce2"></div>
									<div class="v-loaderBounce3"></div>
								</div>
							</div>
							<div class="v-poster v-active" data-v-toggle-play-pause style="${cssstylePoster}"></div>
							${this.options.bigPlay ? `<div class="v-bigPlayButton" data-v-toggle-play-pause>
									 <span class="v-playerIcon v-iconBigPlay">${_bigPlay.default}</span>
								</div>` : ``}
							${this.options.controls ? `<div class="v-controlBar">
									${this.options.timeline ? `<div class="v-progressBar">
											<div class="v-progressSeek"></div>
											<input type="range" class="v-progressInput" min="0" max="100" step="0.01" value="0" orient="horizontal" />
										</div>` : ``}
									<div class="v-controlBarContent">
										${this.options.playPause ? `<div class="v-playPauseButton" data-v-toggle-play-pause>
												<span class="v-playerIcon v-iconPlay">${_play.default}</span>
												<span class="v-playerIcon v-iconPause">${_pause.default}</span>
											</div>` : ``}
										${this.options.time ? `<div class="v-time">
												<span class="v-currentTime">00:00</span>&nbsp;/&nbsp;<span class="v-duration"></span>
											</div>` : ``}
										${this.options.volume ? `<div class="v-volume">
												<span class="v-playerIcon v-iconVolumeHigh">${_volumeHigh.default}</span>
												<span class="v-playerIcon v-iconVolumeMute">${_volumeMute.default}</span>
											</div>` : ``}
										${this.options.fullscreen ? `<div class="v-fullscreen">
												<span class="v-playerIcon v-iconFullscreen">${_fullscreen.default}</span>
												<span class="v-playerIcon v-iconShrink">${_fullscreenExit.default}</span>
											</div>` : ``}
									</div>
								</div>` : ``}`;
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
    } // Create play/pause button event listener


    this.onClickTogglePlayPause = e => {
      e.preventDefault();
      this.togglePlayPause();
    };

    const playPauseButtons = this.wrapperPlayer.querySelectorAll('[data-v-toggle-play-pause]');
    playPauseButtons.forEach(button => {
      button.addEventListener('click', this.onClickTogglePlayPause, false);
    }); // Create double click to fast-forward video current time (only on desktop, mobile doesn't support event)

    if (!this.touchSupport) {
      this.onDblclickFastForward = e => {
        e.preventDefault();
        this.fastForward(e);
      };

      const fastForwardButtons = [...this.wrapperPlayer.querySelectorAll('[data-v-fast-forward]')];
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

      this.wrapperPlayer.querySelector('.v-fullscreen').addEventListener('click', this.onClickToggleFullscreen, false); // Create double click event to trigger fullscreen change

      this.onDblclickVideo = e => {
        e.preventDefault(); // Prevent double click to fast-forward video current time

        if (e.target.hasAttribute('data-v-fast-forward')) return;
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
    } // Create fullscreen button event listener
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
    this.loading(false); // Execute the constructor callback

    if (typeof this.callback === 'function') {
      this.callback(this);
    } // If player has autoplay option, play now


    if (this.options.autoplay) {
      // Autoplay on video is authorize only when the video is muted
      if (!this.player.muted) {
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

    if (this.options.controls) {
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
    const {
      requestFn
    } = this.supportFullScreen;

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
    const {
      cancelFn
    } = this.supportFullScreen;

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
    const width = currentTime * 100 / duration;
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
    const playPauseButtons = [...this.wrapperPlayer.querySelectorAll('[data-v-toggle-play-pause]')];
    playPauseButtons.forEach(button => {
      button.removeEventListener('click', this.onClickTogglePlayPause);
    });
    this.onClickTogglePlayPause = null;

    if (!this.touchSupport) {
      const fastForwardButtons = [...this.wrapperPlayer.querySelectorAll('[data-v-fast-forward]')];
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
    return 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch;
  }
  /**
   * Convert video time second to 00:00 display
   * @param {Float|Integer} time Current time
   */


  static formatVideoTime(time) {
    const ms = time * 1000;
    const min = ms / 1000 / 60 << 0;
    const sec = ms / 1000 % 60 << 0;
    let timeInString = '';
    timeInString += min < 10 ? '0' : '';
    timeInString += min + ':';
    timeInString += sec < 10 ? '0' : '';
    timeInString += sec;
    return timeInString;
  }

}

exports.default = Player;

/***/ }),

/***/ "./src/vlite/js/vlite.js":
/*!*******************************!*\
  !*** ./src/vlite/js/vlite.js ***!
  \*******************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
* @license MIT
* @name vlitejs
* @version 3.0.0
* @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
* @description: vLitejs is a fast and lightweight Javascript library to customize and skin native HTML5 video and Youtube video in Javascript native with a default skin
* {@link https://yoriiis.github.io/vlitejs}
* @copyright 2019 Joris DANIEL <https://yoriiis.github.io/vlitejs>
**/


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _playerYoutube = _interopRequireDefault(__webpack_require__(/*! ./player-youtube */ "./src/vlite/js/player-youtube.js"));

var _playerHtml = _interopRequireDefault(__webpack_require__(/*! ./player-html5 */ "./src/vlite/js/player-html5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set Youtube API configuration for the queue if the API is not ready
const _VliteYoutube = {
  apiLoading: false,
  apiReady: false,
  apiReadyQueue: []
};
/**
 * vlitejs entrypoint
 * @module vLite/entrypoint
 */

class vlitejs {
  /**
   * Instanciate the constructor
   * @constructor
   * @param {String|Object} selector CSS selector or query selector
   * @param {Object} options Player options
   * @param {Function} callback Callback function executed when the player is ready
   */
  constructor({
    selector,
    options = undefined,
    callback
  }) {
    this.player = null; // Detect the type of the selector (string or object)

    if (typeof selector === 'string') {
      this.player = document.querySelector(selector);
    } else if (typeof selector === 'object') {
      this.player = selector;
    }

    if (this.player === null) {
      console.warn('[vLite] - Selector not found');
      return;
    }

    this.options = options;
    this.callback = callback;
    this.initPlayer();
  }
  /**
   * Initialize the player (Youtube or HTML5)
   */


  initPlayer() {
    // Detect the player type (Youtube or HTML5)
    if (this.player.hasAttribute('data-youtube-id')) {
      // Detect if the Youtube API is ready
      if (!_VliteYoutube.apiReady) {
        // Load the Youtube API if necessary
        if (!_VliteYoutube.apiLoading) {
          _VliteYoutube.apiLoading = true;
          this.loadYoutubeAPI();
        } // Create a queue to load players when the API is ready


        _VliteYoutube.apiReadyQueue.push({
          player: this.player,
          options: this.options,
          callback: this.callback
        });
      } else {
        // Youtube API is already available, initialize the Youtube player
        this.instancePlayer = new _playerYoutube.default({
          selector: this.player,
          options: this.options,
          callback: this.callback
        });
      }
    } else {
      // Initialize the HTML5 Player
      this.instancePlayer = new _playerHtml.default({
        selector: this.player,
        options: this.options,
        callback: this.callback
      });
    }
  }
  /**
   * Load the Youtube API
   */


  loadYoutubeAPI() {
    let script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = 'https://youtube.com/iframe_api'; // Function called when the API is ready

    window.onYouTubeIframeAPIReady = () => {
      _VliteYoutube.apiReady = true; // Initialize the player queue

      _VliteYoutube.apiReadyQueue.forEach(element => {
        this.instancePlayer = new _playerYoutube.default({
          selector: element.player,
          options: element.options,
          callback: element.callback
        });
      });

      _VliteYoutube.apiReadyQueue = [];
    };

    document.getElementsByTagName('body')[0].appendChild(script);
  }
  /**
   * Destroy the player instance
   */


  destroy() {
    this.instancePlayer.destroy();
  }

}

exports.default = vlitejs;

/***/ }),

/***/ "./src/vlite/svg/big-play.svg":
/*!************************************!*\
  !*** ./src/vlite/svg/big-play.svg ***!
  \************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 29C8.82 29 3 23.18 3 16S8.82 3 16 3s13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z\"></path></svg>"

/***/ }),

/***/ "./src/vlite/svg/fullscreen-exit.svg":
/*!*******************************************!*\
  !*** ./src/vlite/svg/fullscreen-exit.svg ***!
  \*******************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M24.586 27.414L29.172 32 32 29.172l-4.586-4.586L32 20H20v12zM0 12h12V0L7.414 4.586 2.875.043.047 2.871l4.539 4.543zm0 17.172L2.828 32l4.586-4.586L12 32V20H0l4.586 4.586zM20 12h12l-4.586-4.586 4.547-4.543L29.133.043l-4.547 4.543L20 0z\"></path></svg>"

/***/ }),

/***/ "./src/vlite/svg/fullscreen.svg":
/*!**************************************!*\
  !*** ./src/vlite/svg/fullscreen.svg ***!
  \**************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M27.414 24.586L22.828 20 20 22.828l4.586 4.586L20 32h12V20zM12 0H0v12l4.586-4.586 4.543 4.539 2.828-2.828-4.543-4.539zm0 22.828L9.172 20l-4.586 4.586L0 20v12h12l-4.586-4.586zM32 0H20l4.586 4.586-4.543 4.539 2.828 2.828 4.543-4.539L32 12z\"></path></svg>"

/***/ }),

/***/ "./src/vlite/svg/pause.svg":
/*!*********************************!*\
  !*** ./src/vlite/svg/pause.svg ***!
  \*********************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M4 4h10v24H4zm14 0h10v24H18z\"></path></svg>"

/***/ }),

/***/ "./src/vlite/svg/play.svg":
/*!********************************!*\
  !*** ./src/vlite/svg/play.svg ***!
  \********************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M6 4l20 12L6 28z\"></path></svg>"

/***/ }),

/***/ "./src/vlite/svg/volume-high.svg":
/*!***************************************!*\
  !*** ./src/vlite/svg/volume-high.svg ***!
  \***************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 34 32\"><path d=\"M27.814 28.814a1.5 1.5 0 0 1-1.061-2.56C29.492 23.515 31 19.874 31 16.001s-1.508-7.514-4.247-10.253a1.5 1.5 0 1 1 2.121-2.121C32.179 6.932 34 11.327 34 16.001s-1.82 9.069-5.126 12.374a1.495 1.495 0 0 1-1.061.439zm-5.329-2.829a1.5 1.5 0 0 1-1.061-2.56c4.094-4.094 4.094-10.755 0-14.849a1.5 1.5 0 1 1 2.121-2.121c2.55 2.55 3.954 5.94 3.954 9.546s-1.404 6.996-3.954 9.546a1.495 1.495 0 0 1-1.061.439zm-5.328-2.828a1.5 1.5 0 0 1-1.061-2.56 6.508 6.508 0 0 0 0-9.192 1.5 1.5 0 1 1 2.121-2.121c3.704 3.704 3.704 9.731 0 13.435a1.495 1.495 0 0 1-1.061.439zM13 30a1 1 0 0 1-.707-.293L4.586 22H1a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h3.586l7.707-7.707A1 1 0 0 1 14 3v26a1.002 1.002 0 0 1-1 1z\"></path></svg>"

/***/ }),

/***/ "./src/vlite/svg/volume-mute.svg":
/*!***************************************!*\
  !*** ./src/vlite/svg/volume-mute.svg ***!
  \***************************************/
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M13 30a1 1 0 0 1-.707-.293L4.586 22H1a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h3.586l7.707-7.707A1 1 0 0 1 14 3v26a1.002 1.002 0 0 1-1 1z\"></path></svg>"

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vlite.js.map