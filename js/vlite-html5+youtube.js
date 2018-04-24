/**
* @license MIT
* @name vLitejs
* @version 1.1.0
* @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
* @description: vLite.js is a fast and lightweight Javascript library to customize and skin native HTML5 video and Youtube video in Javascript native with a default skin
* {@link https://vlite.bitbucket.io}
* @copyright 2018 Joris DANIEL <https://vlite.bitbucket.io>
**/

(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports}var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports}__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{configurable:false,enumerable:true,get:getter})}};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module['default']}:function getModuleExports(){return module};__webpack_require__.d(getter,'a',getter);return getter};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)};__webpack_require__.p="/js//";return __webpack_require__(__webpack_require__.s=1)})

/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(_ref) {
        var selector = _ref.selector,
            options = _ref.options,
            callback = _ref.callback;

        _classCallCheck(this, Player);

        this.callback = callback;
        this.isFullScreen = false;
        this.player = selector;
        this.touchSupport = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch ? true : false;
        this.skinDisabled = false;

        var customOptions = {};

        var DEFAULT_OPTIONS = {
            autoplay: false,
            controls: true,
            playPause: true,
            timeline: true,
            time: true,
            volume: true,
            fullscreen: true,
            poster: null,
            bigPlay: true,
            nativeControlsForTouch: false
        };

        //Check if options have gone through DOM with data attribute
        if (this.player.hasAttribute('data-options')) {

            //Check if there is a conflict with the constructor options
            if (options !== undefined) {
                console.warn('[vLite] - Option passed in "' + selector + '" by data attribute is priority over object in constructor.');
            }

            customOptions = JSON.parse(this.player.getAttribute('data-options'));
        } else {
            //No conflict, we can use options in the constructor
            customOptions = options;
        }

        this.options = this.constructor.extend(true, DEFAULT_OPTIONS, customOptions);

        if (this.touchSupport && this.options.nativeControlsForTouch) {
            this.skinDisabled = true;
            this.player.setAttribute('controls', 'controls');
            this.options.controls = false;
        }

        //Check fullscreen support API on different browsers and cached prefixs
        this.supportFullScreen = this.constructor.checkSupportFullScreen();

        this.buildPlayer();
        this.bindEvents();
    }

    _createClass(Player, [{
        key: 'buildPlayer',
        value: function buildPlayer() {

            //Wrap player
            var wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'wrapper-vlite first-start paused loading');
            this.player.parentNode.insertBefore(wrapper, this.player);
            wrapper.appendChild(this.player);
            this.wrapperPlayer = this.player.parentNode;
            this.player.classList.add('toggle-play-pause-js');

            if (this.skinDisabled) {
                this.wrapperPlayer.classList.add('force-controls');
            }

            var cssstylePoster = this.options.poster !== null ? 'background-image: url(' + this.options.poster + ');' : '';

            var htmlControls = '<div class="wrapper-loader">\n                                <div class="loader">\n                                    <div class="loader-bounce-1"></div>\n                                    <div class="loader-bounce-2"></div>\n                                    <div class="loader-bounce-3"></div>\n                                </div>\n                            </div>\n                            <div class="poster toggle-play-pause-js active" style="' + cssstylePoster + '"></div>\n                            ' + (this.options.bigPlay ? '<div class="big-play-button toggle-play-pause-js">\n                                     <span class="player-icon icon-play2"></span>\n                                </div>' : '') + '\n                            ' + (this.options.controls ? '<div class="control-bar">\n                                    ' + (this.options.timeline ? '<div class="progress-bar">\n                                            <div class="progress-seek"></div>\n                                            <input type="range" class="progress-input" min="0" max="100" step="0.01" value="0" orient="horizontal" />\n                                        </div>' : '') + '\n                                    <div class="control-bar-inner">\n                                        ' + (this.options.playPause ? '<div class="play-pause-button toggle-play-pause-js">\n                                                <span class="player-icon icon-play3"></span>\n                                                <span class="player-icon icon-pause2"></span>\n                                            </div>' : '') + '\n                                        ' + (this.options.time ? '<div class="time">\n                                                <span class="current-time">00:00</span>&nbsp;/&nbsp;<span class="duration"></span>\n                                            </div>' : '') + '\n                                        ' + (this.options.volume ? '<div class="volume">\n                                                <span class="player-icon icon-volume-high"></span>\n                                                <span class="player-icon icon-volume-mute"></span>\n                                            </div>' : '') + '\n                                        ' + (this.options.fullscreen ? '<div class="fullscreen">\n                                                <span class="player-icon icon-fullscreen"></span>\n                                                <span class="player-icon icon-shrink"></span>\n                                            </div>' : '') + '\n                                    </div>\n                                </div>' : '');

            wrapper.insertAdjacentHTML('beforeend', htmlControls);
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            if (this.options.controls && this.options.timeline) {
                //Add callback function to remove them on destroy event
                this.onChangeProgressBar = function (e) {
                    _this.onProgressChanged(e);
                };
                //Create progress bar event listener
                this.wrapperPlayer.querySelector('.progress-input').addEventListener('change', this.onChangeProgressBar, false);
            }

            //Add callback function to remove them on destroy event
            this.onClickTogglePlayPause = function (e) {
                e.preventDefault();
                _this.togglePlayPause();
            };
            //Create play/pause button event listener
            [].forEach.call(this.wrapperPlayer.querySelectorAll('.toggle-play-pause-js'), function (button) {
                button.addEventListener('click', _this.onClickTogglePlayPause, false);
            });

            if (this.options.controls && this.options.volume) {
                //Add callback function to remove them on destroy event
                this.onCLickToggleVolume = function (e) {
                    e.preventDefault();
                    _this.toggleVolume();
                };
                //Create volume button event listener
                this.wrapperPlayer.querySelector('.volume').addEventListener('click', this.onCLickToggleVolume, false);
            }

            if (this.options.controls && this.options.fullscreen) {
                //Add callback function to remove them on destroy event
                this.onClickToggleFullscreen = function (e) {
                    e.preventDefault();
                    _this.toggleFullscreen();
                };
                //Create fullscreen button event listener
                this.wrapperPlayer.querySelector('.fullscreen').addEventListener('click', this.onClickToggleFullscreen, false);
            }

            //Add callback function to remove them on destroy event
            this.onChangeFullScreen = function (e) {

                if (!document[_this.supportFullScreen.isFullScreen] && _this.isFullScreen) {
                    _this.exitFullscreen(e.target);
                }
            };
            //Create fullscreen button event listener
            //Detect fullscreen change, particulary util for esc key because state is not updated
            //More information on MDN : https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
            window.addEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen, false);
        }
    }, {
        key: 'playerIsReady',
        value: function playerIsReady() {

            this.loading(false);

            if (typeof this.callback === 'function') {
                this.callback(this);
            }

            //If player has autoplay option, play now
            if (this.options.autoplay) {
                this.togglePlayPause();
            }
        }
    }, {
        key: 'loading',
        value: function loading(state) {

            if (state) {
                this.wrapperPlayer.classList.add('loading');
            } else {
                this.wrapperPlayer.classList.remove('loading');
            }
        }
    }, {
        key: 'updateDuration',
        value: function updateDuration() {
            this.wrapperPlayer.querySelector('.duration').innerHTML = this.constructor.formatVideoTime(this.getDuration());
        }
    }, {
        key: 'onVideoEnded',
        value: function onVideoEnded() {

            this.wrapperPlayer.classList.replace('playing', 'paused');
            this.wrapperPlayer.classList.add('first-start');
            this.wrapperPlayer.querySelector('.poster').classList.add('active');

            if (this.options.constrols) {
                this.wrapperPlayer.querySelector('.progress-seek').style.width = '0%';
                this.wrapperPlayer.querySelector('.progress-input').setAttribute('value', 0);
                this.wrapperPlayer.querySelector('.current-time').innerHTML = '00:00';
            }
        }
    }, {
        key: 'togglePlayPause',
        value: function togglePlayPause() {

            if (this.wrapperPlayer.classList.contains('paused')) {
                this.play();
            } else {
                this.pause();
            }
        }
    }, {
        key: 'play',
        value: function play() {

            if (this.wrapperPlayer.classList.contains('first-start')) {
                this.wrapperPlayer.classList.remove('first-start');
                this.wrapperPlayer.querySelector('.poster').classList.remove('active');
            }

            this.methodPlay();
            this.afterPlayPause('play');
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.methodPause();
            this.afterPlayPause('pause');
        }
    }, {
        key: 'afterPlayPause',
        value: function afterPlayPause(status) {

            if (status === 'play') {
                this.wrapperPlayer.classList.replace('paused', 'playing');
            } else {
                this.wrapperPlayer.classList.replace('playing', 'paused');
            }
        }

        //Toggle volume on the video

    }, {
        key: 'toggleVolume',
        value: function toggleVolume() {

            var volumeButton = this.wrapperPlayer.querySelector('.volume');

            if (volumeButton.classList.contains('muted')) {
                this.unMute();
            } else {
                this.mute();
            }
        }
    }, {
        key: 'mute',
        value: function mute() {
            this.methodMute();
            this.wrapperPlayer.querySelector('.volume').classList.add('muted');
        }
    }, {
        key: 'unMute',
        value: function unMute() {
            this.methodUnMute();
            this.wrapperPlayer.querySelector('.volume').classList.remove('muted');
        }
    }, {
        key: 'seekTo',
        value: function seekTo(newTime) {
            this.setCurrentTime(newTime);
        }
    }, {
        key: 'toggleFullscreen',
        value: function toggleFullscreen() {
            if (this.isFullScreen) {
                this.exitFullscreen();
            } else {
                this.requestFullscreen();
            }
        }

        //Check fullscreen support API on different browsers and cached prefixs

    }, {
        key: 'requestFullscreen',


        //Request fullscreen after user action
        value: function requestFullscreen() {
            var requestFn = this.supportFullScreen.requestFn;


            if (this.player[requestFn]) {
                //On Firefox, request fullscreen on parentNode player, to display custom controls
                if (requestFn === 'mozRequestFullScreen') {
                    this.player.parentNode[requestFn]();
                } else {
                    this.player[requestFn]();
                }
                this.isFullScreen = true;
                this.wrapperPlayer.classList.add('fullscreen-display');
                this.wrapperPlayer.querySelector('.fullscreen').classList.add('exit');
            }
        }

        //Exit fullscreen after user action

    }, {
        key: 'exitFullscreen',
        value: function exitFullscreen() {
            var cancelFn = this.supportFullScreen.cancelFn;


            if (document[cancelFn]) {

                document[cancelFn]();

                this.wrapperPlayer.classList.remove('fullscreen-display');
                this.wrapperPlayer.querySelector('.fullscreen').classList.remove('exit');

                this.isFullScreen = false;
            }
        }

        //Update current time displaying in the control bar and the width of the progress bar

    }, {
        key: 'updateCurrentTime',
        value: function updateCurrentTime() {

            var currentTime = Math.round(this.getCurrentTime()),
                duration = this.getDuration(),
                width = currentTime * 100 / duration,
                timeElement = this.wrapperPlayer.querySelector('.current-time');

            this.wrapperPlayer.querySelector('.progress-seek').style.width = width + '%';

            if (timeElement !== null) {
                timeElement.innerHTML = this.constructor.formatVideoTime(currentTime);
            }
        }
    }, {
        key: 'unBindEvents',
        value: function unBindEvents() {
            var _this2 = this;

            [].forEach.call(this.wrapperPlayer.querySelectorAll('.toggle-play-pause-js'), function (button) {
                button.removeEventListener('click', _this2.onClickTogglePlayPause);
            });

            if (this.options.timeline) {
                this.wrapperPlayer.querySelector('.progress-input').removeEventListener('change', this.onChangeProgressBar, false);
            }

            if (this.options.volume) {
                this.wrapperPlayer.querySelector('.volume').removeEventListener('click', this.onCLickToggleVolume);
            }

            if (this.options.fullscreen) {
                this.wrapperPlayer.querySelector('.fullscreen').removeEventListener('click', this.onClickToggleFullscreen);
            }

            window.removeEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen);
        }
    }, {
        key: 'destroy',
        value: function destroy() {

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

        //Convert video time second to 00:00 display

    }], [{
        key: 'checkSupportFullScreen',
        value: function checkSupportFullScreen() {

            var prefixs = ['', 'moz', 'webkit', 'ms', 'o'],
                lengthPrefixs = prefixs.length,
                fullscreen = void 0,
                requestFn = void 0,
                cancelFn = void 0,
                changeEvent = void 0,
                isFullScreen = void 0;

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

            fullscreen = {
                requestFn: requestFn,
                cancelFn: cancelFn,
                changeEvent: changeEvent,
                isFullScreen: isFullScreen
            };

            return requestFn ? fullscreen : false;
        }
    }, {
        key: 'formatVideoTime',
        value: function formatVideoTime(time) {

            var ms = time * 1000,
                min = ms / 1000 / 60 << 0,
                sec = ms / 1000 % 60 << 0,
                timeInString = '';

            timeInString += min < 10 ? '0' : '';
            timeInString += min + ':';
            timeInString += sec < 10 ? '0' : '';
            timeInString += sec;

            return timeInString;
        }

        // https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
        // Pass in the objects to merge as arguments.
        // For a deep extend, set the first argument to `true`.

    }, {
        key: 'extend',
        value: function extend() {
            var _this3 = this;

            var extended = {};
            var deep = false;
            var i = 0;
            var length = arguments.length;

            // Check if a deep merge

            if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
                deep = arguments[0];
                i++;
            }

            // Merge the object into the extended object
            var merge = function merge(obj) {
                for (var prop in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                        // If deep merge and property is an object, merge properties
                        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                            extended[prop] = _this3.constructor.extend(true, extended[prop], obj[prop]);
                        } else {
                            extended[prop] = obj[prop];
                        }
                    }
                }
            };

            // Loop through each object and conduct a merge
            for (; i < length; i++) {
                var obj = arguments[i];
                merge(obj);
            }

            return extended;
        }
    }]);

    return Player;
}();

