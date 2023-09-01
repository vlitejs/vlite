# Plugin: AirPlay

Supports for Apple AirPlay API.

## Overview

| <!-- -->         | <!-- -->                              |
| ---------------- | ------------------------------------- |
| Name             | `airplay`                             |
| Path             | `vlitejs/plugins/airplay`             |
| Entry point      | `vlitejs/plugins/airplay/airplay.js`  |
| Stylesheet       | `vlitejs/plugins/airplay/airplay.css` |
| Provider&sup2;   | `'html5'`                             |
| Media type&sup3; | `'video'`                             |

## Usage

### HTML

```html
<video id="player" src="<path_to_video_mp4>"></video>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import 'vlitejs/plugins/airplay.css';
import Vlitejs from 'vlitejs';
import VlitejsAirPlay from 'vlitejs/plugins/airplay.js';

Vlitejs.registerPlugin('airplay', VlitejsAirPlay);

new Vlitejs('#player', {
  plugins: ['airplay']
});
```

## Events

The plugin exposes the following native `Event` on the `.v-vlite` element.

| Event Type              | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `airplaysessionstarted` | Sent when the AirPlay session is established.  |
| `airplaysessionended`   | Sent when the AirPlay session is disconnected. |

## Limits

The [subtitle](../subtitle) plugin does not display subtitles on the AirPlay screen.
