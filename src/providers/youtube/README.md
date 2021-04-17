# Provider: Youtube

Supports for Youtube player with the [Youtube player API](https://developers.google.com/youtube/iframe_api_reference).

> The Youtube API is automatically loaded by the provider.

## Overview

| <!-- -->          | <!-- -->                            |
| ----------------- | ----------------------------------- |
| Name              | `youtube`                           |
| Global name&sup1; | `window.VlitejsYoutube`             |
| Path              | `vlitejs/dist/providers/youtube`    |
| Entry point       | `vlitejs/dist/providers/youtube.js` |

- _&sup1; The global name is only useful if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._

## Usage

### HTML

```html
<div id="player" class="vlite-js" data-youtube-id="C4qgAaxB_pc"></div>
```

### JavaScript

```js
import 'vlitejs/dist/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsYoutube from 'vlitejs/dist/providers/youtube';

Vlitejs.registerProvider('youtube', VlitejsYoutube);

new Vlitejs({
  selector: '#player',
  provider: 'youtube'
});
```

## SDK documentation

See the [Youtube player API](https://developers.google.com/youtube/iframe_api_reference) documentation.
