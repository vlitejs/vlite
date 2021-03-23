(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vlitejs"] = factory();
	else
		root["vlitejs"] = factory();
})(globalThis, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/providers/html5.js":
/*!********************************!*\
  !*** ./src/providers/html5.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _player = _interopRequireDefault(__webpack_require__(/*! ../vlite/js/player */ "./src/vlite/js/player.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * vlitejs Player HTML5
 * @module vlitejs/Player/PlayerHtml5
 */
class PlayerHtml5 extends _player.default {
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

  init() {
    super.init();
    this.waitUntilVideoIsReady().then(this.onPlayerReady);
    !this.skinDisabled && this.addSpecificEvents();
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
      if (typeof this.element.duration === 'number' && isNaN(this.element.duration) === false) {
        resolve();
      } else {
        this.onDurationChange = () => {
          this.element.removeEventListener('durationchange', this.onDurationChange);
          this.element.removeEventListener('error', this.onError);
          resolve();
        };

        this.onError = error => {
          this.element.removeEventListener('error', this.onError);
          this.element.removeEventListener('durationchange', this.onDurationChange);
          reject(error);
        }; // Listen error or durationchange events to detect when the video is ready


        this.element.addEventListener('durationchange', this.onDurationChange);
        this.element.addEventListener('error', this.onError);
      }
    });
  }
  /**
   * Create event listeners
   * All listeners are created on class properties to facilitate the deletion of events
   */


  addSpecificEvents() {
    if (this.options.controls) {
      if (this.options.time) {
        // On durationchange event, update duration if value is different
        this.element.addEventListener('durationchange', this.updateDuration);
      } // On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar


      this.element.addEventListener('timeupdate', this.onTimeUpdate);
    } // On ended event, show poster and reset progressBar and time


    this.element.addEventListener('ended', this.onVideoEnded);
    this.element.addEventListener('playing', this.onPlaying);
    this.element.addEventListener('waiting', this.onWaiting);
    this.element.addEventListener('seeking', this.onSeeking);
    this.element.addEventListener('seeked', this.onSeeked);
  }
  /**
   * Get the player instance
   * @returns {Object} Video element
   */


  getInstance() {
    return this.element;
  }
  /**
   * Get the player current time
   * @returns {Float|Integer} Current time of the video
   */


  getCurrentTime() {
    return new window.Promise(resolve => resolve(this.element.currentTime));
  }
  /**
   * Set the new current time for the player
   * @param {Float|Integer} Current time video
   */


  setCurrentTime(newTime) {
    this.element.currentTime = newTime;
  }
  /**
   * Get the player duration
   * @returns {Float|Integer} Duration of the video
   */


  getDuration() {
    return new window.Promise(resolve => resolve(this.element.duration));
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
    this.element.play();
  }
  /**
   * Pause method of the player
   */


  methodPause() {
    this.element.pause();
  }
  /**
   * Mute method of the player
   */


  methodMute() {
    this.element.muted = true;
    this.element.setAttribute('muted', '');
  }
  /**
   * Unmute method of the player
   */


  methodUnMute() {
    this.element.muted = false;
    this.element.removeAttribute('muted');
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
    this.options.time && this.element.removeEventListener('durationchange', this.updateDuration);
    this.element.removeEventListener('timeupdate', this.onTimeUpdate);
    this.element.removeEventListener('playing', this.onPlaying);
    this.element.removeEventListener('waiting', this.onWaiting);
    this.element.removeEventListener('seeking', this.onSeeking);
    this.element.removeEventListener('seeked', this.onSeeked);
    this.element.removeEventListener('ended', this.onVideoEnded);
  }

}

exports.default = PlayerHtml5;

/***/ }),

/***/ "./src/shared/big-play/assets/scripts/big-play.js":
/*!********************************************************!*\
  !*** ./src/shared/big-play/assets/scripts/big-play.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = _default;

var _jsxDom = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/index.js");

var _bigPlay = _interopRequireDefault(__webpack_require__(/*! shared/assets/svgs/big-play.svg */ "./src/shared/assets/svgs/big-play.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return (0, _jsxDom.createElement)("button", {
    className: "v-bigPlay",
    innerHTML: _bigPlay.default
  });
}

/***/ }),

/***/ "./src/shared/big-play/config.js":
/*!***************************************!*\
  !*** ./src/shared/big-play/config.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! ./assets/styles/big-play.css */ "./src/shared/big-play/assets/styles/big-play.css");

__webpack_require__(/*! ./assets/scripts/big-play */ "./src/shared/big-play/assets/scripts/big-play.js");

/***/ }),

/***/ "./src/shared/control-bar/assets/scripts/control-bar.js":
/*!**************************************************************!*\
  !*** ./src/shared/control-bar/assets/scripts/control-bar.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = _default;

var _jsxDom = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/index.js");

var _play = _interopRequireDefault(__webpack_require__(/*! shared/assets/svgs/play.svg */ "./src/shared/assets/svgs/play.svg"));

var _pause = _interopRequireDefault(__webpack_require__(/*! shared/assets/svgs/pause.svg */ "./src/shared/assets/svgs/pause.svg"));

var _volumeHigh = _interopRequireDefault(__webpack_require__(/*! shared/assets/svgs/volume-high.svg */ "./src/shared/assets/svgs/volume-high.svg"));

var _volumeMute = _interopRequireDefault(__webpack_require__(/*! shared/assets/svgs/volume-mute.svg */ "./src/shared/assets/svgs/volume-mute.svg"));

var _fullscreen = _interopRequireDefault(__webpack_require__(/*! shared/assets/svgs/fullscreen.svg */ "./src/shared/assets/svgs/fullscreen.svg"));

var _fullscreenExit = _interopRequireDefault(__webpack_require__(/*! shared/assets/svgs/fullscreen-exit.svg */ "./src/shared/assets/svgs/fullscreen-exit.svg"));

