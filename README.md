![vLitejs](https://img.shields.io/badge/vLitejs-v3.0.0-ffb300.svg?style=flat-square)

<img alt="TravisCI" src="https://travis-ci.org/yoriiis/vlitejs.svg?branch=develop"> <a href="https://bundlephobia.com/result?p=fela@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/vlitejs"></a> <a href="https://npmjs.com/package/chunks-webpack-plugin"><img alt="Npm downloads" src="https://img.shields.io/npm/dm/vlitejs?color=fb3e44&label=npm%20downloads&style=flat-square"></a> <a href="https://gitter.im/vlitejs/vlitejs"><img alt="Support" src="https://badges.gitter.im/gitterHQ/gitter.png"></a>

# vLitejs

## The new smallest Javascript video library

See [https://vlite.bitbucket.io](https://vlite.bitbucket.io) for complete docs and demos.<br />

vLite.js is a **fast** and **lightweight** Javascript library to customize and skin native HTML5 video and Youtube video. Only **5Kb** on production with Gzip, vLite.js has no dependency with any framework or library and is write in **Javascript native**.<br /><br />

<center style="image-rendering: -webkit-optimize-contrast;">
<a href="https://vlite.bitbucket.io/demo" title="vLitejs demo" target="_blank"><img src="https://vlite.bitbucket.io/img/demo.jpg" alt="vLite on desktop" /></a>
</center><br /><br />

This module is fully writen in Javascript native. No need to import an additional librairy like jQuery or Handlebars. #YouMightNotNeedJquery<br />

## Demo

Online demo is available on the [vLite website](https://vlite.bitbucket.io/demo).

## Installation

The plugin is available as the `vlitejs` package name on [npm](https://www.npmjs.com/package/vlitejs) and [Github](https://github.com/yoriiis/vlitejs).


```
npm i --save-dev vlitejs
```
```
yarn add --dev vlitejs
```

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

## Browsers support

The project is fully compatible with the most popular web browser. More information about the HTML5 video support <a href="https://caniuse.com/#feat=video" target="_blank" title="Browser support">here</a>.

## Licences

`vLitejs` is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@yoriiis](http://github.com/yoriiis).