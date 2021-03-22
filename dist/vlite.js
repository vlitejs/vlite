(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vlitejs"] = factory();
	else
		root["vlitejs"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/providers/html5.js":
/*!********************************!*\
  !*** ./src/providers/html5.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _player = _interopRequireDefault(__webpack_require__(/*! ../vlite/js/player */ "./src/vlite/js/player.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * vlitejs Player HTML5
 * @module vlitejs/Player/PlayerHtml5
 */
var PlayerHtml5 = /*#__PURE__*/function (_Player) {
  _inherits(PlayerHtml5, _Player);

  var _super = _createSuper(PlayerHtml5);

  /**
   * Instanciate the constructor
   * @constructor
   * @param {HTMLElement} element Player HTML element
   * @param {Object} options Player options
   * @param {Function} onReady Callback function executed when the player is ready
   */
  function PlayerHtml5(_ref) {
    var _this;

    var element = _ref.element,
        options = _ref.options,
        onReady = _ref.onReady;

    _classCallCheck(this, PlayerHtml5);

    // Init Player class
    _this = _super.call(this, {
      element: element,
      options: options,
      onReady: onReady
    });
    _this.onPlayerReady = _this.onPlayerReady.bind(_assertThisInitialized(_this));
    _this.updateDuration = _this.updateDuration.bind(_assertThisInitialized(_this));
    _this.updateCurrentTime = _this.updateCurrentTime.bind(_assertThisInitialized(_this));
    _this.onVideoEnded = _this.onVideoEnded.bind(_assertThisInitialized(_this));
    _this.onPlaying = _this.onPlaying.bind(_assertThisInitialized(_this));
    _this.onWaiting = _this.onWaiting.bind(_assertThisInitialized(_this));
    _this.onSeeking = _this.onSeeking.bind(_assertThisInitialized(_this));
    _this.onSeeked = _this.onSeeked.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PlayerHtml5, [{
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(PlayerHtml5.prototype), "init", this).call(this);

      this.waitUntilVideoIsReady().then(this.onPlayerReady);
      !this.skinDisabled && this.addSpecificEvents();
    }
    /**
     * Function executed when the player is ready
     */

  }, {
    key: "onPlayerReady",
    value: function onPlayerReady() {
      _get(_getPrototypeOf(PlayerHtml5.prototype), "playerIsReady", this).call(this);

      this.updateDuration();
    }
    /**
     * Wait until the video is ready
     * @returns {Promise} Loading of the video with a Promise
     */

  }, {
    key: "waitUntilVideoIsReady",
    value: function waitUntilVideoIsReady() {
      var _this2 = this;

      return new window.Promise(function (resolve, reject) {
        // Check if the video is ready
        if (typeof _this2.element.duration === 'number' && isNaN(_this2.element.duration) === false) {
          resolve();
        } else {
          _this2.onDurationChange = function () {
            _this2.element.removeEventListener('durationchange', _this2.onDurationChange);

            _this2.element.removeEventListener('error', _this2.onError);

            resolve();
          };

          _this2.onError = function (error) {
            _this2.element.removeEventListener('error', _this2.onError);

            _this2.element.removeEventListener('durationchange', _this2.onDurationChange);

            reject(error);
          }; // Listen error or durationchange events to detect when the video is ready


          _this2.element.addEventListener('durationchange', _this2.onDurationChange);

          _this2.element.addEventListener('error', _this2.onError);
        }
      });
    }
    /**
     * Create event listeners
     * All listeners are created on class properties to facilitate the deletion of events
     */

  }, {
    key: "addSpecificEvents",
    value: function addSpecificEvents() {
      if (this.options.controls) {
        if (this.options.time) {
          // On durationchange event, update duration if value is different
          this.element.addEventListener('durationchange', this.updateDuration);
        } // On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar


        this.element.addEventListener('timeupdate', this.updateCurrentTime);
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

  }, {
    key: "getInstance",
    value: function getInstance() {
      return this.element;
    }
    /**
     * Get the player current time
     * @returns {Float|Integer} Current time of the video
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      var _this3 = this;

      return new window.Promise(function (resolve) {
        return resolve(_this3.element.currentTime);
      });
    }
    /**
     * Set the new current time for the player
     * @param {Float|Integer} Current time video
     */

  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(newTime) {
      this.element.currentTime = newTime;
    }
    /**
     * Get the player duration
     * @returns {Float|Integer} Duration of the video
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      var _this4 = this;

      return new window.Promise(function (resolve) {
        return resolve(_this4.element.duration);
      });
    }
    /**
     * Function executed on the video progress changed
     * @param {Object} e Event listener datas
     */

  }, {
    key: "onProgressChanged",
    value: function onProgressChanged(e) {
      var _this5 = this;

      this.getDuration().then(function (duration) {
        _this5.setCurrentTime(e.target.value * duration / 100);
      });
    }
    /**
     * Play method of the player
     */

  }, {
    key: "methodPlay",
    value: function methodPlay() {
      this.element.play();
    }
    /**
     * Pause method of the player
     */

  }, {
    key: "methodPause",
    value: function methodPause() {
      this.element.pause();
    }
    /**
     * Mute method of the player
     */

  }, {
    key: "methodMute",
    value: function methodMute() {
      this.element.muted = true;
      this.element.setAttribute('muted', '');
    }
    /**
     * Unmute method of the player
     */

  }, {
    key: "methodUnMute",
    value: function methodUnMute() {
      this.element.muted = false;
      this.element.removeAttribute('muted');
    }
    /**
     * Function executed when the video is waiting
     */

  }, {
    key: "onWaiting",
    value: function onWaiting() {
      this.loading(true);
    }
    /**
     * Function executed when the video is playing
     */

  }, {
    key: "onPlaying",
    value: function onPlaying() {
      this.loading(false);
    }
    /**
     * Function executed when the video is seeking
     */

  }, {
    key: "onSeeking",
    value: function onSeeking() {
      this.loading(true);
    }
    /**
     * Function executed when the video seek is done
     */

  }, {
    key: "onSeeked",
    value: function onSeeked() {
      this.loading(false);
    }
    /**
     * Unbind event listeners
     */

  }, {
    key: "removeSpecificEvents",
    value: function removeSpecificEvents() {
      this.options.time && this.element.removeEventListener('durationchange', this.updateDuration);
      this.element.removeEventListener('timeupdate', this.updateCurrentTime);
      this.element.removeEventListener('playing', this.onPlaying);
      this.element.removeEventListener('waiting', this.onWaiting);
      this.element.removeEventListener('seeking', this.onSeeking);
      this.element.removeEventListener('seeked', this.onSeeked);
      this.element.removeEventListener('ended', this.onVideoEnded);
    }
  }]);

  return PlayerHtml5;
}(_player.default);

exports.default = PlayerHtml5;

/***/ }),

