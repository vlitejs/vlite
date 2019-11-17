import Player from './player';

class PlayerYoutube extends Player {

    constructor({selector, options, callback}) {

        //Init Player class
        super({
            selector: selector,
            options: options,
            callback: callback
        });

        //Init Youtube player with API
        this.initYoutubePlayer();

    }

    initYoutubePlayer() {

        this.instancePlayer = new YT.Player(this.player.getAttribute('id'), {
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

    onPlayerReady(data) {
        this.player = data.target.getIframe();
        super.playerIsReady();
    }

    getInstance() {
        return this.instancePlayer;
    }

    onPlayerStateChange(e) {

        switch (e.data) {
            case YT.PlayerState.UNSTARTED:
                if (this.options.controls && this.options.time) {
                    super.updateDuration();
                }
                break;

            case YT.PlayerState.ENDED:
                super.onVideoEnded();
                break;

            case YT.PlayerState.PLAYING:

                this.loading(false);

                if (this.options.controls) {
                    setInterval(() => {
                        super.updateCurrentTime();
                    }, 100);
                }

                super.afterPlayPause('play');
                break;

            case YT.PlayerState.PAUSED:
                super.afterPlayPause('pause');
                break;

            case YT.PlayerState.BUFFERING:
                this.loading(true);
                break;
        }

    }

    setCurrentTime(newTime) {
        this.instancePlayer.seekTo(newTime);
    }

    getCurrentTime() {
        return this.instancePlayer.getCurrentTime();
    }

    getDuration() {
        return this.instancePlayer.getDuration();
    }

    onProgressChanged(e) {
        this.setCurrentTime((e.target.value * this.getDuration()) / 100);
    }

    methodPlay() {
        this.instancePlayer.playVideo();
    }

    methodPause() {
        this.instancePlayer.pauseVideo();
    }

    methodMute() {
        this.instancePlayer.mute();
    }

    methodUnMute() {
        this.instancePlayer.unMute();
    }

    removeInstance() {
        this.instancePlayer.destroy();
    }

}

export default PlayerYoutube;