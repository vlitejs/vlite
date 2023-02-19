# Plugin: Volume bar

Supports for volume bar to adjust the media volume.

## Overview

| <!-- -->          | <!-- -->                                        |
| ----------------- | ----------------------------------------------- |
| Name              | `pip`                                           |
| Global name&sup1; | `window.VlitejsVolumeBar`                       |
| Path              | `vlitejs/dist/plugins/volume-bar`               |
| Entry point       | `vlitejs/dist/plugins/volume-bar/volume-bar.js` |
| Stylesheet        | -                                               |
| Provider&sup2;    | `'html5', 'youtube', 'vimeo', 'dailymotion'`    |
| Media type&sup3;  | `'video', 'audio'`                              |

- _&sup1; Useful only if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._

## Usage

### HTML

```html
<video id="player" class="vlite-js" src="<path_to_video_mp4>"></video>
```

### JavaScript

```js
import 'vlitejs/dist/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsVolumeBar from 'vlitejs/dist/plugins/volume-bar';

Vlitejs.registerPlugin('volume-bar', VlitejsVolumeBar);

new Vlitejs('#player', {
  plugins: ['volume-bar']
});
```

## Demo

See the [volume-bar plugin](TODO) demo.
