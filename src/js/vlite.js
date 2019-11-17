/**
* @license MIT
* @name vLitejs
* @version 2.0.1
* @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
* @description: vLite.js is a fast and lightweight Javascript library to customize and skin native HTML5 video and Youtube video in Javascript native with a default skin
* {@link https://vlite.bitbucket.io}
* @copyright 2019 Joris DANIEL <https://vlite.bitbucket.io>
**/

'use strict';

import style from '../css/vlite.css';
import PlayerYoutube from './player-youtube';
import PlayerHtml5 from './player-html5';

const _VliteYoutube = {
    apiLoading: false,
    apiReady: false,
    apiReadyQueue: []
};

class vLite {

    constructor({
        selector,
        options = undefined,
        callback
    }) {

        this.player = null;
        if (typeof selector === 'string') {
            this.player = document.querySelector(selector);
        } else if (typeof selector === 'object') {
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

    initPlayer() {

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
                this.instancePlayer = new PlayerYoutube({
                    selector: this.player,
                    options: this.options,
                    callback: this.callback
                });
            }

        } else {
            this.instancePlayer = new PlayerHtml5({
                selector: this.player,
                options: this.options,
                callback: this.callback
            });
        }

    }

    loadYoutubeAPI() {

        let script = document.createElement('script');

        script.async = true;
        script.type = 'text/javascript';
        script.src = 'https://youtube.com/iframe_api';

        window.onYouTubeIframeAPIReady = () => {

            _VliteYoutube.apiReady = true;

            _VliteYoutube.apiReadyQueue.forEach(element => {
                this.instancePlayer = new PlayerYoutube({
                    selector: element.player,
                    options: element.options,
                    callback: element.callback
                });
            });
            _VliteYoutube.apiReadyQueue = [];

        };

        document.getElementsByTagName('body')[0].appendChild(script);

    }

    destroy() {
        this.instancePlayer.destroy();
    }

}

export default vLite;

//Fix Babel 6 which has removes the line "module.exports = exports['default'];"
// module.exports = vLite;