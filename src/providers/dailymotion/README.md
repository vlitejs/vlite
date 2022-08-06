# Provider: Dailymotion

Supports for Dailymotion player with the [Dailymotion player API](https://developers.dailymotion.com/player/#player-library-script).

> The Dailymotion API is automatically loaded by the provider.

## Overview

| <!-- -->          | <!-- -->                                |
| ----------------- | --------------------------------------- |
| Name              | `dailymotion`                           |
| Global name&sup1; | `window.VlitejsDailymotion`             |
| Path              | `vlitejs/dist/providers/dailymotion`    |
| Entry point       | `vlitejs/dist/providers/dailymotion.js` |

- _&sup1; The global name is only useful if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._

## Usage

First, Dailymotion requires a Player Id to create player with the JavaScript API. It can be created from the Partner Space (see [Getting started](https://developers.dailymotion.com/player#getting-started)) and passed to the function `registerProvider` as the following example.

### HTML

```html
<div id="player" class="vlite-js" data-video-id="x403kr8"></div>
```

### JavaScript

```js
import 'vlitejs/dist/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsDailymotion from 'vlitejs/dist/providers/dailymotion';

Vlitejs.registerProvider('dailymotion', VlitejsDailymotion, {
  playerId: '<dailymotion_player_id>' // Required by Dailymotion
});

new Vlitejs('#player', {
  provider: 'dailymotion'
});
```

## API documentation

See the [Dailymotion player API](https://developers.dailymotion.com/player/#player-library-script) documentation.
