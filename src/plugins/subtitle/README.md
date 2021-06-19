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
- _&sup2;Providers: `html5|youtube|vimeo`_
- _&sup3;Media type: `video|audio`_

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
import 'vlitejs/dist/vlite.css';
import 'vlitejs/dist/plugins/subtitle.css';
import Vlitejs from 'vlitejs';
import VlitejsSubtitle from 'vlitejs/dist/plugins/subtitle';

Vlitejs.registerPlugin('subtitle', VlitejsSubtitle);

new Vlitejs('#player', {
  plugins: ['subtitle']
});
```
