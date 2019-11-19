title: Getting started - vLite.js
description: Project includes CSS, font icons and Javascript files. The installation is fast and the video player is easily customizable. Youtube API is automatically loaded

## Installation

The project contains HTML examples, CSS files for minimalist design, SVG icons and Javascript files for the `vLite` library.

Setup is easy with minimalist markup:

```html
<!-- HTML5 video -->
<video id="player"
    class="vlite-js">
</video>
```

```html
<!-- Youtube video -->
<video id="player"
    class="vlite-js"
    data-youtube-id="{{idYoutube}">
</video>
```

Install `vlitejs` with npm

```shell
npm install vlitejs
```

```javascript
import vLite from 'vlitejs';
import 'vlitejs.css';

var player = new vLite({
    selector: '#player'
});
```

...or includes files manually in your project:

```html
<link rel="stylesheet" href="vlite.css" />
<script src="vlite.js"></script>
<script>
    var player = new vLite.default({
        selector: '#player'
    });
</script>

```

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'vlitejs/vlitejs'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>