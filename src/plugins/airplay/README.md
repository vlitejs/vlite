# Plugin: AirPlay

Supports for Apple AirPlay API.

## Overview

| <!-- -->          | <!-- -->                                   |
| ----------------- | ------------------------------------------ |
| Name              | `airplay`                                  |
| Global name&sup1; | `window.VlitejsAirPlay`                    |
| Path              | `vlitejs/dist/plugins/airplay`             |
| Entry point       | `vlitejs/dist/plugins/airplay/airplay.js`  |
| Stylesheet        | `vlitejs/dist/plugins/airplay/airplay.css` |
| Provider&sup2;    | `'html5'`                                  |
| Media type&sup3;  | `'video'`                                  |

- _&sup1; Useful only if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._
- _&sup2;Providers: `html5|youtube|vimeo`_
- _&sup3;Media type: `video|audio`_

## Usage

### HTML

```html
<video id="player" class="vlite-js" src="<path_to_video_mp4>"></video>
```

### JavaScript

```js
import 'vlitejs/dist/vlite.css';
import 'vlitejs/dist/plugins/airplay.css';
import Vlitejs from 'vlitejs';
import VlitejsAirPlay from 'vlitejs/dist/plugins/airplay';

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