var _utils = __webpack_require__(/*! shared/utils/utils */ "./src/shared/utils/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default({
  progressBar = false,
  playPause = false,
  time = false,
  volume = false,
  fullscreen = false,
  mode
}) {
  return (0, _jsxDom.createElement)("div", {
    className: `v-controlBar v-style${(0, _utils.capitalized)(mode)}`
  }, playPause && (0, _jsxDom.createElement)("button", {
    className: "v-playPauseButton",
    "aria-label": "Play"
  }, (0, _jsxDom.createElement)("span", {
    className: "v-playerIcon v-iconPlay",
    innerHTML: _play.default
  }), (0, _jsxDom.createElement)("span", {
    className: "v-playerIcon v-iconPause",
    innerHTML: _pause.default
  })), time && (0, _jsxDom.createElement)("div", {
    className: "v-time"
  }, (0, _jsxDom.createElement)("span", {
    className: "v-currentTime"
  }, "00:00"), "\xA0/\xA0", (0, _jsxDom.createElement)("span", {
    className: "v-duration"
  })), progressBar && (0, _jsxDom.createElement)("input", {
    type: "range",
    className: "v-progressBar",
    min: "0",
    max: "100",
    step: "0.01",
    value: "0",
    orient: "horizontal",
    "aria-label": "Seek",
    "aria-valuemin": "0"
  }), volume && (0, _jsxDom.createElement)("button", {
    className: "v-volumeButton"
  }, (0, _jsxDom.createElement)("span", {
    className: "v-playerIcon v-iconVolumeHigh",
    innerHTML: _volumeHigh.default
  }), (0, _jsxDom.createElement)("span", {
    className: "v-playerIcon v-iconVolumeMute",
    innerHTML: _volumeMute.default
  })), fullscreen && (0, _jsxDom.createElement)("button", {
    className: "v-fullscreenButton",
    "aria-label": "Enter fullscreen"
  }, (0, _jsxDom.createElement)("span", {
    className: "v-playerIcon v-iconFullscreen",
    innerHTML: _fullscreen.default
  }), (0, _jsxDom.createElement)("span", {
    className: "v-playerIcon v-iconShrink",
    innerHTML: _fullscreenExit.default
  })));
}

/***/ }),

/***/ "./src/shared/control-bar/config.js":
/*!******************************************!*\
  !*** ./src/shared/control-bar/config.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! ./assets/styles/control-bar.css */ "./src/shared/control-bar/assets/styles/control-bar.css");

__webpack_require__(/*! ./assets/scripts/control-bar */ "./src/shared/control-bar/assets/scripts/control-bar.js");

/***/ }),

/***/ "./src/shared/loader/assets/scripts/loader.js":
/*!****************************************************!*\
  !*** ./src/shared/loader/assets/scripts/loader.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = _default;

var _jsxDom = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/index.js");

function _default() {
  return (0, _jsxDom.createElement)("div", {
    className: "v-loader"
  }, (0, _jsxDom.createElement)("div", {
    className: "v-loaderContent"
  }, (0, _jsxDom.createElement)("div", {
    className: "v-loaderBounce1"
  }), (0, _jsxDom.createElement)("div", {
    className: "v-loaderBounce2"
  }), (0, _jsxDom.createElement)("div", {
    className: "v-loaderBounce3"
  })));
}

/***/ }),

/***/ "./src/shared/loader/config.js":
/*!*************************************!*\
  !*** ./src/shared/loader/config.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! ./assets/styles/loader.css */ "./src/shared/loader/assets/styles/loader.css");

__webpack_require__(/*! ./assets/scripts/loader */ "./src/shared/loader/assets/scripts/loader.js");

/***/ }),

/***/ "./src/shared/overlay/assets/scripts/overlay.js":
/*!******************************************************!*\
  !*** ./src/shared/overlay/assets/scripts/overlay.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = _default;

var _jsxDom = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/index.js");

function _default() {
  return (0, _jsxDom.createElement)("div", {
    className: "v-overlay"
  });
}

/***/ }),

/***/ "./src/shared/overlay/config.js":
/*!**************************************!*\
  !*** ./src/shared/overlay/config.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! ./assets/styles/overlay.css */ "./src/shared/overlay/assets/styles/overlay.css");

__webpack_require__(/*! ./assets/scripts/overlay */ "./src/shared/overlay/assets/scripts/overlay.js");

/***/ }),

/***/ "./src/shared/poster/assets/scripts/poster.js":
/*!****************************************************!*\
  !*** ./src/shared/poster/assets/scripts/poster.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = _default;

var _jsxDom = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/index.js");

function _default({
  posterUrl = ''
}) {
  const style = {
    backgroundImage: posterUrl && `url(${posterUrl})`
  };
  return (0, _jsxDom.createElement)("div", {
    className: "v-poster v-active",
    style: style
  });
}

/***/ }),

/***/ "./src/shared/poster/config.js":
/*!*************************************!*\
  !*** ./src/shared/poster/config.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! ./assets/styles/poster.css */ "./src/shared/poster/assets/styles/poster.css");

__webpack_require__(/*! ./assets/scripts/poster */ "./src/shared/poster/assets/scripts/poster.js");

/***/ }),

/***/ "./src/shared/utils/utils.js":
/*!***********************************!*\
  !*** ./src/shared/utils/utils.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.capitalized = capitalized;

function capitalized(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/***/ }),

/***/ "./src/vlite/js/player.js":
/*!********************************!*\
  !*** ./src/vlite/js/player.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _jsxDom = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/index.js");

var _validateTarget = _interopRequireDefault(__webpack_require__(/*! validate-target */ "./node_modules/validate-target/src/index.js"));

var _loader = _interopRequireDefault(__webpack_require__(/*! shared/loader/assets/scripts/loader */ "./src/shared/loader/assets/scripts/loader.js"));

