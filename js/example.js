//Youtube example
var playerYT = new vLite({
    selector: '#player-yt-1',
    callback: (player) => {
        //Ready
    }
});

//HTML5 example
var playerHtml5 = new vLite({
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