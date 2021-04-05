# Plugin: Picture-in-Picture

Supports for multiple caption tracks (VTT).

|                          |                              |
| ------------------------ | ---------------------------- |
| Name                     | `pip`                        |
| Global name              | `window.VlitejsSubtitle`     |
| Path                     | `vlitejs/plugins/pip`        |
| Entry point              | `vlitejs/plugins/pip/pip.js` |
| Stylesheet               | -                            |
| Provider compatibility   | `'html5'`                    |
| Media type compatibility | `'video'`                    |

## Usage

### HTML

```html
<video id="player" class="vlite-js" src="/path/to/video.mp4"></video>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsPip from 'vlitejs/plugins/pip';

vlitejs.registerPlugin('pip', VlitejsPip);

new vlitejs({
  selector: '#player',
  plugins: ['pip']
});
```
