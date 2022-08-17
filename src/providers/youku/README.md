# Provider: Youku

Supports for Youku player with the [Youku player API](https://cloud.youku.com/tools).

> The Youku API is automatically loaded by the provider.

## Overview

| <!-- -->          | <!-- -->                          |
| ----------------- | --------------------------------- |
| Name              | `youku`                           |
| Global name&sup1; | `window.VlitejsYouku`             |
| Path              | `vlitejs/dist/providers/youku`    |
| Entry point       | `vlitejs/dist/providers/youku.js` |

- _&sup1; The global name is only useful if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._

## Usage

First, Youku requires a Client Id to create player with the JavaScript API. It can be created from the Application Space and passed to the function `registerProvider` as the following example.

### HTML

```html
<div id="player" class="vlite-js" data-youku-id="<video_id>"></div>
```

### JavaScript

```js
import 'vlitejs/dist/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsYouku from 'vlitejs/dist/providers/youku';

Vlitejs.registerProvider('youku', VlitejsYouku, {
  clientId: '<client_id>' // Required by Youku
});

new Vlitejs('#player', {
  provider: 'youku'
});
```

## API documentation

See the [Youku player API](https://cloud.youku.com/tools) documentation.