/***/ "./src/shared/big-play/assets/scripts/big-play.js":
/*!********************************************************!*\
  !*** ./src/shared/big-play/assets/scripts/big-play.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = _default;

var _jsxDom = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/index.js");

var _bigPlay = _interopRequireDefault(__webpack_require__(/*! shared/assets/svgs/big-play.svg */ "./src/shared/assets/svgs/big-play.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return (0, _jsxDom.createElement)("div", {
    className: "v-bigPlay",
    innerHTML: _bigPlay.default
  });
}

/***/ }),

/***/ "./src/shared/big-play/config.js":
/*!***************************************!*\
  !*** ./src/shared/big-play/config.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./assets/styles/big-play.css */ "./src/shared/big-play/assets/styles/big-play.css");

__webpack_require__(/*! ./assets/scripts/big-play */ "./src/shared/big-play/assets/scripts/big-play.js");

/***/ }),

/***/ "./src/shared/control-bar/assets/scripts/control-bar.js":
/*!**************************************************************!*\
  !*** ./src/shared/control-bar/assets/scripts/control-bar.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(_ref) {
  var progressBar = _ref.progressBar,
      playPause = _ref.playPause,
      time = _ref.time,
      volume = _ref.volume,
      fullscreen = _ref.fullscreen;
  return (0, _jsxDom.createElement)("div", {
    className: "v-controlBar"
  }, progressBar && (0, _jsxDom.createElement)("div", {
    className: "v-progressBar"
  }, (0, _jsxDom.createElement)("div", {
    className: "v-progressSeek"
  }), (0, _jsxDom.createElement)("input", {
    type: "range",
    className: "v-progressInput",
    min: "0",
    max: "100",
    step: "0.01",
    value: "0",
    orient: "horizontal"
  })), (0, _jsxDom.createElement)("div", {
    className: "v-controlBarContent"
  }, playPause && (0, _jsxDom.createElement)("button", {
    className: "v-playPauseButton"
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
  })), volume && (0, _jsxDom.createElement)("button", {
    className: "v-volumeButton"
  }, (0, _jsxDom.createElement)("span", {
    className: "v-playerIcon v-iconVolumeHigh",
    innerHTML: _volumeHigh.default
  }), (0, _jsxDom.createElement)("span", {
    className: "v-playerIcon v-iconVolumeMute",
    innerHTML: _volumeMute.default
  })), fullscreen && (0, _jsxDom.createElement)("button", {
    className: "v-fullscreenButton"
  }, (0, _jsxDom.createElement)("span", {
    className: "v-playerIcon v-iconFullscreen",
    innerHTML: _fullscreen.default
  }), (0, _jsxDom.createElement)("span", {
    className: "v-playerIcon v-iconShrink",
    innerHTML: _fullscreenExit.default
  }))));
}

/***/ }),

