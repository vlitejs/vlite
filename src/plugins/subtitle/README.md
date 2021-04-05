# Plugin: Subtitle

Supports for multiple caption tracks (VTT).

|                          |                                         |
| ------------------------ | --------------------------------------- |
| Name                     | `subtitle`                              |
| Global name              | `window.VlitejsSubtitle`                |
| Path                     | `vlitejs/plugins/subtitle`              |
| Entry point              | `vlitejs/plugins/subtitle/subtitle.js`  |
| Stylesheet               | `vlitejs/plugins/subtitle/subtitle.css` |
| Provider compatibility   | `'html5'`                               |
| Media type compatibility | `'video'`                               |

## Usage

### HTML

<!-- prettier-ignore -->
```html
<video id="player" class="vlite-js" src="/path/to/video.mp4">
    <track label="English" kind="subtitles" srclang="en" src="/path/to/subtitle-en.vtt" default>
    <track label="French" kind="subtitles" srclang="fr" src="/path/to/subtitle-fr.vtt">
</video>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import 'vlitejs/plugins/subtitle.css';
import Vlitejs from 'vlitejs';
import VlitejsSubtitle from 'vlitejs/plugins/subtitle';

vlitejs.registerPlugin('subtitle', VlitejsSubtitle);

new vlitejs({
  selector: '#player',
  plugins: ['subtitle']
});
```
