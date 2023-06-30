# Provider: Youtube

Supports for Youtube player with the [Youtube player API](https://developers.google.com/youtube/iframe_api_reference).

> **Note** The Youtube API is automatically loaded by the provider.

## Overview

| <!-- -->          | <!-- -->                            |
| ----------------- | ----------------------------------- |
| Name              | `youtube`                           |
| Global name&sup1; | `window.VlitejsYoutube`             |
| Path              | `vlitejs/dist/providers/youtube`    |
| Entry point       | `vlitejs/dist/providers/youtube.js` |

> **Note** _&sup1; The global name is only useful if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._

## Usage

### HTML

```html
<div id="player" data-youtube-id="<video_id>"></div>
```

### JavaScript

```js
import 'vlitejs/dist/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsYoutube from 'vlitejs/dist/providers/youtube';

Vlitejs.registerProvider('youtube', VlitejsYoutube);

new Vlitejs('#player', {
  provider: 'youtube'
});
```

## Demo

See the [Youtube provider](https://glitch.com/edit/#!/vlitejs-youtube-video?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false) demo.

## SDK documentation

See the [Youtube player API](https://developers.google.com/youtube/iframe_api_reference) documentation.
