title: Getting started - vLitejs
description: Project includes CSS, font icons and Javascript files. The installation is fast and the video player is easily customizable. Youtube API is automatically loaded

## Installation

### NPM

Install `vlitejs` with npm:

```shell
npm install vlitejs
```

```javascript
import vlitejs from 'vlitejs';
import 'vlitejs.css';

new vlitejs({
    selector: '#player'
});
```

### Manual import

Includes files manually in your project:

```html
<link rel="stylesheet" href="vlite.css" />
<script src="vlitejs"></script>

<script>
    new vlitejs({
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