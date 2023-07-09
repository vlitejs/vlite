# vLitejs

[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/vlitejs/vlite/build.yml?branch=main&style=for-the-badge)](https://github.com/vlitejs/vlite/actions/workflows/build.yml) [![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/vlitejs?color=%23ff5627&style=for-the-badge)](https://www.jsdelivr.com/package/npm/vlitejs)

<p align="center">
    <img src="https://yoriiis.github.io/cdn/static/vlitejs/logo.svg" alt="vLitejs logo" width="250" />
</p>

`vlitejs` (pronounced <code>/vi&#x2D0;la&#x26A;t/</code>) is a fast and lightweight JavaScript library for customizing video and audio player. Written in native JavaScript without dependency, it is built around an API of providers and plugins to extend these capabilities and keep the core with the minimal functionalities.

HTML5 video and audio players are automatically included. Other providers like Youtube or Vimeo can be loaded on demand with the [Provider API](./src/providers/README.md). Plugins uses the same logic and can be loaded on demand by the [Plugin API](/src/plugins/README.md). Others providers and plugins can be created and loaded by the library.

## Why vLitejs?

- If you are concerned about your app's loading performance, this library makes sense as it is extremely lightweight compared to the competition (only 6 KB).
- It is quite rare to need to be compatible with HTML5, Youtube, Vimeo and Dailymotion at the same time. The library contains by default only HTML5 capabilities and exposed the Provider API to extend capabilities with other providers.
- If you need specific behaviors, the plugin API allows to extends the library capabilities.
- If you need to create a video or audio player with a custom skin harmonized for all web browsers.

Sizes of the `vlitejs` bundle compared to the competition:

|              | [`vlitejs`](https://bundlephobia.com/package/vlitejs@5.0.1) | [`plyr`](https://bundlephobia.com/package/plyr@3.7.8) | [`video.js`](https://bundlephobia.com/package/video.js@8.3.0) |
| ------------ | :---------------------------------------------------------: | :---------------------------------------------------: | :-----------------------------------------------------------: |
| Uncompressed |                            68 KB                            |                        299 KB                         |                            2100 KB                            |
| Compressed   |                            27 KB                            |                        110 KB                         |                            560 KB                             |
| Gzip         |                            6 KB                             |                         32 KB                         |                            159 KB                             |

> **Note** _`vlitejs 5.0.1`, `plyr 3.7.8`, `videojs 8.3.0`_

---

## Features

- **Video & audio** - [HTML5 video](./src/providers/html5/README.md), [HTML5 audio](./src/providers/html5/README.md), [Youtube](./src/providers/youtube/README.md), [Vimeo](./src/providers/vimeo/README.md), [Dailymotion](./src/providers/dailymotion/README.md).
- **Customization** - Choose the control elements you want to display.
- **No dependency** - Written in native Javascript without any framework.
- **Fullscreen** - Supports native fullscreen API.
- [**Provider API**](./src/providers/README.md) - Use the available providers or create your own.
- [**Plugin API**](./src/plugins/README.md) - Use the available plugins or create your own.
- [**Streaming**](https://glitch.com/edit/#!/vlitejs-html5-video-hls?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false) - Support HLS.js streaming playback.
- [**Sticky**](./src/plugins/sticky/README.md) - Support for sticky.
- [**Events**](#events) - Standardized events for all web browsers, providers and plugins.
- **Autoload API** - Youtube, Vimeo and Dailymotion API are automatically loaded by their provider.
- [**Subtitles**](./src/plugins/subtitle/README.md) - Supports multiple subtitle tracks (VTT).
- [**Picture-in-Picture**](./src/plugins/pip/README.md) - Supports Picture-in-Picture API.
- [**Cast**](./src/plugins/cast/README.md) - Supports for Google Cast API.
- [**AirPlay**](./src/plugins/airplay/README.md) - Supports for Apple AirPlay API.
- [**Monetization**](./src/plugins/ima/README.md) - Supports for Google IMA SDK.
- **Playsinline** - Supports the `playsinline` attribute.
- **SVG icons** - SVG are inlined into the library, no sprites to includes.
- [**Shortcuts**](#shortcuts) - Supports keyboard shortcuts.
- **Accessibility** - W3C and A11Y valid.

[![Image of vLitejs](https://yoriiis.github.io/cdn/static/vlitejs/demo-screenshot.jpg)](https://vlite.js.org)

:sparkles: You can support this project with [GitHub Sponsors](https://github.com/sponsors/vlitejs)! &#9825;

### Playground

If you're interested in playing around with vLitejs, you can use the online code playgrounds on [Glitch](https://glitch.com/@yoriiis/vlitejs):

- [HTML5 video](https://glitch.com/edit/#!/vlitejs-html5-video?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false)
- [HTML5 video HLS.js](https://glitch.com/edit/#!/vlitejs-html5-video-hls?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false)
- [HTML5 video with Google Ima SDK](https://glitch.com/edit/#!/vlitejs-html5-video-ima?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false)
- [HTML5 audio](https://glitch.com/edit/#!/vlitejs-html5-audio?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false)
- [Youtube](https://glitch.com/edit/#!/vlitejs-youtube-video?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false)
- [Vimeo](https://glitch.com/edit/#!/vlitejs-vimeo-video?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false)
- [Dailymotion](https://glitch.com/edit/#!/vlitejs-dailymotion-video?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false)

### Examples

The project includes several examples of `vlitejs` implementation in the directory `examples`. Run the following commands to build the assets for the examples:

```bash
npm run build && npm run build:example
```

## Installation

### NPM

NPM is the recommended installation method. Install `vlitejs` in your project with the following command:

```bash
npm install vlitejs --save-dev
```

```bash
yarn add vlitejs --dev
```

> **Warning** vlitejs@6 is ESM and uses the [Node.js package `exports`](https://nodejs.org/api/packages.html#exports).
>
> **Note** Minimum supported `Node.js` version is `16.20.0`.

### CDN

You can also download it and include it with a script tag. The library will be registered as the global variable `window.Vlitejs`.

```html
<link href="https://cdn.jsdelivr.net/npm/vlitejs@5/dist/vlite.css" rel="stylesheet" crossorigin />
<script src="https://cdn.jsdelivr.net/npm/vlitejs@5" crossorigin></script>
```

> **Note** You can browse the source of the NPM package at [jsdelivr.com/package/npm/vlitejs](https://www.jsdelivr.com/package/npm/vlitejs).

## How it works

### HTML

#### HTML5 video

```html
<video id="player" src="<path_to_video_mp4>"></video>
```

#### HTML5 audio

```html
<audio id="player" src="<path_to_audio_mp3>"></audio>
```

#### Youtube

```html
<div id="player" data-youtube-id="<video_id>"></div>
```

#### Vimeo

```html
<div id="player" data-vimeo-id="<video_id>"></div>
```

#### Dailymotion

```html
<div id="player" data-dailymotion-id="<video_id>"></div>
```

### Initialization

Import `vlitejs` styleheet and the JavaScript library as an ES6 modules.

```javascript
import 'vlitejs/vlite.css';
import Vlitejs from 'vlitejs';
```

The `vlitejs` constructor accepts the following parameters:

| Arguments |         Type          | Default | Description                                                      |
| --------- | :-------------------: | :-----: | ---------------------------------------------------------------- |
| selector  | `String\|HTMLElement` | `null`  | Unique CSS selector string or `HTMLElement` to target the player |
| config    |       `Object`        |  `{}`   | [Player configuration](#configuration) (optional)                |

Initialize the player with a CSS selector string.

```javascript
new Vlitejs('#player');
```

Or, initialize the player with an `HTMLElement`.

```js
new Vlitejs(document.querySelector('#player'));
```

---

## Configuration

The second arguments of the contructor is an optional object with the following parameters:

| Arguments  |       Type       |  Default  | Description                                                          |
| ---------- | :--------------: | :-------: | -------------------------------------------------------------------- |
| `options`  |     `Object`     |   `{}`    | [Player options](#options)                                           |
| `onReady`  | `Function\|null` |  `null`   | Callback function executed when the [player is ready](#player-ready) |
| `provider` |     `String`     | `'html5'` | [Player provider](./src/providers/README.md)                         |
| `plugins`  |     `Array`      |   `[]`    | [Player plugins](./src/plugins/README.md)                            |

```javascript
new Vlitejs('#player', {
  options: {},
  onReady: function (player) {},
  provider: 'html5',
  plugins: []
});
```

### Options

The player controls can be customized with the following parameters:

| Options                 |      Type      | Default | Description                                          |
| ----------------------- | :------------: | :-----: | ---------------------------------------------------- |
| `controls`&sup1; &sup2; |   `Boolean`    | `true`  | Display the control bar of the video                 |
| `autoplay`              |   `Boolean`    | `false` | Enable the autoplay of the media                     |
| `playPause`             |   `Boolean`    | `true`  | Display the play/pause button on the control bar     |
| `progressBar`           |   `Boolean`    | `true`  | Display the progress bar on the control bar          |
| `time`                  |   `Boolean`    | `true`  | Display the time information on the control bar      |
| `volume`                |   `Boolean`    | `true`  | Display the volume button on the control bar         |
| `fullscreen`&sup1; ⁴    |   `Boolean`    | `true`  | Display the fullscreen button on the control bar     |
| `poster`&sup1;          | `String\|null` | `null`  | Customize the video poster url                       |
| `bigPlay`&sup1;         |   `Boolean`    | `true`  | Display the big play button on the poster video      |
| `playsinline`&sup1;     |   `Boolean`    | `true`  | Add the `playsinline` attribute to the video         |
| `loop`                  |   `Boolean`    | `false` | Whether to loop the current media                    |
| `muted`&sup1;           |   `Boolean`    | `false` | Whether to mute the current media                    |
| `autoHide`&sup1;        |   `Boolean`    | `false` | Auto hide the control bar in the event of inactivity |
| `autoHideDelay`&sup1;   |   `Integer`    | `3000`  | Auto hide delay in millisecond                       |
| `providerParams`&sup3;  |    `Object`    |  `{}`   | Overrides the player parameters of the provider      |

> **Note**
>
> - _&sup1; Video only._
> - _&sup2; Vimeo provider requires a Plus or Pro account to use this feature (see [Vimeo plans](https://vimeo.zendesk.com/hc/en-us/articles/228068968-Compare-Vimeo-plans))._
> - _&sup3; See [Youtube embed options](https://developers.google.com/youtube/player_parameters#Parameters) and [Vimeo embed options](https://github.com/vimeo/player.js/#embed-options)._
> - _⁴ Fullscreen API not yet supported on iPhone._
>
> The `autoplay` parameter automatically activates the `muted` option because the API can only be initiated by a user gesture (see [Autoplay policy changes](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)).

Example of customization for the `autoHide` and the `poster` options.

```javascript
new Vlitejs('#player', {
  options: {
    autoHide: true,
    poster: '/path/to/poster.jpg'
  }
});
```

### Player ready

The callback function `onReady` is automatically executed when the player is ready. The HTML5 video and audio listen to the `canplay|loadedmetadata` event. The Youtube, Vimeo and Dailymotion provider listen to the `onready` event returned by their API.

The function exposes the `player` parameter as the player instance. You can use it to interact with the player instance and the [player methods](#methods).

Example of a player `muted` when ready:

```javascript
new Vlitejs('#player', {
  onReady: function (player) {
    player.mute();
  }
});
```

> **Note** The `onReady` function can also be written with an arrow function.

### Events

`vlitejs` exposes the following native `Event` on the `.v-vlite` element. Events are standardized for all providers. Each plugin has its own events which are detailed in their dedicated documentation.

| Event Type              | Description                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------- |
| `play`                  | Sent when the playback state is no longer paused, after the play method or the autoplay |
| `pause`                 | Sent when the playback state is changed to paused                                       |
| `progress`              | Sent periodically to inform interested parties of progress downloading the media.       |
| `timeupdate`            | Sent when the `currentTime` of the media has changed                                    |
| `volumechange`          | Sent when audio volume changes                                                          |
| `enterfullscreen`&sup1; | Sent when the video switches to fullscreen mode                                         |
| `exitfullscreen`&sup1;  | Sent when the video exits fullscreen mode                                               |
| `ended`                 | Sent when playback completes                                                            |

> **Note** > _&sup1; Video only._

Example of a listener when the media triggers a `play` event.

```javascript
new Vlitejs('#player', {
  onReady: (player) => {
    player.on('play', () => {
      // The video starts playing
    });
  }
});
```

Events can also be declared outside of the `onReady` function.

```javascript
const vlite = new Vlitejs('#player');

vlite.player.on('play', () => {
  // The video starts playing
});
```

### Methods

The player instance exposes the following methods, accessible when the player is ready.

| Method                 |     Parameters     |  Promise  | Description                       |
| ---------------------- | :----------------: | :-------: | --------------------------------- |
| `play()`               |         -          |     -     | Start the playback                |
| `pause()`              |         -          |     -     | Pause the playback                |
| `setVolume(volume)`    |      `Number`      |     -     | Set the volume between 0 and 1    |
| `getVolume()`          |         -          | `Promise` | Get the volume                    |
| `getCurrentTime()`     |         -          | `Promise` | Get the current time              |
| `getDuration()`        |         -          | `Promise` | Get the duration                  |
| `mute()`               |         -          |     -     | Mute the volume                   |
| `unMute()`             |         -          |     -     | Unmute the volume                 |
| `seekTo(time)`         |      `Number`      |     -     | Seek to a current time in seconds |
| `requestFullscreen()`  |         -          |     -     | Request the fullscreen            |
| `exitFullscreen()`     |         -          |     -     | Exit the fullscreen               |
| `getInstance()`        |         -          |     -     | Get the player instance           |
| `loading()`            |     `Boolean`      |     -     | Set the loading status            |
| `on(event, function)`  | `String, Function` |     -     | Add an event listener             |
| `off(event, function)` | `String, Function` |     -     | Remove an event listener          |
| `destroy()`            |         -          |     -     | Destroy the player                |

Example of media `duration` recovery.

```javascript
new Vlitejs('#player', {
  onReady: (player) => {
    player.getDuration().then((duration) => {
      // The duration is available in the "duration" parameter
    });
  }
});
```

### Custom CSS properties

The player exposes some custom CSS properties, locally scopped under the `.v-vlite` selector. You can use them to customize the design.

| Name                                  | Value                                             | Description                    |
| ------------------------------------- | ------------------------------------------------- | ------------------------------ |
| `--vlite-colorPrimary`                | `#ff7f15`                                         | Primary color                  |
| `--vlite-transition`                  | `0.25s ease`                                      | Transition                     |
| `--vlite-controlBarHeight`            | `50px`                                            | Control bar height             |
| `--vlite-controlBarHorizontalPadding` | `10px`                                            | Control bar horizontal padding |
| `--vlite-controlBarBackground`        | `linear-gradient(to top, #000 -50%, transparent)` | Control bar background         |
| `--vlite-controlsColor`               | `#fff\|#000`                                      | Controls color (video\|audio)  |
| `--vlite-controlsOpacity`             | `0.9`                                             | Controls opacity               |
| `--vlite-progressBarHeight`           | `5px`                                             | Progress bar height            |
| `--vlite-progressBarBackground`       | `rgba(0 0 0 / 25%)`                               | Progress bar background        |

---

## Shortcuts

The player accepts the following keyboard shortcuts.

|        Key        | Action                   |
| :---------------: | ------------------------ |
| <kbd>space</kbd>  | Toggle playback          |
|  <kbd>Esc</kbd>   | Exit the fullscreen      |
| <kbd>&larr;</kbd> | Seek backward of `5s`    |
| <kbd>&rarr;</kbd> | Seek forward of `5s`     |
| <kbd>&uarr;</kbd> | Increase volume of `10%` |
| <kbd>&darr;</kbd> | Decrease volume of `10%` |

## Contributors

Many thanks to [Victor Schirm](https://www.behance.net/victorshm) for the `vlitejs` logo.

## License

`vlitejs` is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Created with &#9825; by [@yoriiis](https://github.com/yoriiis).