exports.default = Player;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playerHtml = __webpack_require__(2);

var _playerHtml2 = _interopRequireDefault(_playerHtml);

var _playerYoutube = __webpack_require__(3);

var _playerYoutube2 = _interopRequireDefault(_playerYoutube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _VliteYoutube = {
    apiLoading: false,
    apiReady: false,
    apiReadyQueue: []
};

var Vlite = function () {
    function Vlite(_ref) {
        var selector = _ref.selector,
            _ref$options = _ref.options,
            options = _ref$options === undefined ? undefined : _ref$options,
            callback = _ref.callback;

        _classCallCheck(this, Vlite);

        this.player = null;
        if (typeof selector === 'string') {
            this.player = document.querySelector(selector);
        } else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
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

    _createClass(Vlite, [{
        key: 'initPlayer',
        value: function initPlayer() {

            if (this.player.hasAttribute('data-youtube-id')) {

                if (!_VliteYoutube.apiReady) {

                    if (!_VliteYoutube.apiLoading) {
                        _VliteYoutube.apiLoading = true;
                        this.loadYoutubeAPI();
                    }

                    _VliteYoutube.apiReadyQueue.push({
                        player: this.player,
                        options: this.options,
                        callback: this.callback
                    });
                } else {
                    this.instancePlayer = new _playerYoutube2.default({
                        selector: this.player,
                        options: this.options,
                        callback: this.callback
                    });
                }
            } else {
                this.instancePlayer = new _playerHtml2.default({
                    selector: this.player,
                    options: this.options,
                    callback: this.callback
                });
            }
        }
    }, {
        key: 'loadYoutubeAPI',
        value: function loadYoutubeAPI() {
            var _this = this;

            var script = document.createElement('script');

            script.async = true;
            script.type = 'text/javascript';
            script.src = 'https://youtube.com/iframe_api';

            window.onYouTubeIframeAPIReady = function () {

                _VliteYoutube.apiReady = true;

                _VliteYoutube.apiReadyQueue.forEach(function (element) {
                    _this.instancePlayer = new _playerYoutube2.default({
                        selector: element.player,
                        options: element.options,
                        callback: element.callback
                    });
                });
                _VliteYoutube.apiReadyQueue = [];
            };

            document.getElementsByTagName('body')[0].appendChild(script);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.instancePlayer.destroy();
        }
    }]);

    return Vlite;
}();

window.vLite = Vlite;
exports.default = Vlite;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerHtml5 = function (_Player) {
    _inherits(PlayerHtml5, _Player);

    function PlayerHtml5(_ref) {
        var selector = _ref.selector,
            options = _ref.options,
            callback = _ref.callback;

        _classCallCheck(this, PlayerHtml5);

        //Create Promise to check when the video is ready
        var _this = _possibleConstructorReturn(this, (PlayerHtml5.__proto__ || Object.getPrototypeOf(PlayerHtml5)).call(this, {
            selector: selector,
            options: options,
            callback: callback
        }));

        //Init Player class


        _this.waitUntilVideoIsReady().then(_this.onPlayerReady.bind(_this));

        if (!_this.skinDisabled) {
            _this.bindSpecificEvents();
        }

        return _this;
    }

    _createClass(PlayerHtml5, [{
        key: 'onPlayerReady',
        value: function onPlayerReady() {
            _get(PlayerHtml5.prototype.__proto__ || Object.getPrototypeOf(PlayerHtml5.prototype), 'playerIsReady', this).call(this);
        }
    }, {
        key: 'waitUntilVideoIsReady',
        value: function waitUntilVideoIsReady() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                //Check if the video is ready
                if (typeof _this2.player.duration === "number" && isNaN(_this2.player.duration) === false) {

                    resolve();
                } else {

                    //Add callback function to remove them on event listener
                    _this2.onDurationChange = function () {

                        _this2.player.removeEventListener('durationchange', _this2.onDurationChange);
                        _this2.player.removeEventListener('error', _this2.onError);

                        resolve();
                    };

                    //Add callback function to remove them on event listener
                    _this2.onError = function (error) {

                        _this2.player.removeEventListener('error', _this2.onError);
                        _this2.player.removeEventListener('durationchange', _this2.onDurationChange);

                        reject(error);
                    };

                    //Listen error or durationchange events to detect when the video is ready
                    _this2.player.addEventListener('durationchange', _this2.onDurationChange, false);
                    _this2.player.addEventListener('error', _this2.onError, false);
                }
            });
        }
    }, {
        key: 'bindSpecificEvents',
        value: function bindSpecificEvents() {
            var _this3 = this;

            if (this.options.controls) {

                if (this.options.time) {

                    //Load video metadata and update state duration
                    this.player.addEventListener('loadedmetadata', function (e) {
                        return _this3.updateDuration(e);
                    }, false);

                    //On durationchange event, update duration if value is different
                    this.player.addEventListener('durationchange', function (e) {
                        return _this3.updateDuration(e);
                    }, false);
                }

                //On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar
                this.player.addEventListener('timeupdate', function (e) {
                    return _this3.updateCurrentTime(e);
                }, false);
            }

            //On ended event, show poster and reset timeline and time
            this.player.addEventListener('ended', function (e) {
                return _this3.onVideoEnded(e);
            }, false);
        }
    }, {
        key: 'getInstance',
        value: function getInstance() {
            return this.player;
        }
    }, {
        key: 'getCurrentTime',
        value: function getCurrentTime() {
            return this.player.currentTime;
        }
    }, {
        key: 'setCurrentTime',
        value: function setCurrentTime(newTime) {
            this.player.currentTime = newTime;
        }
    }, {
        key: 'getDuration',
        value: function getDuration() {
            return this.player.duration;
        }
    }, {
        key: 'onProgressChanged',
        value: function onProgressChanged(e) {
            this.setCurrentTime(e.target.value * this.getDuration() / 100);
        }
    }, {
        key: 'methodPlay',
        value: function methodPlay() {
            this.player.play();
        }
    }, {
        key: 'methodPause',
        value: function methodPause() {
            this.player.pause();
        }
    }, {
        key: 'methodMute',
        value: function methodMute() {
            this.player.muted = true;
        }
    }, {
        key: 'methodUnMute',
        value: function methodUnMute() {
            this.player.muted = false;
        }
    }, {
        key: 'unBindSpecificEvents',
        value: function unBindSpecificEvents() {

            if (this.options.time) {
                this.player.removeEventListener('loadedmetadata', this.updateDuration);
                this.player.removeEventListener('durationchange', this.updateDuration);
            }
            this.player.removeEventListener('timeupdate', this.updateCurrentTime);
            this.player.removeEventListener('play', this.onPlay);
            this.player.removeEventListener('ended', this.onVideoEnded);
        }
    }]);

    return PlayerHtml5;
}(_player2.default);

