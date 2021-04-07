# Plugin: Subtitle

Supports for multiple caption tracks (VTT).

## Overview

| <!-- -->                 |                <!-- -->                 |
| ------------------------ | :-------------------------------------: |
| Name                     |               `subtitle`                |
| Global name&sup1;        |        `window.VlitejsSubtitle`         |
| Path                     |       `vlitejs/plugins/subtitle`        |
| Entry point              | `vlitejs/plugins/subtitle/subtitle.js`  |
| Stylesheet               | `vlitejs/plugins/subtitle/subtitle.css` |
| Provider compatibility   |                `'html5'`                |
| Media type compatibility |                `'video'`                |

- _&sup1; The global name is only useful if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._

## Usage

### HTML

<!-- prettier-ignore -->
```html
<video id="player" class="vlite-js" src="/path/to/video.mp4">
    <track label="English" kind="subtitles" srclang="en" src="/path/to/subtitle-en.vtt" default>
    <track label="French" kind="subtitles" srclang="fr" src="/path/to/subtitle-fr.vtt">
</video>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import 'vlitejs/plugins/subtitle.css';
import Vlitejs from 'vlitejs';
import VlitejsSubtitle from 'vlitejs/plugins/subtitle';

Vlitejs.registerPlugin('subtitle', VlitejsSubtitle);

new Vlitejs({
  selector: '#player',
  plugins: ['subtitle']
});
```
