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