/***/ "./src/shared/control-bar/config.js":
/*!******************************************!*\
  !*** ./src/shared/control-bar/config.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./assets/styles/control-bar.css */ "./src/shared/control-bar/assets/styles/control-bar.css");

__webpack_require__(/*! ./assets/scripts/control-bar */ "./src/shared/control-bar/assets/scripts/control-bar.js");

/***/ }),

/***/ "./src/shared/loader/assets/scripts/loader.js":
/*!****************************************************!*\
  !*** ./src/shared/loader/assets/scripts/loader.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./assets/styles/loader.css */ "./src/shared/loader/assets/styles/loader.css");

__webpack_require__(/*! ./assets/scripts/loader */ "./src/shared/loader/assets/scripts/loader.js");

/***/ }),

/***/ "./src/shared/overlay/assets/scripts/overlay.js":
/*!******************************************************!*\
  !*** ./src/shared/overlay/assets/scripts/overlay.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./assets/styles/overlay.css */ "./src/shared/overlay/assets/styles/overlay.css");

__webpack_require__(/*! ./assets/scripts/overlay */ "./src/shared/overlay/assets/scripts/overlay.js");

/***/ }),

/***/ "./src/shared/poster/assets/scripts/poster.js":
/*!****************************************************!*\
  !*** ./src/shared/poster/assets/scripts/poster.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = _default;

var _jsxDom = __webpack_require__(/*! jsx-dom */ "./node_modules/jsx-dom/index.js");

function _default(_ref) {
  var _ref$posterUrl = _ref.posterUrl,
      posterUrl = _ref$posterUrl === void 0 ? '' : _ref$posterUrl;
  var style = {
    backgroundImage: posterUrl && "url(".concat(posterUrl, ")")
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
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./assets/styles/poster.css */ "./src/shared/poster/assets/styles/poster.css");

__webpack_require__(/*! ./assets/scripts/poster */ "./src/shared/poster/assets/scripts/poster.js");

/***/ }),

/***/ "./src/vlite/js/player.js":
/*!********************************!*\
  !*** ./src/vlite/js/player.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * vlitejs Player
 * @module vlitejs/Player
 */
