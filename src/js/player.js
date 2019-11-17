import svgBigPlay from "../svg/big-play.svg";
import svgPlay from "../svg/play.svg";
import svgPause from "../svg/pause.svg";
import svgVolumeHigh from "../svg/volume-high.svg";
import svgVolumeMute from "../svg/volume-mute.svg";
import svgFullscreen from "../svg/fullscreen.svg";
import svgFullscreenExit from "../svg/fullscreen-exit.svg";

class Player {
	constructor({ selector, options, callback }) {
		this.callback = callback;
		this.isFullScreen = false;
		this.isPaused = null;
		this.player = selector;
		this.touchSupport = "ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
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

		//Check if options have gone through DOM with data attribute
		if (this.player.hasAttribute("data-options")) {
			//Check if there is a conflict with the constructor options
			if (options !== undefined) {
				console.warn(`[vLite] - Option passed in "${selector}" by data attribute is priority over object in constructor.`);
			}

			customOptions = JSON.parse(this.player.getAttribute("data-options"));
		} else {
			//No conflict, we can use options in the constructor
			customOptions = options;
		}

		this.options = this.constructor.extend(
			true,
			DEFAULT_OPTIONS,
			customOptions
		);

		if (this.options.nativeControlsForTouch) {
			this.skinDisabled = true;
			this.player.setAttribute("controls", "controls");
			this.options.controls = false;
		}

		if (this.options.playsinline) {
			this.player.setAttribute("playsinline", true);
			this.player.setAttribute("webkit-playsinline", true);
		}

		//Check fullscreen support API on different browsers and cached prefixs
		this.supportFullScreen = this.constructor.checkSupportFullScreen();

		this.buildPlayer();
		this.bindEvents();
	}

	buildPlayer() {
		//Wrap player
		let wrapper = document.createElement("div");
		wrapper.setAttribute("class", "vl-wrapper-vlite vl-first-start vl-paused vl-loading");
		wrapper.setAttribute("tabindex", 0);
		this.player.parentNode.insertBefore(wrapper, this.player);
		wrapper.appendChild(this.player);
		this.wrapperPlayer = this.player.parentNode;
		this.player.classList.add("vl-toggle-play-pause-js");

		if (this.skinDisabled) {
			this.wrapperPlayer.classList.add("vl-force-controls");
		}

		let cssstylePoster = this.options.poster !== null ? `background-image: url(${this.options.poster});` : "";

		let htmlControls = `${
      !this.options.nativeControlsForTouch
        ? `<div class="vl-overlay-video vl-toggle-play-pause-js">
                                    ${
                                      !this.touchSupport
                                        ? `<div class="vl-overlay-left vl-fast-forward-js" data-direction="left"></div>
                                        <div class="vl-overlay-right vl-fast-forward-js" data-direction="right"></div>`
                                        : ``
                                    }
                                </div>`
        : ``
    }
                            <div class="vl-wrapper-loader">
                                <div class="vl-loader">
                                    <div class="vl-loader-bounce-1"></div>
                                    <div class="vl-loader-bounce-2"></div>
                                    <div class="vl-loader-bounce-3"></div>
                                </div>
                            </div>
                            <div class="vl-poster vl-toggle-play-pause-js vl-active" style="${cssstylePoster}"></div>
                            ${
                              this.options.bigPlay
                                ? `<div class="vl-big-play-button vl-toggle-play-pause-js">
                                     <span class="vl-player-icon vl-icon-big-play">${svgBigPlay}</span>
                                </div>`
                                : ``
                            }
                            ${
                              this.options.controls
                                ? `<div class="vl-control-bar">
                                    ${
                                      this.options.timeline
                                        ? `<div class="vl-progress-bar">
                                            <div class="vl-progress-seek"></div>
                                            <input type="range" class="vl-progress-input" min="0" max="100" step="0.01" value="0" orient="horizontal" />
                                        </div>`
                                        : ``
                                    }
                                    <div class="vl-control-bar-inner">
                                        ${
                                          this.options.playPause
                                            ? `<div class="vl-play-pause-button vl-toggle-play-pause-js">
                                                <span class="vl-player-icon vl-icon-play">${svgPlay}</span>
                                                <span class="vl-player-icon vl-icon-pause">${svgPause}</span>
                                            </div>`
                                            : ``
                                        }
                                        ${
                                          this.options.time
                                            ? `<div class="vl-time">
                                                <span class="vl-current-time">00:00</span>&nbsp;/&nbsp;<span class="vl-duration"></span>
                                            </div>`
                                            : ``
                                        }
                                        ${
                                          this.options.volume
                                            ? `<div class="vl-volume">
                                                <span class="vl-player-icon vl-icon-volume-high">${svgVolumeHigh}</span>
                                                <span class="vl-player-icon vl-icon-volume-mute">${svgVolumeMute}</span>
                                            </div>`
                                            : ``
                                        }
                                        ${
                                          this.options.fullscreen
                                            ? `<div class="vl-fullscreen">
                                                <span class="vl-player-icon vl-icon-fullscreen">${svgFullscreen}</span>
                                                <span class="vl-player-icon vl-icon-shrink">${svgFullscreenExit}</span>
                                            </div>`
                                            : ``
                                        }
                                    </div>
                                </div>`
                                : ``
                            }`;

		wrapper.insertAdjacentHTML("beforeend", htmlControls);
	}

