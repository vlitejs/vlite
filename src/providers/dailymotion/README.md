# Provider: Dailymotion

Supports for Dailymotion player with the [Dailymotion player API](https://developers.dailymotion.com/player/#player-library-script).

> [!IMPORTANT]
> The Dailymotion API is automatically loaded by the provider.

## Overview

| <!-- -->    | <!-- -->                           |
| ----------- | ---------------------------------- |
| Name        | `dailymotion`                      |
| Path        | `vlitejs/providers/dailymotion`    |
| Entry point | `vlitejs/providers/dailymotion.js` |

## Usage

First, Dailymotion requires a Player Id to create player with the JavaScript API. It can be created from the Partner Space (see [Getting started](https://developers.dailymotion.com/player#getting-started)) and passed to the function `registerProvider` as the following example.

### HTML

```html
<div id="player" data-dailymotion-id="<video_id>"></div>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsDailymotion from 'vlitejs/providers/dailymotion.js';

Vlitejs.registerProvider('dailymotion', VlitejsDailymotion, {
  playerId: '<player_id>' // Required by Dailymotion
});

new Vlitejs('#player', {
  provider: 'dailymotion'
});
```

## Demo

See the [Dailymotion provider](https://glitch.com/edit/#!/vlitejs-dailymotion-video?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false) demo.

## API documentation

See the [Dailymotion player API](https://developers.dailymotion.com/player/#player-library-script) documentation.
