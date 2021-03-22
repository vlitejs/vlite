(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vlitejsYoutube"] = factory();
	else
		root["vlitejsYoutube"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
!function() {
var exports = __webpack_exports__;
/*!**********************************!*\
  !*** ./src/providers/youtube.js ***!
  \**********************************/


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

var youtubeQueue = [];
/**
 * vlitejs Player Youtube
 * @module vlitejs/Player/PlayerYoutube
 */

var PlayerYoutube = /*#__PURE__*/function (_vlitejs$Player) {
  _inherits(PlayerYoutube, _vlitejs$Player);

  var _super = _createSuper(PlayerYoutube);

  function PlayerYoutube() {
    _classCallCheck(this, PlayerYoutube);

    return _super.apply(this, arguments);
  }

  _createClass(PlayerYoutube, [{
    key: "isApiReady",
    value: function isApiReady() {
      var _this = this;

      return new window.Promise(function (resolve) {
        if (typeof window.YT !== 'undefined') {
          resolve();
        } else {
          youtubeQueue.push(_this);
        }
      });
    }
  }, {
    key: "initReady",
    value: function initReady() {
      _get(_getPrototypeOf(PlayerYoutube.prototype), "initReady", this).call(this); // Init Youtube player with API


      this.initYoutubePlayer();
    }
    /**
     * Initialize the Youtube player
     */

  }, {
    key: "initYoutubePlayer",
    value: function initYoutubePlayer() {
      var _this2 = this;

      this.instancePlayer = new window.YT.Player(this.element.getAttribute('id'), {
        videoId: this.element.getAttribute('data-youtube-id'),
        height: '100%',
        width: '100%',
        playerVars: {
          showinfo: 0,
          modestbranding: 0,
          autohide: 1,
          rel: 0,
          fs: this.options.fullscreen ? 1 : 0,
          wmode: 'transparent',
          playsinline: this.options.playsinline ? 1 : 0,
          controls: this.skinDisabled ? 1 : 0
        },
        events: {
          onReady: function onReady(data) {
            return _this2.onPlayerReady(data);
          },
          onStateChange: function onStateChange(state) {
            return _this2.onPlayerStateChange(state);
          }
        }
      });
    }
    /**
     * Function executed when the player is ready
     * @param {Object} data Youtube datas from the player API
     */

  }, {
    key: "onPlayerReady",
    value: function onPlayerReady(data) {
      this.element = data.target.getIframe();

      _get(_getPrototypeOf(PlayerYoutube.prototype), "playerIsReady", this).call(this);
    }
    /**
     * Get the player instance
     * @returns {Object} Youtube API instance
     */

  }, {
    key: "getInstance",
    value: function getInstance() {
      return this.instancePlayer;
    }
    /**
     * Function executed when the player state changed
     * @param {Object} e Event listener datas
     */

  }, {
    key: "onPlayerStateChange",
    value: function onPlayerStateChange(e) {
      var _this3 = this;

      if (e.data === window.YT.PlayerState.UNSTARTED) {
        if (this.options.controls && this.options.time) {
          _get(_getPrototypeOf(PlayerYoutube.prototype), "updateDuration", this).call(this);
        }
      } else if (e.data === window.YT.PlayerState.ENDED) {
        _get(_getPrototypeOf(PlayerYoutube.prototype), "onVideoEnded", this).call(this);
      } else if (e.data === window.YT.PlayerState.PLAYING) {
        this.loading(false);

        if (this.options.controls) {
          setInterval(function () {
            _get(_getPrototypeOf(PlayerYoutube.prototype), "updateCurrentTime", _this3).call(_this3);
          }, 100);
        }

        _get(_getPrototypeOf(PlayerYoutube.prototype), "afterPlayPause", this).call(this, 'play');
      } else if (e.data === window.YT.PlayerState.PAUSED) {
        _get(_getPrototypeOf(PlayerYoutube.prototype), "afterPlayPause", this).call(this, 'pause');
      } else if (e.data === window.YT.PlayerState.BUFFERING) {
        this.loading(true);
      }
    }
    /**
     * Set the new current time for the player
     * @param {Float|Integer} Current time video
     */

  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(newTime) {
      this.instancePlayer.seekTo(newTime);
    }
    /**
     * Get the player current time
     * @returns {Float|Integer} Current time of the video
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      var _this4 = this;

      return new window.Promise(function (resolve) {
        return resolve(_this4.instancePlayer.getCurrentTime());
      });
    }
    /**
     * Get the player duration
     * @returns {Float|Integer} Duration of the video
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      var _this5 = this;

      return new window.Promise(function (resolve) {
        return resolve(_this5.instancePlayer.getDuration());
      });
    }
    /**
     * Function executed on the video progress changed
     * @param {Object} e Event listener datas
     */

  }, {
    key: "onProgressChanged",
    value: function onProgressChanged(e) {
      var _this6 = this;

      this.getDuration().then(function (duration) {
        _this6.setCurrentTime(e.target.value * duration / 100);
      });
    }
    /**
     * Play method of the player
     */

  }, {
    key: "methodPlay",
    value: function methodPlay() {
      this.instancePlayer.playVideo();
    }
    /**
     * Pause method of the player
     */

  }, {
    key: "methodPause",
    value: function methodPause() {
      this.instancePlayer.pauseVideo();
    }
    /**
     * Mute method of the player
     */

  }, {
    key: "methodMute",
    value: function methodMute() {
      this.instancePlayer.mute();
    }
    /**
     * Unmute method of the player
     */

  }, {
    key: "methodUnMute",
    value: function methodUnMute() {
      this.instancePlayer.unMute();
    }
    /**
     * Remove the Youtube instance
     */

  }, {
    key: "removeInstance",
    value: function removeInstance() {
      this.instancePlayer.destroy();
    }
  }]);

  return PlayerYoutube;
}(vlitejs.Player);

function onYoutubeApiReady() {
  youtubeQueue.forEach(function (item) {
    return item.initReady();
  });
  youtubeQueue = [];
}

if (typeof window.YT === 'undefined') {
  var script = document.createElement('script');
  script.async = true;
  script.type = 'text/javascript';
  script.src = 'https://youtube.com/iframe_api';

  window.onYouTubeIframeAPIReady = function () {
    return onYoutubeApiReady();
  };

  document.getElementsByTagName('body')[0].appendChild(script);
}

var _default = PlayerYoutube;
exports.default = _default;
}();
__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=youtube.js.map