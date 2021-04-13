# Provider: Youtube

Supports for Youtube player with the [Youtube player API](https://developers.google.com/youtube/iframe_api_reference).

## Overview

| <!-- -->          | <!-- -->                       |
| ----------------- | ------------------------------ |
| Name              | `youtube`                      |
| Global name&sup1; | `window.VlitejsYoutube`        |
| Path              | `vlitejs/providers/youtube`    |
| Entry point       | `vlitejs/providers/youtube.js` |

- _&sup1; The global name is only useful if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._

## Usage

### HTML

```html
<div id="player" class="vlite-js" data-youtube-id="1VIZ89FEjYI"></div>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsYoutube from 'vlitejs/providers/youtube';

Vlitejs.registerProvider('youtube', VlitejsYoutube);

new Vlitejs({
  selector: '#player',
  provider: 'youtube'
});
```

## SDK documentation

See the [Youtube player API](https://developers.google.com/youtube/iframe_api_reference) documentation.