	bindEvents() {
		if (this.options.controls && this.options.timeline) {
			//Create progress bar event listener
			this.onChangeProgressBar = e => {
				this.onProgressChanged(e);
			};
			this.wrapperPlayer
				.querySelector(".vl-progress-input")
				.addEventListener("change", this.onChangeProgressBar, false);
		}

		//Create play/pause button event listener
		this.onClickTogglePlayPause = e => {
			e.preventDefault();
			this.togglePlayPause();
		};
		[].forEach.call(
			this.wrapperPlayer.querySelectorAll(".vl-toggle-play-pause-js"),
			button => {
				button.addEventListener("click", this.onClickTogglePlayPause, false);
			}
		);

		//Create double click to fast-forward video current time (only on desktop, mobile doesn't support event)
		if (!this.touchSupport) {
			this.onDblclickFastForward = e => {
				e.preventDefault();
				this.fastForward(e);
			};
			[].forEach.call(
				this.wrapperPlayer.querySelectorAll(".vl-fast-forward-js"),
				button => {
					button.addEventListener(
						"dblclick",
						this.onDblclickFastForward,
						false
					);
				}
			);
		}

		if (this.options.controls && this.options.volume) {
			//Create volume button event listener
			this.onCLickToggleVolume = e => {
				e.preventDefault();
				this.toggleVolume();
			};
			this.wrapperPlayer
				.querySelector(".vl-volume")
				.addEventListener("click", this.onCLickToggleVolume, false);
		}

		if (this.options.controls && this.options.fullscreen) {
			//Create fullscreen button event listener
			this.onClickToggleFullscreen = e => {
				e.preventDefault();
				this.toggleFullscreen();
			};
			this.wrapperPlayer
				.querySelector(".vl-fullscreen")
				.addEventListener("click", this.onClickToggleFullscreen, false);

			//Create double click event to trigger fullscreen change
			this.onDblclickVideo = e => {
				e.preventDefault();
				//Prevent double click to fast-forward video current time
				if (e.target.classList.contains("vl-fast-forward-js")) return;
				this.toggleFullscreen();
			};
			this.wrapperPlayer
				.querySelector(".vl-overlay-video")
				.addEventListener("dblclick", this.onDblclickVideo, false);
		}

		if (this.options.controls) {
			this.onKeyupEvent = e => {
				this.onKeyup(e);
			};
			this.wrapperPlayer.addEventListener("keyup", this.onKeyupEvent, false);

			this.onMousemoveEvent = e => {
				this.onMousemove(e);
			};
			this.wrapperPlayer.addEventListener(
				"mousemove",
				this.onMousemoveEvent,
				false
			);
		}

		//Create fullscreen button event listener
		//Detect fullscreen change, particulary util for esc key because state is not updated
		//More information on MDN : https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
		this.onChangeFullScreen = e => {
			if (!document[this.supportFullScreen.isFullScreen] && this.isFullScreen) {
				this.exitFullscreen(e.target);
			}
		};
		window.addEventListener(
			this.supportFullScreen.changeEvent,
			this.onChangeFullScreen,
			false
		);
	}

	playerIsReady() {
		this.loading(false);

		if (typeof this.callback === "function") {
			this.callback(this);
		}

		//If player has autoplay option, play now
		if (this.options.autoplay) {
			this.togglePlayPause();
		}
	}

	loading(state) {
		if (state) {
			this.wrapperPlayer.classList.add("vl-loading");
		} else {
			this.wrapperPlayer.classList.remove("vl-loading");
		}
	}

	updateDuration() {
		this.wrapperPlayer.querySelector(
			".vl-duration"
		).innerHTML = this.constructor.formatVideoTime(this.getDuration());
	}