var _controlBar = _interopRequireDefault(__webpack_require__(/*! shared/control-bar/assets/scripts/control-bar */ "./src/shared/control-bar/assets/scripts/control-bar.js"));

var _bigPlay = _interopRequireDefault(__webpack_require__(/*! shared/big-play/assets/scripts/big-play */ "./src/shared/big-play/assets/scripts/big-play.js"));

var _overlay = _interopRequireDefault(__webpack_require__(/*! shared/overlay/assets/scripts/overlay */ "./src/shared/overlay/assets/scripts/overlay.js"));

var _poster = _interopRequireDefault(__webpack_require__(/*! shared/poster/assets/scripts/poster */ "./src/shared/poster/assets/scripts/poster.js"));

var _utils = __webpack_require__(/*! shared/utils/utils */ "./src/shared/utils/utils.js");

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
   * @param {HTMLElement} element Player HTML element
   * @param {Object} options Player options
   * @param {Function} onReady Callback function executed when the player is ready
   */
  constructor({
    element,
    options,
    onReady
  }) {
    this.onReady = onReady;
    this.isFullScreen = false;
    this.isPaused = null;
    this.element = element;
    this.touchSupport = this.isTouch();
    this.skinDisabled = false;
    this.delayAutoHide = 3000;
    this.mode = this.element instanceof HTMLAudioElement ? 'audio' : 'video';
    const DEFAULT_OPTIONS_VIDEO = {
      autoplay: false,
      controls: true,
      playPause: true,
      progressBar: true,
      time: true,
      volume: true,
      fullscreen: true,
      poster: null,
      bigPlay: true,
      autoHide: false,
      nativeControlsForTouch: false,
      playsinline: true
    };
    const DEFAULT_OPTIONS_AUDIO = {
      autoplay: false,
      controls: true,
      playPause: true,
      progressBar: true,
      time: true,
      volume: true,
      nativeControlsForTouch: false
    };
    this.options = Object.assign({}, this.mode === 'video' ? DEFAULT_OPTIONS_VIDEO : DEFAULT_OPTIONS_AUDIO, options); // Keep player native control and disable custom skin

    if (this.options.nativeControlsForTouch) {
      this.skinDisabled = true;
      this.element.setAttribute('controls', 'controls');
      this.options.controls = false;
    } // Add play inline attribute


    if (this.options.playsinline) {
      this.element.setAttribute('playsinline', true);
      this.element.setAttribute('webkit-playsinline', true);
    } // Check fullscreen support API on different browsers and cached prefixs


    this.supportFullScreen = this.constructor.checkSupportFullScreen();
    this.initReady = this.initReady.bind(this);
    this.onClickOnPlayer = this.onClickOnPlayer.bind(this);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.onMousemove = this.onMousemove.bind(this);
    this.onChangeFullScreen = this.onChangeFullScreen.bind(this);
    this.onDoubleClickOnPlayer = this.onDoubleClickOnPlayer.bind(this);
    this.onProgressInput = this.onProgressInput.bind(this);
  }

  init() {
    this.isApiReady().then(this.initReady);
  }

  isApiReady() {
    return Promise.resolve();
  }

  initReady() {
    this.render();
    this.addEvents();
  }
  /**
   * Build the DOM of the player
   */


  render() {
    // Create a wrapper for each player
    const wrapper = document.createElement('div');
    wrapper.classList.add('v-vlite', 'v-firstStart', 'v-paused', 'v-loading', `v-style${(0, _utils.capitalized)(this.mode)}`);
    wrapper.setAttribute('tabindex', 0);
    this.element.parentNode.insertBefore(wrapper, this.element);
    wrapper.appendChild(this.element);
    this.wrapperPlayer = this.element.parentNode;

    if (this.skinDisabled) {
      this.wrapperPlayer.classList.add('v-forceControls');
    }

    wrapper.appendChild((0, _jsxDom.createElement)(_jsxDom.Fragment, null, !this.options.nativeControlsForTouch && (0, _jsxDom.createElement)(_jsxDom.Fragment, null, this.mode === 'audio' ? this.renderAudioElement() : this.renderVideoElement())));
  }

  renderVideoElement() {
    return (0, _jsxDom.createElement)(_jsxDom.Fragment, null, (0, _jsxDom.createElement)(_overlay.default, {
      fastForward: !this.touchSupport
    }), (0, _jsxDom.createElement)(_loader.default, null), this.options.poster && (0, _jsxDom.createElement)(_poster.default, {
      posterUrl: this.options.poster
    }), this.options.bigPlay && (0, _jsxDom.createElement)(_bigPlay.default, null), this.options.controls && (0, _jsxDom.createElement)(_controlBar.default, {
      progressBar: this.options.progressBar,
      playPause: this.options.playPause,
      time: this.options.time,
      volume: this.options.volume,
      fullscreen: this.options.fullscreen,
      mode: this.mode
    }));
  }

  renderAudioElement() {
    return (0, _jsxDom.createElement)(_jsxDom.Fragment, null, (0, _jsxDom.createElement)(_controlBar.default, {
      progressBar: this.options.progressBar,
      playPause: this.options.playPause,
      time: this.options.time,
      volume: this.options.volume,
      mode: this.mode
    }));
  }
  /**
   * Create event listeners
   * All listeners are created on class properties to facilitate the deletion of events
   */


  addEvents() {
    if (this.options.controls && this.options.progressBar) {
      this.wrapperPlayer.querySelector('.v-progressBar').addEventListener('input', this.onProgressInput);
    }

    this.wrapperPlayer.addEventListener('click', this.onClickOnPlayer);
    this.wrapperPlayer.addEventListener('dblclick', this.onDoubleClickOnPlayer);
    this.wrapperPlayer.addEventListener('keyup', this.onKeyup);
    this.mode === 'video' && this.wrapperPlayer.addEventListener('mousemove', this.onMousemove);
    window.addEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen);
  } // Create fullscreen button event listener
  // Detect fullscreen change, particulary util for esc key because state is not updated
  // More information on MDN : https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API


  onChangeFullScreen(e) {
    if (!document[this.supportFullScreen.isFullScreen] && this.isFullScreen) {
      this.exitFullscreen(e.target);
    }
  }

  onProgressInput(e) {
    const target = e.target;
    target.style.setProperty('--value', `${target.value}%`);
    this.getCurrentTime().then(seconds => target.setAttribute('aria-valuenow', seconds));
    this.onProgressChanged(e);
  }

  onClickOnPlayer(e) {
    const target = e.target;
    const validateTargetPlayPauseButton = (0, _validateTarget.default)({
      target: target,
      selectorString: '.v-poster, .v-overlay, .v-bigPlay, .v-playPauseButton',
      nodeName: ['div', 'button']
    });
    const validateTargetVolume = (0, _validateTarget.default)({
      target: target,
      selectorString: '.v-volumeButton',
      nodeName: ['button']
    });
    const validateTargetFullscreen = (0, _validateTarget.default)({
      target: target,
      selectorString: '.v-fullscreenButton',
      nodeName: ['button']
    });

    if (validateTargetPlayPauseButton) {
      this.togglePlayPause(e);
    } else if (validateTargetVolume) {
      this.toggleVolume(e);
    } else if (validateTargetFullscreen) {
      this.toggleFullscreen(e);
    }
  }

  onDoubleClickOnPlayer(e) {
    const target = e.target;
    const validateTargetOverlay = (0, _validateTarget.default)({
      target: target,
      selectorString: '.v-overlay',
      nodeName: ['div']
    });

    if (validateTargetOverlay) {
      this.toggleFullscreen(e);
    }
  }
  /**
   * Function executed when the player is ready
   */


  playerIsReady() {
    this.getDuration().then(duration => {
      this.wrapperPlayer.querySelector('.v-progressBar').setAttribute('aria-valuemax', duration);
    });
    this.loading(false); // Execute the onReady function

    typeof this.onReady === 'function' && this.onReady(this); // If player has autoplay option, play now

    if (this.options.autoplay) {
      // Autoplay on video is authorize only when the video is muted
      !this.element.muted && this.mute();
      this.togglePlayPause();
    }

    this.wrapperPlayer.querySelector('.v-volumeButton').setAttribute('aria-label', this.element.muted ? 'Unmute' : 'Mute');
  }
  /**
   * Update the loader status
   * @param {Boolean} state Status of the loader
   */


  loading(state) {
    this.wrapperPlayer.classList[state ? 'add' : 'remove']('v-loading');
  }
  /**
   * Update player duration
   */


  updateDuration() {
    this.getDuration().then(duration => {
      this.wrapperPlayer.querySelector('.v-duration').innerHTML = this.constructor.formatVideoTime(duration);
    });
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


  togglePlayPause(e) {
    e && e.preventDefault();

    if (this.mode === 'video' && this.wrapperPlayer.classList.contains('v-firstStart')) {
      this.wrapperPlayer.focus();
    }

    this.wrapperPlayer.classList.contains('v-paused') ? this.play() : this.pause();
  }
  /**
   * Trigger the video fast forward (front and rear)
   * @param {Object} e Event listener datas
   */


  fastForward({
    direction
  }) {
    this.getCurrentTime().then(seconds => {
      this.seekTo(direction === 'backward' ? seconds - 5 : seconds + 5);
    });
  }
  /**
   * Play the video
   */


  play() {
    if (this.wrapperPlayer.classList.contains('v-firstStart')) {
      this.wrapperPlayer.classList.remove('v-firstStart');
      this.mode === 'video' && this.wrapperPlayer.querySelector('.v-poster').classList.remove('v-active');
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
      this.wrapperPlayer.querySelector('.v-playPauseButton').setAttribute('aria-label', 'Play');

      if (this.mode === 'video' && this.options.bigPlay) {
        this.wrapperPlayer.querySelector('.v-bigPlay').setAttribute('aria-label', 'Play');
      }
    } else {
      this.wrapperPlayer.classList.replace('v-paused', 'v-playing');
      this.wrapperPlayer.querySelector('.v-playPauseButton').setAttribute('aria-label', 'Pause');

      if (this.mode === 'video' && this.options.bigPlay) {
        this.wrapperPlayer.querySelector('.v-bigPlay').setAttribute('aria-label', 'Pause');
      }
    }

    if (this.options.autoHide && this.options.controls) {
      this.stopAutoHideTimer();

      if (this.isPaused) {
        this.wrapperPlayer.querySelector('.v-controlBar').classList.remove('hidden');
      } else {
        this.startAutoHideTimer();
      }
    }
  }
  /**
   * Toggle the volume on the video
   */


  toggleVolume(e) {
    e.preventDefault();

    if (this.wrapperPlayer.querySelector('.v-volumeButton').classList.contains('v-muted')) {
      this.unMute();
      this.wrapperPlayer.querySelector('.v-volumeButton').setAttribute('aria-label', 'Mute');
    } else {
      this.mute();
      this.wrapperPlayer.querySelector('.v-volumeButton').setAttribute('aria-label', 'Unmute');
    }
  }
  /**
   * Mute the volume on the video
   */


  mute() {
    this.methodMute();
    this.wrapperPlayer.querySelector('.v-volumeButton').classList.add('v-muted');
  }
  /**
   * Toggle the volume on the video
   */


  unMute() {
    this.methodUnMute();
    this.wrapperPlayer.querySelector('.v-volumeButton').classList.remove('v-muted');
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


  toggleFullscreen(e) {
    e.preventDefault();

    if (this.isFullScreen) {
      this.exitFullscreen();
      this.wrapperPlayer.querySelector('.v-fullscreenButton').setAttribute('aria-label', 'Enter fullscreen');
    } else {
      this.requestFullscreen();
      this.wrapperPlayer.querySelector('.v-fullscreenButton').setAttribute('aria-label', 'Exit fullscreen');
    }
  }
  /**
   * Check fullscreen support API on different browsers and cached prefixs
   */


  static checkSupportFullScreen() {
    const prefixs = ['', 'moz', 'webkit', 'ms', 'o'];
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

    if (this.element[requestFn]) {
      // Request fullscreen on parentNode player, to display custom controls
      this.element.parentNode[requestFn]();
      this.isFullScreen = true;
      this.wrapperPlayer.classList.add('v-fullscreenButton-display');
      this.wrapperPlayer.querySelector('.v-fullscreenButton').classList.add('v-exit');
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
      this.wrapperPlayer.classList.remove('v-fullscreenButton-display');
      this.wrapperPlayer.querySelector('.v-fullscreenButton').classList.remove('v-exit');
      this.isFullScreen = false;
    }
  }
  /**
   * Function executed on keyup event listener
   * Toggle the video on spacebar press
   * @param {Object} e Event listener datas
   */


  onKeyup(e) {
    const validKeyCode = [9, 32, 37, 39];

    if (validKeyCode.includes(e.keyCode)) {
      this.stopAutoHideTimer();
      this.startAutoHideTimer();
    }

    if (e.keyCode === 32) {
      this.togglePlayPause(e);
    } else if (e.keyCode === 37) {
      this.fastForward({
        direction: 'backward'
      });
    } else if (e.keyCode === 39) {
      this.fastForward({
        direction: 'forward'
      });
    }
  }
  /**
   * Function executed on mousemove event listener
   * Toggle controls display on mousemove event
   */


  onMousemove() {
    if (this.isPaused === false && this.options.autoHide && this.options.controls) {
      this.stopAutoHideTimer();
      this.startAutoHideTimer();
    }
  }

  stopAutoHideTimer() {
    if (this.mode === 'video') {
      this.wrapperPlayer.querySelector('.v-controlBar').classList.remove('hidden');
      clearTimeout(this.timerAutoHide);
    }
  }

  startAutoHideTimer() {
    if (this.mode === 'video' && !this.isPaused) {
      this.timerAutoHide = setTimeout(() => {
        this.wrapperPlayer.querySelector('.v-controlBar').classList.add('hidden');
      }, this.delayAutoHide);
    }
  }
  /**
   * Update current time displaying in the control bar and the width of the progress bar
   */


  onTimeUpdate() {
    if (this.options.time) {
      Promise.all([this.getCurrentTime(), this.getDuration()]).then(([seconds, duration]) => {
        const currentTime = Math.round(seconds);
        const width = currentTime * 100 / duration;
        const progressBar = this.wrapperPlayer.querySelector('.v-progressBar');
        progressBar.value = width;
        progressBar.style.setProperty('--value', `${width}%`);
        this.wrapperPlayer.querySelector('.v-currentTime').innerHTML = this.constructor.formatVideoTime(currentTime);
      });
    }
  }
  /**
   * Unbind event listeners
   */


  removeEvents() {
    if (this.options.controls && this.options.progressBar) {
      this.wrapperPlayer.querySelector('.v-progressBar').removeEventListener('change', this.onProgressInput);
    }

    this.wrapperPlayer.removeEventListener('click', this.onClickOnPlayer);
    this.wrapperPlayer.removeEventListener('dblclick', this.onDoubleClickOnPlayer);
    this.wrapperPlayer.removeEventListener('keyup', this.onKeyup);
    this.mode === 'video' && this.wrapperPlayer.removeEventListener('mousemove', this.onMousemove);
    window.removeEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen);
  }
  /**
   * Destroy the player
   * Remove event listeners, player instance and player HTML
   */


  destroy() {
    this.pause();
    this.removeEvents();
    typeof this.removeSpecificEvents === 'function' && this.removeSpecificEvents();
    typeof this.removeInstance === 'function' && this.removeInstance();
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license MIT
 * @name vlitejs
 * @version 3.0.4
 * @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
 * @description: vLitejs is a fast and lightweight Javascript library for customizing HTML5 and Youtube video players in Javascript with a minimalist theme
 * {@link https://yoriiis.github.io/vlitejs}
 * @copyright 2021 Joris DANIEL <https://yoriiis.github.io/vlitejs>
 **/


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _html = _interopRequireDefault(__webpack_require__(/*! ../../providers/html5 */ "./src/providers/html5.js"));

var _player = _interopRequireDefault(__webpack_require__(/*! ./player */ "./src/vlite/js/player.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Providers = {
  html5: _html.default
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
   * @param {Function} onReady Callback function executed when the player is ready
   */
  constructor({
    selector,
    options = {},
    provider = 'html5',
    onReady
  }) {
    let element = null; // Detect the type of the selector (string or HTMLElement)

    if (typeof selector === 'string') {
      element = document.querySelector(selector);
    } else if (selector instanceof HTMLElement) {
      element = selector;
    } else {
      throw new TypeError('vlitejs :: The element or selector supplied is not valid.');
    }

    const ProviderInstance = Providers[provider];

    if (ProviderInstance) {
      const instancePlayer = new ProviderInstance({
        element,
        options,
        onReady
      });
      instancePlayer.init();
    } else {
      throw new TypeError(`vlitejs :: Unknown provider "${provider}"`);
    }
  }
  /**
   * Destroy the player instance
   */


  destroy() {
    this.instancePlayer.destroy();
  }

}

vlitejs.Player = _player.default;

vlitejs.registerProvider = (id, instance) => {
  if (!Object.keys(Providers).includes(id)) {
    Providers[id] = instance;
  } else {
    throw new TypeError(`vlitejs::registerProvider, the provider id "${id}" is already registered.`);
  }
};

var _default = vlitejs;
exports.default = _default;

/***/ }),

/***/ "./node_modules/jsx-dom/index.js":
/*!***************************************!*\
  !*** ./node_modules/jsx-dom/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "Component": () => (/* binding */ Component),
/* harmony export */   "Fragment": () => (/* binding */ Fragment),
/* harmony export */   "SVGNamespace": () => (/* binding */ SVGNamespace),
/* harmony export */   "className": () => (/* binding */ className),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "createFactory": () => (/* binding */ createFactory),
/* harmony export */   "createRef": () => (/* binding */ createRef),
/* harmony export */   "h": () => (/* binding */ createElement),
/* harmony export */   "isRef": () => (/* binding */ isRef),
/* harmony export */   "jsx": () => (/* binding */ jsx),
/* harmony export */   "jsxs": () => (/* binding */ jsx),
/* harmony export */   "memo": () => (/* binding */ identity),
/* harmony export */   "preventDefault": () => (/* binding */ preventDefault),
/* harmony export */   "stopPropagation": () => (/* binding */ stopPropagation),
/* harmony export */   "useCallback": () => (/* binding */ identity),
/* harmony export */   "useClassList": () => (/* binding */ useClassList),
/* harmony export */   "useMemo": () => (/* binding */ useMemo),
/* harmony export */   "useRef": () => (/* binding */ createRef),
/* harmony export */   "useText": () => (/* binding */ useText)
/* harmony export */ });
const keys = Object.keys
function identity(value) {
  return value
}
function isBoolean(val) {
  return typeof val === "boolean"
}
function isElement(val) {
  return val && typeof val.nodeType === "number"
}
function isString(val) {
  return typeof val === "string"
}
function isNumber(val) {
  return typeof val === "number"
}
function isObject(val) {
  return typeof val === "object" ? val !== null : isFunction(val)
}
function isFunction(val) {
  return typeof val === "function"
}
function isComponentClass(Component) {
  const prototype = Component.prototype
  return !!(prototype && prototype.isReactComponent)
}
function isArrayLike(obj) {
  return isObject(obj) && typeof obj.length === "number" && typeof obj.nodeType !== "number"
}
function forEach(value, fn) {
  if (!value) return

  for (const key of keys(value)) {
    fn(value[key], key)
  }
}

