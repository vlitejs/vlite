# Provider: HTML5 video and audio

Supports for HTML5 video and audio player.

## Overview

The provider is already inludes in `vLitejs`.

## Usage

### HTML

#### Video

```html
<video id="player" class="vlite-js" src="<path_to_video_mp4>"></video>
```

#### Audio

```html
<audio id="player" class="vlite-js" src="<path_to_audio_mp3>"></audio>
```

### JavaScript

```js
import 'vlitejs/dist/vlite.css';
import Vlitejs from 'vlitejs';

new Vlitejs('#player');
```

> The `provider` parameter on the `Vlitejs` constructor is `html5` by default.

## Demo

See demos of [HTML5 video provider](https://jsfiddle.net/yoriiis/42v8m3cp) and [HTML5 audio provider](https://jsfiddle.net/yoriiis/19pnqkge).
