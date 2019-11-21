title: How it works - vLitejs
description: vLitejs includes a minimalist HTML structure to start your video player. All available options are listed here and can be changed in the constructor

## HTML structure

HTML5 and Youtube video players use the same minimalist structure with native HTML5 `<video>` tag.

!!! warning "HTML"
    Each video players must have inevitably a __unique id__.

### HTML5 video

* `{{idSelector}}` - Unique HTML id
* `{{videoSource}}` - Video path

```html
<video id="{{idSelector}}"
    class="vlite-js"
    src="{{videoSource}}">
</video>
```

### Youtube video

* `{{idSelector}}` - Unique HTML id
* `{{videoId}}` - Youtube video id

```html
<video id="{{idSelector}}"
    class="vlite-js"
    data-youtube-id="{{videoId}}">
</video>
```

### Video skin

<br /><p align="center" class="video-center">
    <a href="https://yoriiis.github.io/vlitejs/demo" title="Demo" class="custom-button">
        ![Screenshot](img/demo2.jpg)
    </a>
</p>

## Options

Each video players has its own options object. For more flexibility, vLitejs accepts two possibilities for passed them.

#### Options in HTML

Options object must be a valid JSON and writes between single quotes in data attribute `data-options`.

```html
<video id="player"
    data-options='{"autoplay": false, "controls": true}'>
</video>
```

#### Option in Javascript constructor

Options object passed to the constructor.

```javascript
new vlitejs({
    options: {
        autoplay: false,
        controls: true
    }
});
```

!!! warning "Only one or the other"
    Don't pass options in the HTML in adition to Javascript constructor. If you choose to do it, there will be a __conflict__, and the priority will be given to options pass by the data attribute `data-options` in the HTML.

#### Available options

List of all options with their default values.

#### `autoplay`

`default: boolean = false`

Tells vLitejs whether to enable the autoplay of the video.

```javascript
new vlitejs({
    options: {
        autoplay: true
    }
});
```

#### `controls`

`default: boolean = true`

Tells vLitejs whether to display the control bar of the video.

```javascript
new vlitejs({
    options: {
        controls: true
    }
});
```

#### `playPause`

`default: boolean = true`

Tells vLitejs whether to display the play/pause button on the control bar.

```javascript
new vlitejs({
    options: {
        playPause: true
    }
});
```

#### `time`

`default: boolean = true`

Tells vLitejs whether to display the time information on the control bar.

```javascript
new vlitejs({
    options: {
        time: true
    }
});
```

#### `progressBar`

`default: boolean = true`

Tells vLitejs whether to display the progress bar on the control bar.

```javascript
new vlitejs({
    options: {
        progressBar: true
    }
});
```

#### `volume`

`default: boolean = true`

Tells vLitejs whether to display the volume button on the control bar.

```javascript
new vlitejs({
    options: {
        volume: true
    }
});
```

#### `fullscreen`

`default: boolean = true`

Tells vLitejs whether to display the fullscreen button on the control bar.

```javascript
new vlitejs({
    options: {
        fullscreen: true
    }
});
```

#### `poster`

`default: null`

Tells vLitejs whether to personalize the poster url of the video.

```javascript
new vlitejs({
    options: {
        poster: 'poster.jpg'
    }
});
```

#### `bigPlay`

`default: boolean = true`

Tells vLitejs whether to display the big play button on the video.

```javascript
new vlitejs({
    options: {
        bigPlay: true
    }
});
```

#### `autoHide`

`default: boolean = false`

Tells vLitejs whether to hide the control bar if the user is inactive (delay 3000ms).

```javascript
new vlitejs({
    options: {
        autoHide: false
    }
});
```

#### `nativeControlsForTouch`

`default: boolean = false`

Tells vLitejs whether to keep native controls for touch devices.

```javascript
new vlitejs({
    options: {
        nativeControlsForTouch: false
    }
});
```

## Instantiation

The vLitejs class accept an object as parameter with 3 keys:

* `selector` - Selector of the video element (mandatory)
* `options` - Object of options (optional)
* `onReady` - Callback function (optional)

!!! info "Selector"
    The selector can be a string with unique identifier or an HTML element with `document.querySelector('#player')`.

#### Simple example with options in HTML

The simplest way to use vLitejs is like the example below. All default options are used except the `poster` was override by `data-options`.

```html
<video id="{{idSelector}}"
    class="vlite-js"
    src="{{videoSource}}"
    data-options='{"poster": "poster.jpg"}'>
</video>
```

```javascript
new vlitejs({
    selector: '#player'
});
```

#### Example with the onReady function and options in the constructor

The `onReady` function is called when the current player is instanciated and ready. The function expose the `player` instance.

```html
<video id="{{idSelector}}"
    class="vlite-js"
    data-youtube-id="{{videoId}}">
</video>
```

```javascript
new vlitejs({
    selector: '#player',
    options: {
        "poster": "poster.jpg"
    },
    onReady: (player) => {
        //Ready
    }
});
```

## Load Youtube API

Youtube API is automatically loaded by vLitejs when a Youtube player is instanciated. All players are instanciate when the API is ready with a queuing system.

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'vlitejs/vlitejs'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>