function createRef() {
  return Object.seal({
    current: null,
  })
}
function isRef(maybeRef) {
  return isObject(maybeRef) && "current" in maybeRef
}
function useMemo(factory) {
  return factory()
}

const isUnitlessNumber = {
  animationIterationCount: 0,
  borderImageOutset: 0,
  borderImageSlice: 0,
  borderImageWidth: 0,
  boxFlex: 0,
  boxFlexGroup: 0,
  boxOrdinalGroup: 0,
  columnCount: 0,
  columns: 0,
  flex: 0,
  flexGrow: 0,
  flexPositive: 0,
  flexShrink: 0,
  flexNegative: 0,
  flexOrder: 0,
  gridArea: 0,
  gridRow: 0,
  gridRowEnd: 0,
  gridRowSpan: 0,
  gridRowStart: 0,
  gridColumn: 0,
  gridColumnEnd: 0,
  gridColumnSpan: 0,
  gridColumnStart: 0,
  fontWeight: 0,
  lineClamp: 0,
  lineHeight: 0,
  opacity: 0,
  order: 0,
  orphans: 0,
  tabSize: 0,
  widows: 0,
  zIndex: 0,
  zoom: 0,
  fillOpacity: 0,
  floodOpacity: 0,
  stopOpacity: 0,
  strokeDasharray: 0,
  strokeDashoffset: 0,
  strokeMiterlimit: 0,
  strokeOpacity: 0,
  strokeWidth: 0,
}

