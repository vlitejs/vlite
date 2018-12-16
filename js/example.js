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
        "time": true,
        "timeline": true,
        "volume": true,
        "fullscreen": true,
        "poster": "img/poster.jpg",
        "bigPlay": true,
        "autoHide": false,
        "nativeControlsForTouch": false
    },
    callback: (player) => {
        //Ready
    }
});