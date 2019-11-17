import Player from './player';

class PlayerHtml5 extends Player {

    constructor({selector, options, callback}) {

        //Init Player class
        super({
            selector: selector,
            options: options,
            callback: callback
        });

        //Create Promise to check when the video is ready
        this.waitUntilVideoIsReady().then(this.onPlayerReady.bind(this));

        if(!this.skinDisabled){
            this.bindSpecificEvents();
        }

    }

    onPlayerReady() {
        super.playerIsReady();
        this.updateDuration();
    }

    waitUntilVideoIsReady() {

        return new Promise((resolve, reject) => {

            //Check if the video is ready
            if (typeof this.player.duration === "number" && isNaN(this.player.duration) === false) {

                resolve();

            } else {

                this.onDurationChange = () => {

                    this.player.removeEventListener('durationchange', this.onDurationChange);
                    this.player.removeEventListener('error', this.onError);

                    resolve();

                };

                this.onError = (error) => {

                    this.player.removeEventListener('error', this.onError);
                    this.player.removeEventListener('durationchange', this.onDurationChange);

                    reject(error);

                };

                //Listen error or durationchange events to detect when the video is ready
                this.player.addEventListener('durationchange', this.onDurationChange, false);
                this.player.addEventListener('error', this.onError, false);

            }

        });

    }

    bindSpecificEvents() {

        if (this.options.controls){

            if(this.options.time) {

                //On durationchange event, update duration if value is different
                this.player.addEventListener('durationchange', (e) => this.updateDuration(e), false);

            }

            //On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar
            this.player.addEventListener('timeupdate', (e) => this.updateCurrentTime(e), false);

        }

        //On ended event, show poster and reset timeline and time
        this.player.addEventListener('ended', (e) => this.onVideoEnded(e), false);

        this.onPlayingEvent = () => {
            this.onPlaying();
        };
        this.player.addEventListener('playing', (e) => this.onPlayingEvent(e), false);

        this.onWaitingEvent = () => {
            this.onWaiting();
        };
        this.player.addEventListener('waiting', (e) => this.onWaitingEvent(e), false);

        this.onSeekingEvent = () => {
            this.onSeeking();
        };
        this.player.addEventListener('seeking', (e) => this.onSeekingEvent(e), false);

        this.onSeekedEvent = () => {
            this.onSeeked();
        };
        this.player.addEventListener('seeked', (e) => this.onSeekedEvent(e), false);

    }

    getInstance() {
        return this.player;
    }

    getCurrentTime() {
        return this.player.currentTime;
    }

    setCurrentTime(newTime) {
        this.player.currentTime = newTime;
    }

    getDuration() {
        return this.player.duration;
    }

    onProgressChanged(e) {
        this.setCurrentTime((e.target.value * this.getDuration()) / 100);
    }

    methodPlay() {
        this.player.play();
    }

    methodPause() {
        this.player.pause();
    }

    methodMute() {
        this.player.muted = true;
    }

    methodUnMute() {
        this.player.muted = false;
    }

    onWaiting(){
        this.loading(true);
    }

    onPlaying(){
        this.loading(false);
    }

    onSeeking(){
        this.loading(true);
    }

    onSeeked(){
        this.loading(false);
    }

    unBindSpecificEvents() {

        if (this.options.time) {
            this.player.removeEventListener('durationchange', this.updateDuration);
        }
        this.player.removeEventListener('timeupdate', this.updateCurrentTime);
        this.player.removeEventListener('playing', this.onPlaying);
        this.player.removeEventListener('waiting', this.onWaiting);
        this.player.removeEventListener('seeking', this.onSeeking);
        this.player.removeEventListener('seeked', this.onSeeked);
        this.player.removeEventListener('ended', this.onVideoEnded);

    }

}

export default PlayerHtml5;