function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1)
}

const prefixes = ["Webkit", "ms", "Moz", "O"]
keys(isUnitlessNumber).forEach(prop => {
  prefixes.forEach(prefix => {
    isUnitlessNumber[prefixKey(prefix, prop)] = 0
  })
})

const SVGNamespace = "http://www.w3.org/2000/svg"
const XLinkNamespace = "http://www.w3.org/1999/xlink"
const XMLNamespace = "http://www.w3.org/XML/1998/namespace"

function isVisibleChild(value) {
  return !isBoolean(value) && value != null
}

function className(value) {
  if (Array.isArray(value)) {
    return value.map(className).filter(Boolean).join(" ")
  } else if (isObject(value)) {
    return keys(value)
      .filter(k => value[k])
      .join(" ")
  } else if (isVisibleChild(value)) {
    return "" + value
  } else {
    return ""
  }
}
const svg = {
  animate: 0,
  circle: 0,
  clipPath: 0,
  defs: 0,
  desc: 0,
  ellipse: 0,
  feBlend: 0,
  feColorMatrix: 0,
  feComponentTransfer: 0,
  feComposite: 0,
  feConvolveMatrix: 0,
  feDiffuseLighting: 0,
  feDisplacementMap: 0,
  feDistantLight: 0,
  feFlood: 0,
  feFuncA: 0,
  feFuncB: 0,
  feFuncG: 0,
  feFuncR: 0,
  feGaussianBlur: 0,
  feImage: 0,
  feMerge: 0,
  feMergeNode: 0,
  feMorphology: 0,
  feOffset: 0,
  fePointLight: 0,
  feSpecularLighting: 0,
  feSpotLight: 0,
  feTile: 0,
  feTurbulence: 0,
  filter: 0,
  foreignObject: 0,
  g: 0,
  image: 0,
  line: 0,
  linearGradient: 0,
  marker: 0,
  mask: 0,
  metadata: 0,
  path: 0,
  pattern: 0,
  polygon: 0,
  polyline: 0,
  radialGradient: 0,
  rect: 0,
  stop: 0,
  svg: 0,
  switch: 0,
  symbol: 0,
  text: 0,
  textPath: 0,
  tspan: 0,
  use: 0,
  view: 0,
}
const nonPresentationSVGAttributes = /^(a(ll|t|u)|base[FP]|c(al|lipPathU|on)|di|ed|ex|filter[RU]|g(lyphR|r)|ke|l(en|im)|ma(rker[HUW]|s)|n|pat|pr|point[^e]|re[^n]|s[puy]|st[^or]|ta|textL|vi|xC|y|z)/
function createFactory(tag) {
  return createElement.bind(null, tag)
}
function Fragment(attr) {
  const fragment = document.createDocumentFragment()
  appendChildren(attr.children, fragment)
  return fragment
}
function Component(props) {
  this.props = props
}
Object.defineProperties(Component.prototype, {
  isReactComponent: {
    value: true,
  },
  render: {
    value() {
      return null
    },
  },
})
function jsx(tag, { children, ...attr }) {
  if (!attr.namespaceURI && svg[tag] === 0) {
    attr = { ...attr, namespaceURI: SVGNamespace }
  }

  let node

  if (isString(tag)) {
    node = attr.namespaceURI
      ? document.createElementNS(attr.namespaceURI, tag)
      : document.createElement(tag)
    attributes(attr, node)
    appendChild(children, node)
  } else if (isFunction(tag)) {
    if (isObject(tag.defaultProps)) {
      attr = { ...tag.defaultProps, ...attr }
    }

    node = isComponentClass(tag)
      ? new tag({ ...tag.defaultProps, ...attr, children }).render()
      : tag({ ...attr, children })
  }

  if (isRef(attr.ref)) {
    attr.ref.current = node
  } else if (isFunction(attr.ref)) {
    attr.ref(node)
  }

  return node
}
function createElement(tag, attr, ...children) {
  if (isString(attr) || Array.isArray(attr)) {
    children.unshift(attr)
    attr = {}
  }

  attr = attr || {}

  if (attr.children != null && !children.length) {
    ;({ children, ...attr } = attr)
  }

  return jsx(tag, { ...attr, children }, attr.key)
}

