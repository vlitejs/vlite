# Provider: Youtube

Supports for Youtube player with the [Youtube player API](https://developers.google.com/youtube/iframe_api_reference).

> [!IMPORTANT]
> The Youtube API is automatically loaded by the provider.

## Overview

| <!-- -->    | <!-- -->                       |
| ----------- | ------------------------------ |
| Name        | `youtube`                      |
| Path        | `vlitejs/providers/youtube`    |
| Entry point | `vlitejs/providers/youtube.js` |

## Usage

### HTML

```html
<div id="player" data-youtube-id="<video_id>"></div>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsYoutube from 'vlitejs/providers/youtube.js';

Vlitejs.registerProvider('youtube', VlitejsYoutube);

new Vlitejs('#player', {
  provider: 'youtube'
});
```

## Demo

See the [Youtube provider](https://glitch.com/edit/#!/vlitejs-youtube-video?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false) demo.

## SDK documentation

See the [Youtube player API](https://developers.google.com/youtube/iframe_api_reference) documentation.
