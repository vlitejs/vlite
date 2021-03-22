(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vlitejsVimeo"] = factory();
	else
		root["vlitejsVimeo"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
!function() {
var exports = __webpack_exports__;
/*!********************************!*\
  !*** ./src/providers/vimeo.js ***!
  \********************************/


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

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

if (typeof vlitejs === 'undefined') {
  throw new TypeError('vlitejs :: The library is not available.');
}

var vimeoQueue = [];
/**
 * vlitejs Player Vimeo
 * @module vlitejs/Player/PlayerVimeo
 */

var PlayerVimeo = /*#__PURE__*/function (_vlitejs$Player) {
  _inherits(PlayerVimeo, _vlitejs$Player);

  var _super = _createSuper(PlayerVimeo);

  /**
   * Instanciate the constructor
   * @constructor
   * @param {HTMLElement} element Player HTML element
   * @param {Object} options Player options
   * @param {Function} onReady Callback function executed when the player is ready
   */
  function PlayerVimeo(_ref) {
    var _this;

    var element = _ref.element,
        options = _ref.options,
        onReady = _ref.onReady;

    _classCallCheck(this, PlayerVimeo);

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

  _createClass(PlayerVimeo, [{
    key: "isApiReady",
    value: function isApiReady() {
      var _this2 = this;

      return new window.Promise(function (resolve) {
        if (typeof window.Vimeo !== 'undefined') {
          resolve();
        } else {
          vimeoQueue.push(_this2);
        }
      });
    }
  }, {
    key: "initReady",
    value: function initReady() {
      _get(_getPrototypeOf(PlayerVimeo.prototype), "initReady", this).call(this); // Init Vimeo player with API


      this.initVimeoPlayer();
    }
    /**
     * Initialize the Vimeo player
     */

  }, {
    key: "initVimeoPlayer",
    value: function initVimeoPlayer() {
      this.instancePlayer = new window.Vimeo.Player(this.element.getAttribute('id'), {
        id: this.element.getAttribute('data-vimeo-id'),
        controls: true
      });
      this.instancePlayer.ready().then(this.onPlayerReady());
    }
    /**
     * Function executed when the player is ready
     */

  }, {
    key: "onPlayerReady",
    value: function onPlayerReady() {
      this.element = this.instancePlayer.element;

      _get(_getPrototypeOf(PlayerVimeo.prototype), "playerIsReady", this).call(this);

      this.addSpecificEvents();
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
          this.instancePlayer.on('durationchange', this.updateDuration);
        } // On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar


        this.instancePlayer.on('timeupdate', this.updateCurrentTime);
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

  }, {
    key: "getInstance",
    value: function getInstance() {
      return this.instancePlayer;
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
        _this3.instancePlayer.getCurrentTime().then(function (seconds) {
          return resolve(seconds);
        });
      });
    }
    /**
     * Set the new current time for the player
     * @param {Float|Integer} Current time video
     */

  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(newTime) {
      this.instancePlayer.setCurrentTime(newTime);
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
        _this4.instancePlayer.getDuration().then(function (duration) {
          return resolve(duration);
        });
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
      this.instancePlayer.play();
    }
    /**
     * Pause method of the player
     */

  }, {
    key: "methodPause",
    value: function methodPause() {
      this.instancePlayer.pause();
    }
    /**
     * Mute method of the player
     */

  }, {
    key: "methodMute",
    value: function methodMute() {
      this.instancePlayer.setVolume(0);
    }
    /**
     * Unmute method of the player
     */

  }, {
    key: "methodUnMute",
    value: function methodUnMute() {
      this.instancePlayer.setVolume(1);
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
      this.options.time && this.instancePlayer.off('durationchange', this.updateDuration);
      this.instancePlayer.off('timeupdate', this.updateCurrentTime);
      this.instancePlayer.off('playing', this.onPlaying);
      this.instancePlayer.off('waiting', this.onWaiting);
      this.instancePlayer.off('seeking', this.onSeeking);
      this.instancePlayer.off('seeked', this.onSeeked);
      this.instancePlayer.off('ended', this.onVideoEnded);
    }
    /**
     * Remove the Vimeo instance
     */

  }, {
    key: "removeInstance",
    value: function removeInstance() {
      this.instancePlayer.destroy();
    }
  }]);

  return PlayerVimeo;
}(vlitejs.Player);

function onVimeoApiReady() {
  vimeoQueue.forEach(function (item) {
    return item.initReady();
  });
  vimeoQueue = [];
}

if (typeof window.YT === 'undefined') {
  var script = document.createElement('script');
  script.async = true;
  script.type = 'text/javascript';
  script.src = 'https://player.vimeo.com/api/player.js';

  script.onload = function () {
    return onVimeoApiReady();
  };

  document.getElementsByTagName('body')[0].appendChild(script);
}

var _default = PlayerVimeo;
exports.default = _default;
}();
__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=vimeo.js.map