function appendChild(child, node) {
  if (isArrayLike(child)) {
    appendChildren(child, node)
  } else if (isString(child) || isNumber(child)) {
    appendChildToNode(document.createTextNode(child), node)
  } else if (child === null) {
    appendChildToNode(document.createComment(""), node)
  } else if (isElement(child)) {
    appendChildToNode(child, node)
  }
}

function appendChildren(children, node) {
  for (const child of [...children]) {
    appendChild(child, node)
  }

  return node
}

function appendChildToNode(child, node) {
  if (node instanceof window.HTMLTemplateElement) {
    node.content.appendChild(child)
  } else {
    node.appendChild(child)
  }
}

function normalizeAttribute(s, separator) {
  return s.replace(/[A-Z\d]/g, match => separator + match.toLowerCase())
}

function attribute(key, value, node) {
  switch (key) {
    case "xlinkActuate":
    case "xlinkArcrole":
    case "xlinkHref":
    case "xlinkRole":
    case "xlinkShow":
    case "xlinkTitle":
    case "xlinkType":
      attrNS(node, XLinkNamespace, normalizeAttribute(key, ":"), value)
      return

    case "xmlnsXlink":
      attr(node, normalizeAttribute(key, ":"), value)
      return

    case "xmlBase":
    case "xmlLang":
    case "xmlSpace":
      attrNS(node, XMLNamespace, normalizeAttribute(key, ":"), value)
      return
  }

  switch (key) {
    case "htmlFor":
      attr(node, "for", value)
      return

    case "dataset":
      forEach(value, (dataValue, dataKey) => {
        if (dataValue != null) {
          node.dataset[dataKey] = dataValue
        }
      })
      return

    case "innerHTML":
    case "innerText":
    case "textContent":
      node[key] = value
      return

    case "dangerouslySetInnerHTML":
      if (isObject(value)) {
        node.innerHTML = value["__html"]
      }

      return

    case "spellCheck":
      node.spellcheck = value
      return

    case "class":
    case "className":
      if (isFunction(value)) {
        value(node)
      } else {
        attr(node, "class", className(value))
      }

      return

    case "ref":
    case "namespaceURI":
      return

    case "style":
      if (isObject(value)) {
        forEach(value, (val, key) => {
          if (isNumber(val) && isUnitlessNumber[key] !== 0) {
            node.style[key] = val + "px"
          } else {
            node.style[key] = val
          }
        })
        return
      }
  }

  if (isFunction(value)) {
    if (key[0] === "o" && key[1] === "n") {
      const attribute = key.toLowerCase()

      if (node[attribute] == null) {
        node[attribute] = value
      } else {
        node.addEventListener(key, value)
      }
    }
  } else if (value === true) {
    attr(node, key, "")
  } else if (value !== false && value != null) {
    if (node instanceof SVGElement && !nonPresentationSVGAttributes.test(key)) {
      attr(node, normalizeAttribute(key, "-"), value)
    } else {
      attr(node, key, value)
    }
  }
}