	onVideoEnded() {
		this.wrapperPlayer.classList.replace("vl-playing", "vl-paused");
		this.wrapperPlayer.classList.add("vl-first-start");
		this.wrapperPlayer.querySelector(".vl-poster").classList.add("vl-active");

		if (this.options.constrols) {
			this.wrapperPlayer.querySelector(".vl-progress-seek").style.width = "0%";
			this.wrapperPlayer
				.querySelector(".vl-progress-input")
				.setAttribute("value", 0);
			this.wrapperPlayer.querySelector(".vl-current-time").innerHTML = "00:00";
		}
	}

	togglePlayPause() {
		if (this.wrapperPlayer.classList.contains("vl-paused")) {
			this.play();
		} else {
			this.pause();
		}
	}

	fastForward(e) {
		if (e.target.getAttribute("data-direction") === "left") {
			this.seekTo(this.getCurrentTime() - 10);
		} else {
			this.seekTo(this.getCurrentTime() + 10);
		}
	}

	play() {
		if (this.wrapperPlayer.classList.contains("vl-first-start")) {
			this.wrapperPlayer.classList.remove("vl-first-start");
			this.wrapperPlayer
				.querySelector(".vl-poster")
				.classList.remove("vl-active");
		}

		this.methodPlay();
		this.isPaused = false;
		this.afterPlayPause();
	}

	pause() {
		this.methodPause();
		this.isPaused = true;
		this.afterPlayPause();
	}

	afterPlayPause() {
		if (this.isPaused) {
			this.wrapperPlayer.classList.replace("vl-playing", "vl-paused");
		} else {
			this.wrapperPlayer.classList.replace("vl-paused", "vl-playing");
		}

		if (this.options.autoHide && this.options.controls) {
			if (this.isPaused) {
				this.wrapperPlayer
					.querySelector(".vl-control-bar")
					.classList.remove("hidden");
			} else {
				this.timerAutoHide = setTimeout(() => {
					this.wrapperPlayer
						.querySelector(".vl-control-bar")
						.classList.add("hidden");
				}, this.delayAutoHide);
			}
		}
	}

	//Toggle volume on the video
	toggleVolume() {
		let volumeButton = this.wrapperPlayer.querySelector(".vl-volume");

		if (volumeButton.classList.contains("vl-muted")) {
			this.unMute();
		} else {
			this.mute();
		}
	}

	mute() {
		this.methodMute();
		this.wrapperPlayer.querySelector(".vl-volume").classList.add("vl-muted");
	}

	unMute() {
		this.methodUnMute();
		this.wrapperPlayer.querySelector(".vl-volume").classList.remove("vl-muted");
	}

	seekTo(newTime) {
		this.setCurrentTime(newTime);
	}

	toggleFullscreen() {
		if (this.isFullScreen) {
			this.exitFullscreen();
		} else {
			this.requestFullscreen();
		}
	}

