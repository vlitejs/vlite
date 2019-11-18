// import vLite from '../../build/js/vlite.js';

// Youtube example
const playerYT = new vLite.default({
	selector: '#player-yt-1',
	callback: (player) => {
		//Ready
	}
});

//HTML5 example
const playerHtml5 = new vLite.default({
	selector: '#player-html5-1',
	options: {
		"autoplay": false,
		"controls": true,
		"playPause": true,
		"timeline": true,
		"time": true,
		"volume": true,
		"fullscreen": true,
		"poster": "img/poster.jpg",
		"bigPlay": true,
		"autoHide": true,
		"nativeControlsForTouch": false,
		"playsinline": true
	},
	callback: (player) => {
		//Ready
	}
});