function attr(node, key, value) {
  node.setAttribute(key, value)
}

function attrNS(node, namespace, key, value) {
  node.setAttributeNS(namespace, key, value)
}

function attributes(attr, node) {
  for (const key of keys(attr)) {
    attribute(key, attr[key], node)
  }

  return node
}

function useText(initialValue) {
  const text = new Text()
  Object.defineProperty(text, "toString", {
    value() {
      return this.textContent
    },
  })

  function setText(value) {
    text.textContent = value
  }

  if (initialValue != null) {
    setText(initialValue)
  }

  return [text, setText]
}
function useClassList(initialValue) {
  const div = document.createElement("div")

  if (initialValue != null) {
    div.className = className(initialValue)
  }

  let list = div.classList

  function ClassList(value) {
    value.className = list.value
    list = value.classList
  }

  Object.defineProperties(
    ClassList,
    Object.getOwnPropertyDescriptors({
      get size() {
        return list.length
      },

      get value() {
        return list.value
      },

      add(...tokens) {
        list.add(...tokens)
      },

      remove(...tokens) {
        list.remove(...tokens)
      },

      toggle(token, force) {
        list.toggle(token, force)
      },

      contains(token) {
        return list.contains(token)
      },
    })
  )
  return ClassList
}

var index = {
  createElement,
  Fragment,
  Component,
}
function preventDefault(event) {
  event.preventDefault()
  return event
}
function stopPropagation(event) {
  event.stopPropagation()
  return event
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);



