# Provider: Vimeo

Supports for Vimeo player with the [Vimeo player SDK](https://developer.vimeo.com/player/sdk/basics).

> **Note** The Vimeo SDK is automatically loaded by the provider.

## Overview

| <!-- -->          | <!-- -->                     |
| ----------------- | ---------------------------- |
| Name              | `vimeo`                      |
| Global name&sup1; | `window.VlitejsVimeo`        |
| Path              | `vlitejs/providers/vimeo`    |
| Entry point       | `vlitejs/providers/vimeo.js` |

> **Note** _&sup1; The global name is only useful if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._
>
> **Warning** Above paths uses package `exports`, with CDN use, add `dist/` after `vlitejs/`

## Usage

### HTML

```html
<div id="player" data-vimeo-id="<video_id>"></div>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsVimeo from 'vlitejs/providers/vimeo';

Vlitejs.registerProvider('vimeo', VlitejsVimeo);

new Vlitejs('#player', {
  provider: 'vimeo'
});
```

## Demo

See the [Vimeo provider](https://glitch.com/edit/#!/vlitejs-vimeo-video?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false) demo.

## SDK documentation

See the [Vimeo player SDK](https://developer.vimeo.com/player/sdk/basics) documentation.
