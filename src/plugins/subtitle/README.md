# Plugin: Subtitle

Supports for multiple caption tracks (VTT).

## Overview

| <!-- -->         | <!-- -->                                |
| ---------------- | --------------------------------------- |
| Name             | `subtitle`                              |
| Path             | `vlitejs/plugins/subtitle`              |
| Entry point      | `vlitejs/plugins/subtitle/subtitle.js`  |
| Stylesheet       | `vlitejs/plugins/subtitle/subtitle.css` |
| Provider&sup2;   | `'html5', 'vimeo', 'dailymotion', 'youtube'` |
| Media type&sup3; | `'video'`                               |

## Usage

### HTML

```html
<video id="player" src="<path_to_video_mp4>">
  <track label="English" kind="subtitles" srclang="en" src="<path_to_subtitle_en.vtt>" default />
  <track label="French" kind="subtitles" srclang="fr" src="<path_to_subtitle_fr.vtt>" />
</video>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import 'vlitejs/plugins/subtitle.css';
import Vlitejs from 'vlitejs';
import VlitejsSubtitle from 'vlitejs/plugins/subtitle.js';

Vlitejs.registerPlugin('subtitle', VlitejsSubtitle);

new Vlitejs('#player', {
  plugins: ['subtitle']
});
```

### JavaScript (Vimeo)

```js
import 'vlitejs/vlite.css';
import 'vlitejs/plugins/subtitle.css';
import Vlitejs from 'vlitejs';
import VlitejsSubtitle from 'vlitejs/plugins/subtitle.js';
import VlitejsVimeo from 'vlitejs/providers/vimeo.js';

Vlitejs.registerProvider('vimeo', VlitejsVimeo);
Vlitejs.registerPlugin('subtitle', VlitejsSubtitle);

new Vlitejs('#player', {
  provider: 'vimeo',
  plugins: ['subtitle']
});
```

> [!NOTE]
> For Vimeo, captions are rendered inside the Vimeo iframe. The subtitle button and menu control which track is active, but the visual rendering is handled by Vimeo's player. Captions availability depends on the video's caption track configuration on Vimeo.

### JavaScript (Dailymotion)

```js
import 'vlitejs/vlite.css';
import 'vlitejs/plugins/subtitle.css';
import Vlitejs from 'vlitejs';
import VlitejsSubtitle from 'vlitejs/plugins/subtitle.js';
import VlitejsDailymotion from 'vlitejs/providers/dailymotion.js';

Vlitejs.registerProvider('dailymotion', VlitejsDailymotion, { playerId: 'x9scg' });
Vlitejs.registerPlugin('subtitle', VlitejsSubtitle);

new Vlitejs('#player', {
  provider: 'dailymotion',
  plugins: ['subtitle']
});
```

> [!NOTE]
> For Dailymotion, captions are rendered inside the Dailymotion iframe. Language labels are derived from language codes using the browser's `Intl.DisplayNames` API. Captions availability depends on the video's subtitle track configuration on Dailymotion.

### JavaScript (YouTube)

```js
import 'vlitejs/vlite.css';
import 'vlitejs/plugins/subtitle.css';
import Vlitejs from 'vlitejs';
import VlitejsSubtitle from 'vlitejs/plugins/subtitle.js';
import VlitejsYoutube from 'vlitejs/providers/youtube.js';

Vlitejs.registerProvider('youtube', VlitejsYoutube);
Vlitejs.registerPlugin('subtitle', VlitejsSubtitle);

new Vlitejs('#player', {
  provider: 'youtube',
  plugins: ['subtitle']
});
```

> [!NOTE]
> For YouTube, captions are rendered inside the YouTube iframe. The subtitle button appears after the YouTube captions module becomes available, which typically requires the video to start playing. Captions availability depends on the video's caption track configuration on YouTube.

## Events

The plugin exposes the following native `Event` on the `.v-vlite` element.

| Event Type      | Description                                |
| --------------- | ------------------------------------------ |
| `trackenabled`  | Sent when a track is enabled             |
| `trackdisabled` | Sent when a track is disabled            |

## Demo

See the [Subtitle plugin](https://jsfiddle.net/yoriiis/cbe0z3uo) demo.
