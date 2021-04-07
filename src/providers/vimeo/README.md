# Provider: Vimeo

Supports for Vimeo player with the [Vimeo player SDK](https://developer.vimeo.com/player/sdk/basics).

## Overview

| <!-- -->          |           <!-- -->           |
| ----------------- | :--------------------------: |
| Name              |           `vimeo`            |
| Global name&sup1; |    `window.VlitejsVimeo`     |
| Path              |  `vlitejs/providers/vimeo`   |
| Entry point       | `vlitejs/providers/vimeo.js` |

- _&sup1; The global name is only useful if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._

## Usage

### HTML

```html
<div id="player" class="vlite-js" data-vimeo-id="1084537"></div>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsVimeo from 'vlitejs/providers/vimeo';

vlitejs.registerProvider('vimeo', VlitejsVimeo);

new Vlitejs({
  selector: '#player',
  provider: 'vimeo'
});
```
