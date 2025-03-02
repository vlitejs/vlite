# Plugin: Hotkeys

Supports for hotkeys to add shortcuts.

The player accepts the following keyboard shortcuts.

|        Key        | Action                   |
| :---------------: | ------------------------ |
| <kbd>space</kbd>  | Toggle playback          |
|  <kbd>Esc</kbd>   | Exit the fullscreen      |
| <kbd>&larr;</kbd> | Seek backward of `5s`    |
| <kbd>&rarr;</kbd> | Seek forward of `5s`     |
| <kbd>&uarr;</kbd> | Increase volume of `10%` |
| <kbd>&darr;</kbd> | Decrease volume of `10%` |

## Overview

| <!-- -->         | <!-- -->                                     |
| ---------------- | -------------------------------------------- |
| Name             | `hotkeys`                                    |
| Path             | `vlitejs/plugins/hotkeys`                    |
| Entry point      | `vlitejs/plugins/hotkeys/hotkeys.js`         |
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
import VlitejsHotkeys from 'vlitejs/plugins/hotkeys.js';

Vlitejs.registerPlugin('hotkeys', VlitejsHotkeys);

new Vlitejs('#player', {
  plugins: ['hotkeys']
});
```

## Configuration

The plugin allows customization with an optional object as the third parameter of the `registerPlugin` function.

| Event Type   |    Type    | Default | Description                                                                  |
| ------------ | :--------: | :-----: | ---------------------------------------------------------------------------- |
| `seekTime`   |  `Number`  |   `5`   | Set seek time seconds of the backward and forward shortcuts                  |
| `volumeStep` |  `Number`  |  `0.1`  | Set the volume step (between 0 and 1) of the increase and decrease shortcuts |

```js
Vlitejs.registerPlugin('hotkeys', VlitejsHotkeys, {
  seekTime: 3,
  volumeStep: 0.2
});
```