/***/ }),

/***/ "./src/shared/assets/styles/reset-vlite.css":
/*!**************************************************!*\
  !*** ./src/shared/assets/styles/reset-vlite.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/assets/styles/vars.css":
/*!*******************************************!*\
  !*** ./src/shared/assets/styles/vars.css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/big-play/assets/styles/big-play.css":
/*!********************************************************!*\
  !*** ./src/shared/big-play/assets/styles/big-play.css ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/control-bar/assets/styles/control-bar.css":
/*!**************************************************************!*\
  !*** ./src/shared/control-bar/assets/styles/control-bar.css ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/loader/assets/styles/loader.css":
/*!****************************************************!*\
  !*** ./src/shared/loader/assets/styles/loader.css ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/overlay/assets/styles/overlay.css":
/*!******************************************************!*\
  !*** ./src/shared/overlay/assets/styles/overlay.css ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/poster/assets/styles/poster.css":
/*!****************************************************!*\
  !*** ./src/shared/poster/assets/styles/poster.css ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/vlite/css/player.css":
/*!**********************************!*\
  !*** ./src/vlite/css/player.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/validate-target/src/index.js":
/*!***************************************************!*\
  !*** ./node_modules/validate-target/src/index.js ***!
  \***************************************************/
/***/ ((module) => {

/**
 * @license MIT
 * @name validateTarget
 * @version 2.0.0
 * @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
 * @description: Easily validate target of an HTML element especially during event delegation
 * {@link https://github.com/yoriiis/validate-target}
 * @copyright 2020 Joris DANIEL
 **/

/**
 * @param {HTMLElement} target Target element
 * @param {String} selectorString Any valid CSS selector string (class, id, attribute) with Element.matches()
 * @param {String || Array} nodeName List of possible nodes name
 *
 * @returns {Boolean} Is the target valid
 */
module.exports = function validateTarget ({ target, selectorString, nodeName }) {
	// If nodeName is a string, transform it in array to reuse the same function
	if (typeof nodeName === 'string') {
		nodeName = [nodeName];
	}

	// Check if at least one of the nodeName is valid
	if (Array.isArray(nodeName) && nodeName.length) {
		return nodeName
			.map(item => target.nodeName.toLowerCase() === item && target.matches(selectorString))
			.includes(true);
	}
};


/***/ }),

/***/ "./src/shared/assets/svgs/big-play.svg":
/*!*********************************************!*\
  !*** ./src/shared/assets/svgs/big-play.svg ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 14.67V9.33c0-.79.88-1.27 1.54-.84l4.15 2.67a1 1 0 010 1.68l-4.15 2.67c-.66.43-1.54-.05-1.54-.84z\"/></svg>";

/***/ }),

/***/ "./src/shared/assets/svgs/fullscreen-exit.svg":
/*!****************************************************!*\
  !*** ./src/shared/assets/svgs/fullscreen-exit.svg ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M6 16h2v2c0 .55.45 1 1 1s1-.45 1-1v-3c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1zm2-8H6c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1s-1 .45-1 1v2zm7 11c.55 0 1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm1-11V6c0-.55-.45-1-1-1s-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1h-2z\"/></svg>";

/***/ }),

/***/ "./src/shared/assets/svgs/fullscreen.svg":
/*!***********************************************!*\
  !*** ./src/shared/assets/svgs/fullscreen.svg ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M6 14c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1H7v-2c0-.55-.45-1-1-1zm0-4c.55 0 1-.45 1-1V7h2c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm11 7h-2c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1s-1 .45-1 1v2zM14 6c0 .55.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1z\"/></svg>";

/***/ }),

/***/ "./src/shared/assets/svgs/pause.svg":
/*!******************************************!*\
  !*** ./src/shared/assets/svgs/pause.svg ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z\"/></svg>";

/***/ }),

/***/ "./src/shared/assets/svgs/play.svg":
/*!*****************************************!*\
  !*** ./src/shared/assets/svgs/play.svg ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 000-1.69L9.54 5.98A.998.998 0 008 6.82z\"/></svg>";

/***/ }),

/***/ "./src/shared/assets/svgs/volume-high.svg":
/*!************************************************!*\
  !*** ./src/shared/assets/svgs/volume-high.svg ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z\"/></svg>";

/***/ }),

/***/ "./src/shared/assets/svgs/volume-mute.svg":
/*!************************************************!*\
  !*** ./src/shared/assets/svgs/volume-mute.svg ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z\"/></svg>";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!*****************************!*\
  !*** ./src/vlite/config.js ***!
  \*****************************/


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _vlite = _interopRequireDefault(__webpack_require__(/*! ./js/vlite.js */ "./src/vlite/js/vlite.js"));

__webpack_require__(/*! shared/assets/styles/reset-vlite.css */ "./src/shared/assets/styles/reset-vlite.css");

__webpack_require__(/*! shared/assets/styles/vars.css */ "./src/shared/assets/styles/vars.css");

__webpack_require__(/*! ./css/player.css */ "./src/vlite/css/player.css");

__webpack_require__(/*! shared/loader/config */ "./src/shared/loader/config.js");

__webpack_require__(/*! shared/control-bar/config */ "./src/shared/control-bar/config.js");

__webpack_require__(/*! shared/big-play/config */ "./src/shared/big-play/config.js");

__webpack_require__(/*! shared/overlay/config */ "./src/shared/overlay/config.js");

__webpack_require__(/*! shared/poster/config */ "./src/shared/poster/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import JS
// Import CSS
// import shared components
var _default = _vlite.default;
exports.default = _default;
})();

__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=vlite.js.map