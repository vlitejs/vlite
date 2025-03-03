# Plugin: Mobile

Supports for mobile.

## Overview

| <!-- -->         | <!-- -->                                     |
| ---------------- | -------------------------------------------- |
| Name             | `mobile`                                     |
| Path             | `vlitejs/plugins/mobile`                     |
| Entry point      | `vlitejs/plugins/mobile/mobile.js`           |
| Stylesheet       | `vlitejs/plugins/mobile/mobile.css`          |
| Provider&sup2;   | `'html5', 'youtube', 'vimeo', 'dailymotion'` |
| Media type&sup3; | `'video', 'audio'`                           |

## Usage

### HTML

```html
<video id="player" src="<path_to_video_mp4>"></video>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsMobile from 'vlitejs/plugins/mobile.js';

Vlitejs.registerPlugin('mobile', VlitejsMobile);

new Vlitejs('#player', {
  plugins: ['mobile']
});
```

## Configuration

The plugin allows customization with an optional object as the third parameter of the `registerPlugin` function.

| Event Type   |    Type    | Default | Description                                                                  |
| ------------ | :--------: | :-----: | ---------------------------------------------------------------------------- |
| `seekTime`   |  `Number`  |   `5`   | Set seek time seconds of the backward and forward shortcuts                  |
| `volumeStep` |  `Number`  |  `0.1`  | Set the volume step (between 0 and 1) of the increase and decrease shortcuts |
| `tapTimeout` |  `Number`  |  `300`  | Set the timeout to consider the double-tap                                   |

```js
Vlitejs.registerPlugin('mobile', VlitejsMobile, {
  seekTime: 3,
  volumeStep: 0.2,
  tapTimeout: 400
});
```
