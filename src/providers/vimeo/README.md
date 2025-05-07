# Provider: Vimeo

Supports for Vimeo player with the [Vimeo player SDK](https://developer.vimeo.com/player/sdk/basics).

> [!IMPORTANT]
> The Vimeo SDK is automatically loaded by the provider.

## Overview

| <!-- -->    | <!-- -->                     |
| ----------- | ---------------------------- |
| Name        | `vimeo`                      |
| Path        | `vlitejs/providers/vimeo`    |
| Entry point | `vlitejs/providers/vimeo.js` |

## Usage

### HTML

```html
<div id="player" data-vimeo-id="<video_id>"></div>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsVimeo from 'vlitejs/providers/vimeo.js';

Vlitejs.registerProvider('vimeo', VlitejsVimeo);

new Vlitejs('#player', {
  provider: 'vimeo'
});
```

## Demo

See the [Vimeo provider](https://glitch.com/edit/#!/vlitejs-vimeo-video?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false) demo.

## SDK documentation

See the [Vimeo player SDK](https://developer.vimeo.com/player/sdk/basics) documentation.