	//Check fullscreen support API on different browsers and cached prefixs
	static checkSupportFullScreen() {
		let prefixs = ["", "moz", "webkit", "ms", "o"],
			lengthPrefixs = prefixs.length,
			fullscreen,
			requestFn,
			cancelFn,
			changeEvent,
			isFullScreen;

		if (document.cancelFullscreen !== undefined) {
			requestFn = "requestFullscreen";
			cancelFn = "exitFullscreen";
			changeEvent = "fullscreenchange";
		} else {
			while (lengthPrefixs--) {
				if (
					(prefixs[lengthPrefixs] !== "moz" || document.mozFullScreenEnabled) &&
          document[prefixs[lengthPrefixs] + "CancelFullScreen"] !== undefined
				) {
					requestFn = prefixs[lengthPrefixs] + "RequestFullScreen";
					cancelFn = prefixs[lengthPrefixs] + "CancelFullScreen";
					changeEvent = prefixs[lengthPrefixs] + "fullscreenchange";
					isFullScreen =
            prefixs[lengthPrefixs] === "webkit"
            	? prefixs[lengthPrefixs] + "IsFullScreen"
            	: prefixs[lengthPrefixs] + "FullScreen";
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

	//Request fullscreen after user action
	requestFullscreen() {
		let { requestFn } = this.supportFullScreen;

		if (this.player[requestFn]) {
			//Request fullscreen on parentNode player, to display custom controls
			this.player.parentNode[requestFn]();
			this.isFullScreen = true;
			this.wrapperPlayer.classList.add("vl-fullscreen-display");
			this.wrapperPlayer
				.querySelector(".vl-fullscreen")
				.classList.add("vl-exit");
		}
	}

	//Exit fullscreen after user action
	exitFullscreen() {
		let { cancelFn } = this.supportFullScreen;

		if (document[cancelFn]) {
			document[cancelFn]();

			this.wrapperPlayer.classList.remove("vl-fullscreen-display");
			this.wrapperPlayer
				.querySelector(".vl-fullscreen")
				.classList.remove("vl-exit");

			this.isFullScreen = false;
		}
	}

	onKeyup(e) {
		//Toggle play pause the video on spacebar press
		if (e.keyCode === 32) {
			this.togglePlayPause();
		}
	}

	onMousemove(e) {
		if (
			this.isPaused === false &&
      this.options.autoHide &&
      this.options.controls
		) {
			this.wrapperPlayer
				.querySelector(".vl-control-bar")
				.classList.remove("hidden");
			clearTimeout(this.timerAutoHide);

			this.timerAutoHide = setTimeout(() => {
				this.wrapperPlayer
					.querySelector(".vl-control-bar")
					.classList.add("hidden");
			}, this.delayAutoHide);
		}
	}

	//Update current time displaying in the control bar and the width of the progress bar
	updateCurrentTime() {
		let currentTime = Math.round(this.getCurrentTime()),
			duration = this.getDuration(),
			width = (currentTime * 100) / duration,
			timeElement = this.wrapperPlayer.querySelector(".vl-current-time");

		this.wrapperPlayer.querySelector(".vl-progress-seek").style.width =
      width + "%";

		if (timeElement !== null) {
			timeElement.innerHTML = this.constructor.formatVideoTime(currentTime);
		}
	}

	unBindEvents() {
		[].forEach.call(
			this.wrapperPlayer.querySelectorAll(".vl-toggle-play-pause-js"),
			button => {
				button.removeEventListener("click", this.onClickTogglePlayPause);
			}
		);
		this.onClickTogglePlayPause = null;

		if (!this.touchSupport) {
			[].forEach.call(
				this.wrapperPlayer.querySelectorAll(".vl-fast-forward-js"),
				button => {
					button.removeEventListener("dblclick", this.onDblclickFastForward);
				}
			);
			this.onDblclickFastForward = null;
		}

		if (this.options.controls && this.options.timeline) {
			this.wrapperPlayer
				.querySelector(".vl-progress-input")
				.removeEventListener("change", this.onChangeProgressBar, false);
			this.onChangeProgressBar = null;
		}

		if (this.options.controls && this.options.volume) {
			this.wrapperPlayer
				.querySelector(".vl-volume")
				.removeEventListener("click", this.onCLickToggleVolume);
			this.onCLickToggleVolume = null;
		}

		if (this.options.controls) {
			this.wrapperPlayer.removeEventListener("keyup", this.onKeyupEvent);
			this.wrapperPlayer.removeEventListener(
				"mousemove",
				this.onMousemoveEvent
			);
			this.onKeyupEvent = null;
			this.onMousemoveEvent = null;
		}

		if (this.options.controls && this.options.fullscreen) {
			this.wrapperPlayer
				.querySelector(".vl-fullscreen")
				.removeEventListener("click", this.onClickToggleFullscreen);
			this.wrapperPlayer
				.querySelector(".vl-overlay-video")
				.removeEventListener("dblclick", this.onDblclickVideo);
			this.onClickToggleFullscreen = null;
			this.onDblclickVideo = null;
		}

		window.removeEventListener(
			this.supportFullScreen.changeEvent,
			this.onChangeFullScreen
		);
	}

	destroy() {
		this.pause();
		this.unBindEvents();

		if (typeof this.unBindSpecificEvents === "function") {
			this.unBindSpecificEvents();
		}

		if (typeof this.removeInstance === "function") {
			this.removeInstance();
		}

		this.wrapperPlayer.remove();
	}

	//Convert video time second to 00:00 display
	static formatVideoTime(time) {
		let ms = time * 1000,
			min = (ms / 1000 / 60) << 0,
			sec = (ms / 1000) % 60 << 0,
			timeInString = "";

		timeInString += min < 10 ? "0" : "";
		timeInString += min + ":";
		timeInString += sec < 10 ? "0" : "";
		timeInString += sec;

		return timeInString;
	}

	// https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
	// Pass in the objects to merge as arguments.
	// For a deep extend, set the first argument to `true`.
	static extend() {
		let extended = {};
		let deep = false;
		let i = 0;
		let { length } = arguments;

		// Check if a deep merge
		if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		let merge = obj => {
			for (let prop in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, prop)) {
					// If deep merge and property is an object, merge properties
					if (
						deep &&
            Object.prototype.toString.call(obj[prop]) === "[object Object]"
					) {
						extended[prop] = this.constructor.extend(
							true,
							extended[prop],
							obj[prop]
						);
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for (; i < length; i++) {
			let obj = arguments[i];
			merge(obj);
		}

		return extended;
	}
}

export default Player;