var Player = /*#__PURE__*/function () {
  /**
   * Instanciate the constructor
   * @constructor
   * @param {HTMLElement} element Player HTML element
   * @param {Object} options Player options
   * @param {Function} onReady Callback function executed when the player is ready
   */
  function Player(_ref) {
    var element = _ref.element,
        options = _ref.options,
        onReady = _ref.onReady;

    _classCallCheck(this, Player);

    this.onReady = onReady;
    this.isFullScreen = false;
    this.isPaused = null;
    this.element = element;
    this.touchSupport = this.isTouch();
    this.skinDisabled = false;
    this.delayAutoHide = 3000;
    var DEFAULT_OPTIONS = {
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
    this.options = Object.assign({}, DEFAULT_OPTIONS, options); // Keep player native control and disable custom skin

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
    this.onProgressChanged = this.onProgressChanged.bind(this);
  }

  _createClass(Player, [{
    key: "init",
    value: function init() {
      this.isApiReady().then(this.initReady);
    }
  }, {
    key: "isApiReady",
    value: function isApiReady() {
      return Promise.resolve();
    }
  }, {
    key: "initReady",
    value: function initReady() {
      this.render();
      this.addEvents();
    }
    /**
     * Build the DOM of the player
     */

  }, {
    key: "render",
    value: function render() {
      // Create a wrapper for each player
      var wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'v-vlite v-firstStart v-paused v-loading');
      wrapper.setAttribute('tabindex', 0);
      this.element.parentNode.insertBefore(wrapper, this.element);
      wrapper.appendChild(this.element);
      this.wrapperPlayer = this.element.parentNode;

      if (this.skinDisabled) {
        this.wrapperPlayer.classList.add('v-forceControls');
      }

      wrapper.appendChild((0, _jsxDom.createElement)(_jsxDom.Fragment, null, !this.options.nativeControlsForTouch && (0, _jsxDom.createElement)(_jsxDom.Fragment, null, (0, _jsxDom.createElement)(_overlay.default, {
        fastForward: !this.touchSupport
      }), (0, _jsxDom.createElement)(_loader.default, null), (0, _jsxDom.createElement)(_poster.default, {
        posterUrl: this.options.poster
      }), this.options.bigPlay && (0, _jsxDom.createElement)(_bigPlay.default, null), this.options.controls && (0, _jsxDom.createElement)(_controlBar.default, {
        progressBar: this.options.progressBar,
        playPause: this.options.playPause,
        time: this.options.time,
        volume: this.options.volume,
        fullscreen: this.options.fullscreen
      }))));
    }
    /**
     * Create event listeners
     * All listeners are created on class properties to facilitate the deletion of events
     */

  }, {
    key: "addEvents",
    value: function addEvents() {
      if (this.options.controls && this.options.progressBar) {
        this.wrapperPlayer.querySelector('.v-progressBar').addEventListener('change', this.onProgressChanged);
      }

      this.wrapperPlayer.addEventListener('click', this.onClickOnPlayer);
      this.wrapperPlayer.addEventListener('dblclick', this.onDoubleClickOnPlayer);
      this.wrapperPlayer.addEventListener('keyup', this.onKeyup);
      this.wrapperPlayer.addEventListener('mousemove', this.onMousemove);
      window.addEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen);
    } // Create fullscreen button event listener
    // Detect fullscreen change, particulary util for esc key because state is not updated
    // More information on MDN : https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

  }, {
    key: "onChangeFullScreen",
    value: function onChangeFullScreen(e) {
      if (!document[this.supportFullScreen.isFullScreen] && this.isFullScreen) {
        this.exitFullscreen(e.target);
      }
    }
  }, {
    key: "onClickOnPlayer",
    value: function onClickOnPlayer(e) {
      var target = e.target;
      var validateTargetPlayPauseButton = (0, _validateTarget.default)({
        target: target,
        selectorString: '.v-playPauseButton',
        nodeName: ['button']
      });
      var validateTargetPoster = (0, _validateTarget.default)({
        target: target,
        selectorString: '.v-poster, .v-overlay',
        nodeName: ['div']
      });
      var validateTargetVolume = (0, _validateTarget.default)({
        target: target,
        selectorString: '.v-volumeButton',
        nodeName: ['button']
      });
      var validateTargetFullscreen = (0, _validateTarget.default)({
        target: target,
        selectorString: '.v-fullscreenButton',
        nodeName: ['button']
      });

      if (validateTargetPlayPauseButton || validateTargetPoster) {
        this.togglePlayPause(e);
      } else if (validateTargetVolume) {
        this.toggleVolume(e);
      } else if (validateTargetFullscreen) {
        this.toggleFullscreen(e);
      }
    }
  }, {
    key: "onDoubleClickOnPlayer",
    value: function onDoubleClickOnPlayer(e) {
      var target = e.target;
      var validateTargetOverlay = (0, _validateTarget.default)({
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

  }, {
    key: "playerIsReady",
    value: function playerIsReady() {
      this.loading(false); // Execute the onReady function

      if (typeof this.onReady === 'function') {
        this.onReady(this);
      } // If player has autoplay option, play now


      if (this.options.autoplay) {
        // Autoplay on video is authorize only when the video is muted
        if (!this.element.muted) {
          this.mute();
          console.warn('vLitejs :: Video muted to authorize autoplay option');
        }

        this.togglePlayPause();
      }
    }
    /**
     * Update the loader status
     * @param {Boolean} state Status of the loader
     */

  }, {
    key: "loading",
    value: function loading(state) {
      if (state) {
        this.wrapperPlayer.classList.add('v-loading');
      } else {
        this.wrapperPlayer.classList.remove('v-loading');
      }
    }
    /**
     * Update player duration
     */

  }, {
    key: "updateDuration",
    value: function updateDuration() {
      var _this = this;

      this.getDuration().then(function (duration) {
        _this.wrapperPlayer.querySelector('.v-duration').innerHTML = _this.constructor.formatVideoTime(duration);
      });
    }
    /**
     * Function executed when is video is ended
     */

  }, {
    key: "onVideoEnded",
    value: function onVideoEnded() {
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

  }, {
    key: "togglePlayPause",
    value: function togglePlayPause(e) {
      if (e) {
        e.preventDefault();
      }

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

  }, {
    key: "fastForward",
    value: function fastForward(_ref2) {
      var _this2 = this;

      var direction = _ref2.direction;
      this.getCurrentTime().then(function (seconds) {
        if (direction === 'backward') {
          _this2.seekTo(seconds - 10);
        } else if (direction === 'forward') {
          _this2.seekTo(seconds + 10);
        }
      });
    }
    /**
     * Play the video
     */

  }, {
    key: "play",
    value: function play() {
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

  }, {
    key: "pause",
    value: function pause() {
      this.methodPause();
      this.isPaused = true;
      this.afterPlayPause();
    }
    /**
     * Function executed after the play or pause method
     */

  }, {
    key: "afterPlayPause",
    value: function afterPlayPause() {
      var _this3 = this;

      if (this.isPaused) {
        this.wrapperPlayer.classList.replace('v-playing', 'v-paused');
      } else {
        this.wrapperPlayer.classList.replace('v-paused', 'v-playing');
      }

      if (this.options.autoHide && this.options.controls) {
        if (this.isPaused) {
          this.wrapperPlayer.querySelector('.v-controlBar').classList.remove('hidden');
        } else {
          this.timerAutoHide = setTimeout(function () {
            _this3.wrapperPlayer.querySelector('.v-controlBar').classList.add('hidden');
          }, this.delayAutoHide);
        }
      }
    }
    /**
     * Toggle the volume on the video
     */

  }, {
    key: "toggleVolume",
    value: function toggleVolume(e) {
      e.preventDefault();
      var volumeButton = this.wrapperPlayer.querySelector('.v-volumeButton');

      if (volumeButton.classList.contains('v-muted')) {
        this.unMute();
      } else {
        this.mute();
      }
    }
    /**
     * Mute the volume on the video
     */

  }, {
    key: "mute",
    value: function mute() {
      this.methodMute();
      this.wrapperPlayer.querySelector('.v-volumeButton').classList.add('v-muted');
    }
    /**
     * Toggle the volume on the video
     */

  }, {
    key: "unMute",
    value: function unMute() {
      this.methodUnMute();
      this.wrapperPlayer.querySelector('.v-volumeButton').classList.remove('v-muted');
    }
    /**
     * Update the current time of the video
     * @param {Float|Integer} newTime New current time of the video
     */

  }, {
    key: "seekTo",
    value: function seekTo(newTime) {
      this.setCurrentTime(newTime);
    }
    /**
     * Toggle the fullscreen of the video
     */

  }, {
    key: "toggleFullscreen",
    value: function toggleFullscreen(e) {
      e.preventDefault();

      if (this.isFullScreen) {
        this.exitFullscreen();
      } else {
        this.requestFullscreen();
      }
    }
    /**
     * Check fullscreen support API on different browsers and cached prefixs
     */

  }, {
    key: "requestFullscreen",
    value:
    /**
     * Request fullscreen after user action
     */
    function requestFullscreen() {
      var requestFn = this.supportFullScreen.requestFn;

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

  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      var cancelFn = this.supportFullScreen.cancelFn;

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

  }, {
    key: "onKeyup",
    value: function onKeyup(e) {
      if (e.keyCode === 32) {
        this.togglePlayPause();
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

  }, {
    key: "onMousemove",
    value: function onMousemove() {
      var _this4 = this;

      if (this.isPaused === false && this.options.autoHide && this.options.controls) {
        this.wrapperPlayer.querySelector('.v-controlBar').classList.remove('hidden');
        clearTimeout(this.timerAutoHide);
        this.timerAutoHide = setTimeout(function () {
          _this4.wrapperPlayer.querySelector('.v-controlBar').classList.add('hidden');
        }, this.delayAutoHide);
      }
    }
    /**
     * Update current time displaying in the control bar and the width of the progress bar
     */

  }, {
    key: "updateCurrentTime",
    value: function updateCurrentTime() {
      var _this5 = this;

      Promise.all([this.getCurrentTime(), this.getDuration()]).then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            seconds = _ref4[0],
            duration = _ref4[1];

        var currentTime = Math.round(seconds);
        var width = currentTime * 100 / duration;

        var timeElement = _this5.wrapperPlayer.querySelector('.v-currentTime');

        _this5.wrapperPlayer.querySelector('.v-progressSeek').style.width = "".concat(width, "%");

        if (timeElement !== null) {
          timeElement.innerHTML = _this5.constructor.formatVideoTime(currentTime);
        }
      });
    }
    /**
     * Unbind event listeners
     */

  }, {
    key: "removeEvents",
    value: function removeEvents() {
      if (this.options.controls && this.options.progressBar) {
        this.wrapperPlayer.querySelector('.v-progressBar').removeEventListener('change', this.onProgressChanged);
      }

      this.wrapperPlayer.removeEventListener('click', this.onClickOnPlayer);
      this.wrapperPlayer.removeEventListener('dblclick', this.onDoubleClickOnPlayer);
      this.wrapperPlayer.removeEventListener('keyup', this.onKeyup);
      this.wrapperPlayer.removeEventListener('mousemove', this.onMousemove);
      window.removeEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen);
    }
    /**
     * Destroy the player
     * Remove event listeners, player instance and player HTML
     */

  }, {
    key: "destroy",
    value: function destroy() {
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

  }, {
    key: "isTouch",
    value: function isTouch() {
      return 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch;
    }
    /**
     * Convert video time second to 00:00 display
     * @param {Float|Integer} time Current time
     */

  }], [{
    key: "checkSupportFullScreen",
    value: function checkSupportFullScreen() {
      var prefixs = ['', 'moz', 'webkit', 'ms', 'o'];
      var lengthPrefixs = prefixs.length;
      var requestFn;
      var cancelFn;
      var changeEvent;
      var isFullScreen;

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

      var fullscreen = {
        requestFn: requestFn,
        cancelFn: cancelFn,
        changeEvent: changeEvent,
        isFullScreen: isFullScreen
      };
      return requestFn ? fullscreen : false;
    }
  }, {
    key: "formatVideoTime",
    value: function formatVideoTime(time) {
      var ms = time * 1000;
      var min = ms / 1000 / 60 << 0;
      var sec = ms / 1000 % 60 << 0;
      var timeInString = '';
      timeInString += min < 10 ? '0' : '';
      timeInString += min + ':';
      timeInString += sec < 10 ? '0' : '';
      timeInString += sec;
      return timeInString;
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),

/***/ "./src/vlite/js/vlite.js":
/*!*******************************!*\
  !*** ./src/vlite/js/vlite.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Providers = {
  html5: _html.default
};
/**
 * vlitejs entrypoint
 * @module vLite/entrypoint
 */

var vlitejs = /*#__PURE__*/function () {
  /**
   * Instanciate the constructor
   * @constructor
   * @param {String|Object} selector CSS selector or query selector
   * @param {Object} options Player options
   * @param {Function} onReady Callback function executed when the player is ready
   */
  function vlitejs(_ref) {
    var selector = _ref.selector,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options,
        _ref$provider = _ref.provider,
        provider = _ref$provider === void 0 ? 'html5' : _ref$provider,
        onReady = _ref.onReady;

    _classCallCheck(this, vlitejs);

    var element = null; // Detect the type of the selector (string or HTMLElement)

    if (typeof selector === 'string') {
      element = document.querySelector(selector);
    } else if (selector instanceof HTMLElement) {
      element = selector;
    } else {
      throw new TypeError('vlitejs :: The element or selector supplied is not valid.');
    }

    var ProviderInstance = Providers[provider];

    if (ProviderInstance) {
      var instancePlayer = new ProviderInstance({
        element: element,
        options: options,
        onReady: onReady
      });
      instancePlayer.init();
    } else {
      throw new TypeError("vlitejs :: Unknown provider \"".concat(provider, "\""));
    }
  }
  /**
   * Destroy the player instance
   */


  _createClass(vlitejs, [{
    key: "destroy",
    value: function destroy() {
      this.instancePlayer.destroy();
    }
  }]);

  return vlitejs;
}();

vlitejs.Player = _player.default;

vlitejs.registerProvider = function (id, instance) {
  if (!Object.keys(Providers).includes(id)) {
    Providers[id] = instance;
  } else {
    throw new TypeError("vlitejs::registerProvider, the provider id \"".concat(id, "\" is already registered."));
  }
};

var _default = vlitejs;
exports.default = _default;

/***/ }),

/***/ "./node_modules/jsx-dom/index.js":
/*!***************************************!*\
  !*** ./node_modules/jsx-dom/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": function() { return /* binding */ Component; },
/* harmony export */   "Fragment": function() { return /* binding */ Fragment; },
/* harmony export */   "SVGNamespace": function() { return /* binding */ SVGNamespace; },
/* harmony export */   "className": function() { return /* binding */ className; },
/* harmony export */   "createElement": function() { return /* binding */ createElement; },
/* harmony export */   "createFactory": function() { return /* binding */ createFactory; },
/* harmony export */   "createRef": function() { return /* binding */ createRef; },
/* harmony export */   "h": function() { return /* binding */ createElement; },
/* harmony export */   "isRef": function() { return /* binding */ isRef; },
/* harmony export */   "jsx": function() { return /* binding */ jsx; },
/* harmony export */   "jsxs": function() { return /* binding */ jsx; },
/* harmony export */   "memo": function() { return /* binding */ identity; },
/* harmony export */   "preventDefault": function() { return /* binding */ preventDefault; },
/* harmony export */   "stopPropagation": function() { return /* binding */ stopPropagation; },
/* harmony export */   "useCallback": function() { return /* binding */ identity; },
/* harmony export */   "useClassList": function() { return /* binding */ useClassList; },
/* harmony export */   "useMemo": function() { return /* binding */ useMemo; },
/* harmony export */   "useRef": function() { return /* binding */ createRef; },
/* harmony export */   "useText": function() { return /* binding */ useText; }
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

/* harmony default export */ __webpack_exports__["default"] = (index);



/***/ }),

/***/ "./src/shared/assets/styles/reset-vlite.css":
/*!**************************************************!*\
  !*** ./src/shared/assets/styles/reset-vlite.css ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/assets/styles/vars.css":
/*!*******************************************!*\
  !*** ./src/shared/assets/styles/vars.css ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/big-play/assets/styles/big-play.css":
/*!********************************************************!*\
  !*** ./src/shared/big-play/assets/styles/big-play.css ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/control-bar/assets/styles/control-bar.css":
/*!**************************************************************!*\
  !*** ./src/shared/control-bar/assets/styles/control-bar.css ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/loader/assets/styles/loader.css":
/*!****************************************************!*\
  !*** ./src/shared/loader/assets/styles/loader.css ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/overlay/assets/styles/overlay.css":
/*!******************************************************!*\
  !*** ./src/shared/overlay/assets/styles/overlay.css ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/shared/poster/assets/styles/poster.css":
/*!****************************************************!*\
  !*** ./src/shared/poster/assets/styles/poster.css ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/vlite/css/player.css":
/*!**********************************!*\
  !*** ./src/vlite/css/player.css ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/validate-target/src/index.js":
/*!***************************************************!*\
  !*** ./node_modules/validate-target/src/index.js ***!
  \***************************************************/
/***/ (function(module) {

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
/***/ (function(module) {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 29C8.82 29 3 23.18 3 16S8.82 3 16 3s13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z\"/></svg>";

/***/ }),

/***/ "./src/shared/assets/svgs/fullscreen-exit.svg":
/*!****************************************************!*\
  !*** ./src/shared/assets/svgs/fullscreen-exit.svg ***!
  \****************************************************/
/***/ (function(module) {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M24.586 27.414L29.172 32 32 29.172l-4.586-4.586L32 20H20v12zM0 12h12V0L7.414 4.586 2.875.043.047 2.871l4.539 4.543zm0 17.172L2.828 32l4.586-4.586L12 32V20H0l4.586 4.586zM20 12h12l-4.586-4.586 4.547-4.543L29.133.043l-4.547 4.543L20 0z\"/></svg>";

/***/ }),

/***/ "./src/shared/assets/svgs/fullscreen.svg":
/*!***********************************************!*\
  !*** ./src/shared/assets/svgs/fullscreen.svg ***!
  \***********************************************/
/***/ (function(module) {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M27.414 24.586L22.828 20 20 22.828l4.586 4.586L20 32h12V20zM12 0H0v12l4.586-4.586 4.543 4.539 2.828-2.828-4.543-4.539zm0 22.828L9.172 20l-4.586 4.586L0 20v12h12l-4.586-4.586zM32 0H20l4.586 4.586-4.543 4.539 2.828 2.828 4.543-4.539L32 12z\"/></svg>";

/***/ }),

/***/ "./src/shared/assets/svgs/pause.svg":
/*!******************************************!*\
  !*** ./src/shared/assets/svgs/pause.svg ***!
  \******************************************/
/***/ (function(module) {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M4 4h10v24H4zm14 0h10v24H18z\"/></svg>";

/***/ }),

/***/ "./src/shared/assets/svgs/play.svg":
/*!*****************************************!*\
  !*** ./src/shared/assets/svgs/play.svg ***!
  \*****************************************/
/***/ (function(module) {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M6 4l20 12L6 28z\"/></svg>";

/***/ }),

/***/ "./src/shared/assets/svgs/volume-high.svg":
/*!************************************************!*\
  !*** ./src/shared/assets/svgs/volume-high.svg ***!
  \************************************************/
/***/ (function(module) {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 34 32\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M27.814 28.814a1.5 1.5 0 0 1-1.061-2.56C29.492 23.515 31 19.874 31 16.001s-1.508-7.514-4.247-10.253a1.5 1.5 0 1 1 2.121-2.121C32.179 6.932 34 11.327 34 16.001s-1.82 9.069-5.126 12.374a1.495 1.495 0 0 1-1.061.439zm-5.329-2.829a1.5 1.5 0 0 1-1.061-2.56c4.094-4.094 4.094-10.755 0-14.849a1.5 1.5 0 1 1 2.121-2.121c2.55 2.55 3.954 5.94 3.954 9.546s-1.404 6.996-3.954 9.546a1.495 1.495 0 0 1-1.061.439zm-5.328-2.828a1.5 1.5 0 0 1-1.061-2.56 6.508 6.508 0 0 0 0-9.192 1.5 1.5 0 1 1 2.121-2.121c3.704 3.704 3.704 9.731 0 13.435a1.495 1.495 0 0 1-1.061.439zM13 30a1 1 0 0 1-.707-.293L4.586 22H1a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h3.586l7.707-7.707A1 1 0 0 1 14 3v26a1.002 1.002 0 0 1-1 1z\"/></svg>";

/***/ }),

/***/ "./src/shared/assets/svgs/volume-mute.svg":
/*!************************************************!*\
  !*** ./src/shared/assets/svgs/volume-mute.svg ***!
  \************************************************/
/***/ (function(module) {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M13 30a1 1 0 0 1-.707-.293L4.586 22H1a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h3.586l7.707-7.707A1 1 0 0 1 14 3v26a1.002 1.002 0 0 1-1 1z\"/></svg>";

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
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
}();
__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=vlite.js.map