exports.default = PlayerHtml5;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerYoutube = function (_Player) {
    _inherits(PlayerYoutube, _Player);

    function PlayerYoutube(_ref) {
        var selector = _ref.selector,
            options = _ref.options,
            callback = _ref.callback;

        _classCallCheck(this, PlayerYoutube);

        //Init Youtube player with API
        var _this = _possibleConstructorReturn(this, (PlayerYoutube.__proto__ || Object.getPrototypeOf(PlayerYoutube)).call(this, {
            selector: selector,
            options: options,
            callback: callback
        }));

        //Init Player class


        _this.initYoutubePlayer();

        return _this;
    }

    _createClass(PlayerYoutube, [{
        key: 'initYoutubePlayer',
        value: function initYoutubePlayer() {
            var _this2 = this;

            this.instancePlayer = new YT.Player(this.player.getAttribute('id'), {
                videoId: this.player.getAttribute('data-youtube-id'),
                height: '100%',
                width: '100%',
                playerVars: {
                    'showinfo': 0,
                    'modestbranding': 0,
                    'autohide': 0,
                    'rel': 0,
                    'wmode': 'transparent',
                    'controls': this.skinDisabled ? 1 : 0
                },
                events: {
                    'onReady': function onReady(data) {
                        return _this2.onPlayerReady(data);
                    },
                    'onStateChange': function onStateChange(state) {
                        return _this2.onPlayerStateChange(state);
                    }
                }
            });
        }
    }, {
        key: 'onPlayerReady',
        value: function onPlayerReady(data) {
            this.player = data.target.getIframe();
            _get(PlayerYoutube.prototype.__proto__ || Object.getPrototypeOf(PlayerYoutube.prototype), 'playerIsReady', this).call(this);
        }
    }, {
        key: 'getInstance',
        value: function getInstance() {
            return this.instancePlayer;
        }
    }, {
        key: 'onPlayerStateChange',
        value: function onPlayerStateChange(e) {
            var _this3 = this;

            switch (e.data) {
                case YT.PlayerState.UNSTARTED:
                    if (this.options.time) {
                        _get(PlayerYoutube.prototype.__proto__ || Object.getPrototypeOf(PlayerYoutube.prototype), 'updateDuration', this).call(this);
                    }
                    break;

                case YT.PlayerState.ENDED:
                    _get(PlayerYoutube.prototype.__proto__ || Object.getPrototypeOf(PlayerYoutube.prototype), 'onVideoEnded', this).call(this);
                    break;

                case YT.PlayerState.PLAYING:

                    setInterval(function () {
                        _get(PlayerYoutube.prototype.__proto__ || Object.getPrototypeOf(PlayerYoutube.prototype), 'updateCurrentTime', _this3).call(_this3);
                    }, 100);

                    _get(PlayerYoutube.prototype.__proto__ || Object.getPrototypeOf(PlayerYoutube.prototype), 'afterPlayPause', this).call(this, 'play');
                    break;

                case YT.PlayerState.PAUSED:
                    _get(PlayerYoutube.prototype.__proto__ || Object.getPrototypeOf(PlayerYoutube.prototype), 'afterPlayPause', this).call(this, 'pause');
                    break;

                case YT.PlayerState.BUFFERING:
                    break;
            }
        }
    }, {
        key: 'setCurrentTime',
        value: function setCurrentTime(newTime) {
            this.instancePlayer.seekTo(newTime);
        }
    }, {
        key: 'getCurrentTime',
        value: function getCurrentTime() {
            return this.instancePlayer.getCurrentTime();
        }
    }, {
        key: 'getDuration',
        value: function getDuration() {
            return this.instancePlayer.getDuration();
        }
    }, {
        key: 'onProgressChanged',
        value: function onProgressChanged(e) {
            this.setCurrentTime(e.target.value * this.getDuration() / 100);
        }
    }, {
        key: 'methodPlay',
        value: function methodPlay() {
            this.instancePlayer.playVideo();
        }
    }, {
        key: 'methodPause',
        value: function methodPause() {
            this.instancePlayer.pauseVideo();
        }
    }, {
        key: 'methodMute',
        value: function methodMute() {
            this.instancePlayer.mute();
        }
    }, {
        key: 'methodUnMute',
        value: function methodUnMute() {
            this.instancePlayer.unMute();
        }
    }, {
        key: 'removeInstance',
        value: function removeInstance() {
            this.instancePlayer.destroy();
        }
    }]);

    return PlayerYoutube;
}(_player2.default);

exports.default = PlayerYoutube;

/***/ })
/******/ ]);