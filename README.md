![vLitejs](https://img.shields.io/badge/vLitejs-v1.1.2-ffb300.svg?style=flat-square)

# vLite.js

## The new smallest Javascript video library

See [https://vlite.bitbucket.io](https://vlite.bitbucket.io) for complete docs and demos.<br />

vLite.js is a **fast** and **lightweight** Javascript library to customize and skin native HTML5 video and Youtube video. Only **4Kb** on production with Gzip, vLite.js has no dependency with any framework or library and is write in **Javascript native**.<br /><br />

<center style="image-rendering: -webkit-optimize-contrast;">
<a href="https://vlite.bitbucket.io/demo" title="vLitejs demo" target="_blank"><img src="https://vlite.bitbucket.io/img/demo.jpg" alt="vLite on desktop" /></a>
</center><br /><br />

This module is fully writen in Javascript native. No need to import an additional librairy like jQuery or Handlebars. #YouMightNotNeedJquery<br />

## Demo

Online demo is available on the [vLite website](https://vlite.bitbucket.io/demo).

## Download

vLitejs is available as the `vlitejs` package on [npm](https://www.npmjs.com/package/vlitejs) and [Github](https://github.com/yoriiis/vlitejs).

## Browser support

The project is fully compatible with the most popular web browser. More information about the HTML5 video support <a href="https://caniuse.com/#feat=video" target="_blank" title="Browser support">here</a>.

## Licences

Available with the __MIT licence__.

## How it works

#### HTML5 video

```html
<video id="{{idSelector}}"
    class="vlite-js"
</video>
```

### Youtube video

```html
<video id="{{idSelector}}"
    class="vlite-js"
    data-youtube-id="{{idYoutube}}">
</video>
```

### Simple example with options in HTML

The simplest way to use vLite is like the example below.<br />
Default options are used and passed in the HTML. The `poster` was overrided with the correct path.

```html
<video id="{{idSelector}}"
    class="vlite-js"
    data-options='{"poster": "img/poster.jpg"}'>
</video>
```

```javascript
var player = new vLite({
    selector: '#player-1'
});
```
<br />

More information in the [vLite website](https://vlite.bitbucket.io).<br />
If you like the project, like it on Github please :)