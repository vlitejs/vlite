# Plugin: Volume bar

Supports for volume bar to adjust the media volume.

> **Note** Available on screen more than `500px`.

## Overview

| <!-- -->         | <!-- -->                                     |
| ---------------- | -------------------------------------------- |
| Name             | `pip`                                        |
| Path             | `vlitejs/plugins/volume-bar`                 |
| Entry point      | `vlitejs/plugins/volume-bar/volume-bar.js`   |
| Stylesheet       | `vlitejs/plugins/volume-bar/volume-bar.css`  |
| Provider&sup2;   | `'html5', 'youtube', 'vimeo', 'dailymotion'` |
| Media type&sup3; | `'video', 'audio'`                           |

## Usage

### HTML

```html
<video id="player" src="<path_to_video_mp4>"></video>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import 'vlitejs/plugins/volume-bar.css';
import Vlitejs from 'vlitejs';
import VlitejsVolumeBar from 'vlitejs/plugins/volume-bar.js';

Vlitejs.registerPlugin('volume-bar', VlitejsVolumeBar);

new Vlitejs('#player', {
  plugins: ['volume-bar']
});
```

## Demo

See the [volume-bar plugin on audio](https://glitch.com/edit/#!/vlitejs-html5-audio-volume-bar?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false) and [volume-bar plugin on video](https://glitch.com/edit/#!/vlitejs-html5-video-volume-bar?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false) demo.
