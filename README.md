# vLitejs

![vLitejs](https://img.shields.io/badge/vlitejs-v4.0.0-ff7f15.svg?style=for-the-badge) ![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/yoriiis/vlitejs/Build/main?style=for-the-badge) [![Gitter Chat](https://img.shields.io/gitter/room/yoriiis/vlitejs?color=%2345cba1&style=for-the-badge)](https://gitter.im/vlitejs/vlitejs)

`vLitejs` is a fast and lightweight JavaScript library to customize and skin video and audio player. Written in JavaScript native without dependency, it is built around an API of Providers and Plugins.

HTML5 video and audio players are includes by default. Youtube and Vimeo providers can be loaded on demand by the [Provider API](#Provider-API). Plugins can also be loaded on demand by the [Plugin API](#Plugin-API). The library is built to be extended be these API, others Providers and Plugins can be created and loaded by the library.

## Why `vLitejs`?

- If you are concerned about your app's loading performance, this library makes sense as it is extremely lightweight compared to the competition (only 7 KB Gzip).
- It is quite rare to need to be compatible with HTML5, Youtube and Vimeo. The library contains by default only HTML5 capabilities and exposed the Provider API to extend the library with other providers.
- If you need specific behaviors, the Plugin API allows to extends the library capabilities.
- If you need to create a video/audio player with a custom skin harmonized across all web browsers.

|              | vLitejs |  Plyr  | Videojs |
| ------------ | :-----: | :----: | :-----: |
| Uncompressed |  81 KB  | 310 KB | 2000 KB |
| Compressed   |  27 KB  | 120 KB | 537 KB  |
| Gzip         |  6 KB   | 30 KB  | 149 KB  |

_\*`vlitejs 4.0.0`, `plyr 3.6.4`, `videojs 7.11.4`_

---

<!-- [![Image of vLitejs](./examples/assets/screenshot.jpg)](https://yoriiis.github.io/vlitejs) -->

## Features

- **Video & audio** - HTML5 video, HTML5 audio, Youtube, Vimeo.
- **Customizable** - Choose the control elements you want to display.
- **No dependency** - Written in Javascript native without any framework.
- **Fullscreen** - Supports native fullscreen API.
- [**Provider API**](#Provider-API) - Use the available providers or create your own.
- [**Plugin API**](#Plugin-API) - Use the available plugins or create your own.
- [**Events**](#Events) - Standardized events across all web browsers and providers.
- **Subtitles** - Supports multiple subtitle tracks (VTT).
- **Picture-in-Picture** - Supports Picture-in-Picture API.
- **Playsinline** - Supports the `playsinline` attribute.
- [**Shortcuts**](#Shortcuts) - Supports keyboard shortcuts.
- **Accessibility** - W3C and A11Y valid.

---

## Installation

`vLitejs` is available on npm as [vlitejs](https://www.npmjs.com/package/vlitejs) and as [vLitejs on GitHub](https://github.com/yoriiis/vlitejs).

```bash
npm install vlitejs --save-dev
```

```bash
yarn add vlitejs  --dev
```

`vLitejs` is also available over the `jsDeliver` CDN.

<!-- prettier-ignore -->
```html
<link href="https://cdn.jsdelivr.net/npm/vlitejs@4/dist/vlite.css" rel="stylesheet" crossorigin />
<script src="https://cdn.jsdelivr.net/npm/vlitejs@4/dist/vlite.js" crossorigin></script>
```

## Demo

The project includes several examples of `vLitejs` implementation in the directory `./examples`. If you're interested in playing around with `vLitejs`, you can use the online code playground on CodePen:

- [HTML5 video]()
- [HTML5 audio]()
- [Youtube]()
- [Vimeo]()

## How it works

### HTML

#### HTML5 video

```html
<video id="player" class="vlite-js" src="/path/to/video.mp4"></video>
```

#### HTML5 audio

```html
<audio id="player" class="vlite-js" src="/path/to/audio.mp3"></audio>
```

#### Youtube video

```html
<div id="player" class="vlite-js" data-youtube-id="aqz-KE-bpKQ"></div>
```

#### Vimeo video

```html
<div id="player" class="vlite-js" data-vimeo-id="1084537"></div>
```

---

### Javascript

#### Initialize the player

Import `vLitejs` styles and the JavaScript library as an ES6 modules.

```javascript
import 'vlitejs/vlite.css';
import vlitejs from 'vlitejs';
```

The `vlitejs` constructor accepts the following parameters:

| Arguments |          Type           | Default | Description                                                      |
| --------- | :---------------------: | :-----: | ---------------------------------------------------------------- |
| selector  | `String \| HTMLElement` | `null`  | Unique CSS selector string or `HTMLElement` to target the player |
| config    |        `Object`         |  `{}`   | Player configuration                                             |

Initialize the player with a CSS selector string.

```javascript
const vlitePlayer = new vlitejs('#player');
```

Or, initialize the player with an `HTMLElement`.

```js
const vlitePlayer = new vlitejs(document.querySelector('#player'));
```

#### Configure the player

The second arguments of the contructor is an object with the following parameters:

| Arguments  |        Type        |  Default  | Description                                         |
| ---------- | :----------------: | :-------: | --------------------------------------------------- |
| `options`  |      `Object`      |   `{}`    | Player options                                      |
| `provider` |      `String`      | `'html5'` | Player provider                                     |
| `plugins`  |      `Array`       |   `[]`    | Player plugins                                      |
| `onReady`  | `Function \| null` |  `null`   | Callback function executed when the player is ready |

```javascript
const vlitePlayer = new vlitejs('#player', {
  options: {},
  onReady: (player) => {},
  provider: 'html5',
  plugins: []
});
```

### Player options

The player controls can be customized with the following parameters:

| Options       |      Type      | Default |    Media    | Description                                               |
| ------------- | :------------: | :-----: | :---------: | --------------------------------------------------------- |
| `autoplay`    |   `Boolean`    | `false` | Video-Audio | Enable the autoplay of the media                          |
| `controls`    |   `Boolean`    | `true`  |    Video    | Display the control bar of the media                      |
| `playPause`   |   `Boolean`    | `true`  | Video-Audio | Display the play/pause button on the control bar          |
| `progressBar` |   `Boolean`    | `true`  | Video-Audio | Display the progress bar on the control bar               |
| `time`        |   `Boolean`    | `true`  | Video-Audio | Display the time information on the control bar           |
| `volume`      |   `Boolean`    | `true`  | Video-Audio | Display the volume button on the control bar              |
| `fullscreen`  |   `Boolean`    | `true`  |    Video    | Display the fullscreen button on the control bar          |
| `poster`      | `String\|null` | `null`  |    Video    | Personalize the poster url of the video                   |
| `bigPlay`     |   `Boolean`    | `true`  |    Video    | Display the big play button on the poster                 |
| `playsinline` |   `Boolean`    | `false` |    Video    | Add the `playsinline` attribute to the video              |
| `loop`        |   `Boolean`    | `false` | Video-Audio | Whether to loop the current media                         |
| `muted`       |   `Boolean`    | `false` |    Video    | Whether to muted the current media                        |
| `autoHide`    |   `Boolean`    | `false` |    Video    | Auto hide the control bar in the event of inactivity (3s) |

> The `autoplay` parameter automatically activates the` muted` option because the API can only be initiated by a user gesture.

Example of customization for the `autoplay` and the `poster`.

```javascript
const vlitePlayer = new vlitejs('#player', {
  options: {
    autoplay: true,
    poster: '/path/to/poster.jpg'
  }
});
```

### Player ready

The callback function `onReady` is automatically executed when the player is ready. The HTML5 video and audio listen to the `canplay|loadedmetadata` event. The Youtube and Vimeo provider listen respectively to the `onready` event returned by the API.

The function exposes the `player` parameter as the player instance. You can use it to interact with the player instance and the [player methods](#Player-methods).

```javascript
const vlitePlayer = new vlitejs('#player', {
  onReady: (player) => {
    // TODO: example without the arrow function (context this = player)
    // The player is ready
  }
});
```

### Events

`vLitejs` exposes the following native `CustomEvent` on the player container element. Events are standardized across all providers even Youtube and Vimeo.

| Event Type        | Description                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `play`            | Sent when the playback state is no longer paused, as a result of the play method, or the autoplay attribute |
| `pause`           | Sent when the playback state is changed to paused                                                           |
| `ended`           | Sent when playback completes                                                                                |
| `progress`        | Sent periodically to inform interested parties of progress downloading the media.                           |
| `seeked`          | Sent when the current time has changed.                                                                     |
| `volumechange`    | Sent when the audio volume changes                                                                          |
| `timeupdate`      | The time indicated by the element's `currentTime` attribute has changed.                                    |
| `enterfullscreen` | Sent when the video switches into of full-screen mode                                                       |
| `exitfullscreen`  | Sent when the video switches out of full-screen mode                                                        |
| `enterpip`        | Sent when the video switches into of picture in picture mode                                                |
| `leavepip`        | Sent when the video switches out of picture in picture mode                                                 |
| `trackenabled`    | Sent when a track is enabled and displayed                                                                  |
| `trackdisabled`   | Sent when a track is disabled and hidden                                                                    |

Example of a listener when the video trigger a play.

```javascript
const vlitePlayer = new vlitejs('#player');

player.container.addEventListener('play', () => {
  // The video starts playing
});
```

### Player methods

The player instance exposed the following methods:

| Method                | Parameters |  Promise  | Description                       |
| --------------------- | :--------: | :-------: | --------------------------------- |
| `play()`              |     -      |     -     | Start the playback                |
| `pause()`             |     -      |     -     | Pause the playback                |
| `setVolume()`         |  `Number`  |     -     | Set the volume between 0 and 1    |
| `getVolume()`         |     -      | `Promise` | Get the volume                    |
| `getCurrentTime()`    |     -      | `Promise` | Get the current time              |
| `getDuration()`       |     -      | `Promise` | Get the duration                  |
| `mute()`              |     -      |     -     | Mute the volume                   |
| `unMmute()`           |     -      |     -     | Unmute the volume                 |
| `seekTo(newTime)`     |  `Number`  |     -     | Seek to a current time in seconds |
| `requestFullscreen()` |     -      |     -     | Request the fullscreen            |
| `exitFullscreen()`    |     -      |     -     | Exit the fullscreen               |
| `getInstance()`       |     -      |     -     | Get the player instance           |
| `destroy()`           |     -      |     -     | Destroy the player                |

Example of a video muted when the player is ready.

```javascript
const vlitePlayer = new vlitejs('#player', {
  onReady: (player) => {
    player.mute();
  }
});
```

Example of a video muted when the button `.btn-mute` is pressed.

```html
<video id="player" class="vlite-js" src="/path/to/video.mp4"></video>
<button class="btn-mute">Mute</button>
```

```js
const vlitePlayer = new vlitejs('#player');

document.querySelector('.btn-mute').addEventListener('click', () => {
  vlitePlayer.playerInstance.mute();
});
```

## Shortcuts

The player accepts the following keyboard shortcuts when in focus.

|        Key        | Action                |
| :---------------: | --------------------- |
| <kbd>space</kbd>  | Toggle playback       |
| <kbd>&larr;</kbd> | Seek backward (-10s)  |
| <kbd>&rarr;</kbd> | Seek forward (+10s)   |
| <kbd>&uarr;</kbd> | Increase volume (+5%) |
| <kbd>&darr;</kbd> | Decrease volume (-5%) |

## Browser support

`vLitejs` supports the latest 2 versions of most modern browsers with the [.browserslist](https://github.com/yoriiis/vlitejs/blob/main/.browserslist) config.

| Browser    | Supported |
| ---------- | :-------: |
| Chrome     |  &#9989;  |
| Firefox    |  &#9989;  |
| Opera      |  &#9989;  |
| Edge       |  &#9989;  |
| Safari     |  &#9989;  |
| iOS Safari |  &#9989;  |

## Contributors

Many thanks to [Victor Schirm](https://www.behance.net/victorshm) for the `vLitejs` logo.

## Licence

`vLitejs` is licensed under the [MIT License](https://opensource.org/licenses/MIT). Created with &#9825; by [@yoriiis](http://github.com/yoriiis).
