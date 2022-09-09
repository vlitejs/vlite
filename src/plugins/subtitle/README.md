# Plugin: Subtitle

Supports for multiple caption tracks (VTT).

## Overview

| <!-- -->          | <!-- -->                                     |
| ----------------- | -------------------------------------------- |
| Name              | `subtitle`                                   |
| Global name&sup1; | `window.VlitejsSubtitle`                     |
| Path              | `vlitejs/dist/plugins/subtitle`              |
| Entry point       | `vlitejs/dist/plugins/subtitle/subtitle.js`  |
| Stylesheet        | `vlitejs/dist/plugins/subtitle/subtitle.css` |
| Provider&sup2;    | `'html5'`                                    |
| Media type&sup3;  | `'video'`                                    |

- _&sup1; Useful only if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._

## Usage

### HTML

```html
<video id="player" class="vlite-js" src="<path_to_video_mp4>">
  <track label="English" kind="subtitles" srclang="en" src="<path_to_subtitle_en.vtt>" default />
  <track label="French" kind="subtitles" srclang="fr" src="<path_to_subtitle_fr.vtt>" />
</video>
```

### JavaScript

```js
import 'vlitejs/dist/vlite.css';
import 'vlitejs/dist/plugins/subtitle.css';
import Vlitejs from 'vlitejs';
import VlitejsSubtitle from 'vlitejs/dist/plugins/subtitle';

Vlitejs.registerPlugin('subtitle', VlitejsSubtitle);

new Vlitejs('#player', {
  plugins: ['subtitle']
});
```

## Events

The plugin exposes the following native `Event` on the `.v-vlite` element.

| Event Type      | Description                                |
| --------------- | ------------------------------------------ |
| `trackenabled`  | Sent when a track is enabled and displayed |
| `trackdisabled` | Sent when a track is disabled and hidden   |

## Demo

See the [Subtitle plugin](https://jsfiddle.net/yoriiis/cbe0z3uo) demo.
