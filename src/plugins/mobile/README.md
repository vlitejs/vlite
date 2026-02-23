# Plugin: Mobile

Adds mobile-specific behaviors for touch devices.

## Overview

| <!-- -->         | <!-- -->                                     |
| ---------------- | -------------------------------------------- |
| Name             | `mobile`                                     |
| Path             | `vlitejs/plugins/mobile`                     |
| Entry point      | `vlitejs/plugins/mobile/mobile.js`           |
| Provider&sup2;   | `'html5', 'youtube', 'vimeo', 'dailymotion'` |
| Media type&sup3; | `'video'`                                    |

The plugin is automatically **no-op on non-touch devices**.
It relies on the internal `player.isTouch` flag, so desktop behavior is not affected.

### Behavior on touch devices

On touch devices only:

- A **tap on the overlay** (`.v-overlay`) behaves as:
  - **First tap** (control bar hidden): shows the control bar
  - **Next taps** (control bar visible): toggles play/pause

## Usage

### HTML

```html
<video id="player" src="<path_to_video_mp4>" playsinline></video>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsMobile from 'vlitejs/plugins/mobile/mobile.js';

Vlitejs.registerPlugin('mobile', VlitejsMobile);

new Vlitejs('#player', {
  plugins: ['mobile']
});
```
