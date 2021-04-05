# Plugin: Picture-in-Picture

Supports for multiple caption tracks (VTT).

## Overview

| <!-- -->                 |           <!-- -->           |
| ------------------------ | :--------------------------: |
| Name                     |            `pip`             |
| Global name&sup1;        |   `window.VlitejsSubtitle`   |
| Path                     |    `vlitejs/plugins/pip`     |
| Entry point              | `vlitejs/plugins/pip/pip.js` |
| Stylesheet               |              -               |
| Provider compatibility   |          `'html5'`           |
| Media type compatibility |          `'video'`           |

- _&sup1; The global name is only useful if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._

## Usage

### HTML

```html
<video id="player" class="vlite-js" src="/path/to/video.mp4"></video>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsPip from 'vlitejs/plugins/pip';

vlitejs.registerPlugin('pip', VlitejsPip);

new Vlitejs({
  selector: '#player',
  plugins: ['pip']
});
```
