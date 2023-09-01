# Plugin: Sticky

Supports for sticky mode.

## Overview

| <!-- -->         | <!-- -->                                     |
| ---------------- | -------------------------------------------- |
| Name             | `sticky`                                     |
| Path             | `vlitejs/plugins/sticky`                     |
| Entry point      | `vlitejs/plugins/sticky/sticky.js`           |
| Stylesheet       | `vlitejs/plugins/sticky/sticky.css`          |
| Provider&sup2;   | `'html5', 'youtube', 'vimeo', 'dailymotion'` |
| Media type&sup3; | `'video'`                                    |

## Usage

### HTML

```html
<video id="player" src="<path_to_video_mp4>"></video>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import 'vlitejs/plugins/sticky.css';
import Vlitejs from 'vlitejs';
import VlitejsSticky from 'vlitejs/plugins/sticky.js';

Vlitejs.registerPlugin('sticky', VlitejsSticky);

new Vlitejs('#player', {
  plugins: ['sticky']
});
```

## Events

The plugin exposes the following native `Event` on the `.v-vlite` element.

| Event Type    | Description                                 |
| ------------- | ------------------------------------------- |
| `entersticky` | Sent when the video switches to sticky mode |
| `leavesticky` | Sent when the video exits sticky mode       |

## Configuration

The plugin allows customization with an optional object as the third parameter of the `registerPlugin` function.

| Event Type |   Type   |    Default    | Description                                                                                                                                                                                    |
| ---------- | :------: | :-----------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `String` | `on\|instant` | - `on` The sticky will launch after the player was firstly seen by the user.<br>- `instant` The sticky will launch once the player is loaded and the main player isn't in the user's viewport. |
| `offset`   | `Number` |     `20`      | Specify the offset from the corner of the window                                                                                                                                               |
| `width`    | `Number` |     `400`     | Specify the width of the sticky player                                                                                                                                                         |
| `ratio`    | `Number` |    `16/9`     | Specify the ratio of the sticky player                                                                                                                                                         |

```js
Vlitejs.registerPlugin('sticky', VlitejsSticky, {
  mode: 'instant',
  offset: 20,
  width: 400,
  ratio: 16 / 9
});
```

## Demo

See the [Sticky plugin](https://glitch.com/edit/#!/vlitejs-html5-video-sticky?previewSize=50&attributionHidden=false&sidebarCollapsed=false&path=index.html&previewFirst=false) demo.
