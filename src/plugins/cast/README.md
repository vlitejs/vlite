# Plugin: Cast

Supports for Google Cast API.

## Overview

| <!-- -->          | <!-- -->                            |
| ----------------- | ----------------------------------- |
| Name              | `cast`                              |
| Global name&sup1; | `window.VlitejsCast`                |
| Path              | `vlitejs/dist/plugins/cast`         |
| Entry point       | `vlitejs/dist/plugins/cast/cast.js` |
| Stylesheet        | -                                   |
| Provider&sup2;    | `'html5'`                           |
| Media type&sup3;  | `'video'`                           |

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
import 'vlitejs/dist/plugins/cast.css';
import Vlitejs from 'vlitejs';
import VlitejsCast from 'vlitejs/dist/plugins/cast';

Vlitejs.registerPlugin('cast', VlitejsCast);

new Vlitejs('#player', {
  plugins: ['cast']
});
```

### Configuration

The plugin allows customization with an optional object as the third parameter of the `registerPlugin` function.

#### Subtitle

Describes style information for a text subtitle.

```js
Vlitejs.registerPlugin('cast', VlitejsCast, {
  textTrackStyle: {
    backgroundColor: '#21212190'
  }
});
```

See the [TextTrackStyle](https://developers.google.com/cast/docs/reference/web_sender/chrome.cast.media.TextTrackStyle) reference for available fields.

#### Metadata

Describes media metadata description.

```js
Vlitejs.registerPlugin('cast', VlitejsCast, {
  metadata: {
    title: 'The Jungle Book',
    subtitle: 'Walt Disney Animation Studios'
  }
});
```

> The `images` field automatically displays the poster available in the [Vlitejs options](../../../README.md#Options).

See the [Metadata](https://developers.google.com/cast/docs/reference/web_sender/chrome.cast.media.GenericMediaMetadata) reference for available fields.
