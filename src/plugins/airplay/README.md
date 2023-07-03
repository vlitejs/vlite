# Plugin: AirPlay

Supports for Apple AirPlay API.

## Overview

| <!-- -->          | <!-- -->                              |
| ----------------- | ------------------------------------- |
| Name              | `airplay`                             |
| Global name&sup1; | `window.VlitejsAirPlay`               |
| Path              | `vlitejs/plugins/airplay`             |
| Entry point       | `vlitejs/plugins/airplay/airplay.js`  |
| Stylesheet        | `vlitejs/plugins/airplay/airplay.css` |
| Provider&sup2;    | `'html5'`                             |
| Media type&sup3;  | `'video'`                             |

> **Note** _&sup1; Useful only if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._
>
> **Warning** Above paths uses package `exports`, with CDN use, add `dist/` after `vlitejs/`

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
import VlitejsAirPlay from 'vlitejs/plugins/airplay';

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
