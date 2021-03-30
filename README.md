# vLitejs

![vLitejs](https://img.shields.io/badge/vlitejs-v4.0.0-ff7f15.svg?style=for-the-badge) ![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/yoriiis/vlitejs/Build/main?style=for-the-badge) [![Gitter Chat](https://img.shields.io/gitter/room/yoriiis/vlitejs?color=%2345cba1&style=for-the-badge)](https://gitter.im/vlitejs/vlitejs)

`vLitejs` is a **fast** and **lightweight** Javascript library to customize and skin native HTML5 video & audio, Youtube and Vimeo. `vLitejs` has no dependency with any framework or library and is written in **Javascript native**.

[![Image of vLitejs](./examples/assets/screenshot.jpg)](https://yoriiis.github.io/vlitejs)

## Features

- **HTML5 video**, **HTML5 audio**, **Youtube**, **Vimeo**
- **Customizable** - Enable/disable control buttons
- **Picture-in-Picture** - Supports picture-in-picture mode
- **Multiple captions** - Supports for multiple caption tracks (VTT)
- **No frameworks** - No dependency with any framework or library and written in Javascript native
- **Playsinline** - Supports the playsinline attribute
- **Shortcuts** - Supports keyboard shortcuts
- **Fullscreen** - Supports native fullscreen
- **Events** - Standardized events across all providers
- **API provider** - Register provider and create new
- **API plugin** - Register plugin and create new
- **Accessibility** - W3C and [a11y](https://www.a11yproject.com) valid

## The competition size

|              | vLitejs <br /> `4.0.0` | Plyr <br /> `3.6.4` | Videojs <br /> `7.11.4` |
| ------------ | :--------------------: | :-----------------: | :---------------------: |
| Uncompressed |        **81Ko**        |        310Ko        |         2000Ko          |
| Compressed   |        **32Ko**        |        120Ko        |          537Ko          |
| Gzip         |        **8Ko**         |        30Ko         |          149Ko          |

---

## Installation

`vLitejs` is available as a package on [npm](https://www.npmjs.com/package/vlitejs) and [Github](https://github.com/yoriiis/vlitejs).

```bash
npm install vlitejs --save-dev
```

```bash
yarn add vlitejs  --dev
```

## Demo

Online demo is available on [yoriiis.github.io/vlitejs](https://yoriiis.github.io/vlitejs).

The project includes also several examples of `vLitejs` implementation in the directory `./examples`.

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

```javascript
import vlitejs from 'vlitejs'

new vlitejs({
  selector: '#player'
})
```

### Options

| Options       |      Type      | Default | Description                                                                          |
| ------------- | :------------: | :-----: | ------------------------------------------------------------------------------------ |
| `autoplay`    |    Boolean     |  false  | Enable the autoplay of the media                                                     |
| `controls`    |    Boolean     |  true   | Display the control bar of the media                                                 |
| `playPause`   |    Boolean     |  true   | Display the play/pause button on the control bar                                     |
| `time`        |    Boolean     |  true   | Display the time information on the control bar                                      |
| `progressBar` |    Boolean     |  true   | Display the progress bar on the control bar                                          |
| `volume`      |    Boolean     |  true   | Display the volume button on the control bar                                         |
| `fullscreen`  |    Boolean     |  true   | Display the fullscreen button on the control bar                                     |
| `poster`      |  String\|null  |  null   | Personalize the poster url of the video                                              |
| `autoHide`    |    Boolean     |  false  | Enable auto hide the control bar in the event of inactivity after a period of 3000ms |
| `onReady`     | Function\|null |  null   | Callback function when the player is ready                                           |

### Methods

| Method                | Parameters | Description                 |
| --------------------- | :--------: | --------------------------- |
| `play()`              |     -      | Start the playback          |
| `pause()`             |     -      | Pause the playback          |
| `mute()`              |     -      | Mute the volume             |
| `unMmute()`           |     -      | Unmute the volume           |
| `seekTo(newTime)`     |   Number   | Seek to a current time (ms) |
| `requestFullscreen()` |     -      | Request the fullscreen      |
| `exitFullscreen()`    |     -      | Exit the fullscreen         |
| `destroy()`           |     -      | Destroy the player          |
| `getInstance()`       |     -      | Get the player instance     |

### Events

| Event Type        | Description                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `play`            | Sent when the playback state is no longer paused, as a result of the play method, or the autoplay attribute |
| `pause`           | Sent when the playback state is changed to paused                                                           |
| `ended`           | Sent when playback completes                                                                                |
| `progress`        | Sent periodically to inform interested parties of progress downloading the media.                           |
| `volumechange`    | Sent when the audio volume changes                                                                          |
| `timeupdate`      | The time indicated by the element's `currentTime` attribute has changed                                     |
| `enterfullscreen` | Sent when the video switches into of full-screen mode                                                       |
| `exitfullscreen`  | Sent when the video switches out of full-screen mode                                                        |
| `enterpip`        | Sent when the video switches into of picture in picture mode                                                |
| `leavepip`        | Sent when the video switches out of picture in picture mode                                                 |
| `trackenabled`    | Sent when a track is enabled and displayed                                                                  |
| `trackdisabled`   | Sent when a track is disabled and hidden                                                                    |

## API

### Providers

#### Register a plugin

```js
import vlitejsYoutube from 'vlitejs/providers/youtube'

vlitejs.registerPlugin('youtube', vlitejsYoutube)

new vlitejs({
  selector: '#player',
  provider: 'youtube'
})
```

#### List of providers

| Provider  | Path                        | Description                                                                                    |
| --------- | --------------------------- | ---------------------------------------------------------------------------------------------- |
| `youtube` | `vlitejs/providers/youtube` | [Youtube player API](https://developers.google.com/youtube/iframe_api_reference) compatibility |
| `vimeo`   | `vlitejs/providers/vimeo`   | [Vimeo player SDK](https://developer.vimeo.com/player/sdk/basics) compatibility                |

### Plugins

#### Register a plugin

```js
import vlitejsSubtitle from 'vlitejs/plugins/subtitle'
import vlitejsSubtitle from 'vlitejs/plugins/subtitle.css'

vlitejs.registerPlugin('subtitle', vlitejsSubtitle)

new vlitejs({
  selector: '#player',
  plugins: ['subtitle']
})
```

#### List of plugins

| Plugin     | Path                      | Description                                |
| ---------- | ------------------------- | ------------------------------------------ |
| `subtitle` | `vlitejs/plugin/subtitle` | Supports for multiple caption tracks (VTT) |
| `pip`      | `vlitejs/plugin/pip`      | Supports for picture-in-picture mode       |

## Licence

vLitejs is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br />
Created with ♥ by [@yoriiis](http://github.com/yoriiis).

## Contributors

Many thanks to <a href="https://www.behance.net/victorshm" target="_blank" title="Victor Schirm">Victor Schirm</a> for the `vLitejs` logo 👍
