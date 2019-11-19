<p align="center">
    <img alt="TravisCI" src="https://img.shields.io/badge/vLitejs-v3.0.0-ffb300.svg?style=for-the-badge">
    <a href="https://travis-ci.com/yoriiis/vlitejs">
        <img alt="TravisCI" src="https://img.shields.io/travis/yoriiis/vlitejs?style=for-the-badge">
    </a>
    <img alt="Support" src="https://img.shields.io/npm/v/vlitejs?style=for-the-badge">
    <img alt="Support" src="https://img.shields.io/node/v/vlitejs?style=for-the-badge">
    <a href="https://gitter.im/vlitejs/vlitejs">
        <img alt="Support" src="https://img.shields.io/gitter/room/vlitejs/vlitejs?style=for-the-badge">
    </a>
    <a href="https://bundlephobia.com/result?p=fela@latest">
        <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/vlitejs?style=for-the-badge">
    </a>
    <a href="https://npmjs.com/package/chunks-webpack-plugin">
        <img alt="Npm downloads" src="https://img.shields.io/npm/dm/vlitejs?color=fb3e44&label=npm%20downloads&style=for-the-badge">
    </a>
</p>

<p align="center">
    <strong>Visit <a href="https://yoriiis.github.io/vlitejs" title="yoriiis.github.io/vlitejs">yoriiis.github.io/vlitejs</a> to get started with vLitejs.</strong>
</p>

---

# vLitejs

## The new smallest Javascript video library

vLite.js is a **fast** and **lightweight** Javascript library to customize and skin native HTML5 video and Youtube video. Only **5Kb** on production with Gzip, vLite.js has no dependency with any framework or library and is write in **Javascript native**.<br /><br />

<p align="center">
    <a href="https://yoriiis.github.io/vlitejs/demo" title="vLitejs demo" target="_blank">
        <img src="https://yoriiis.github.io/vlitejs/img/demo.jpg" alt="vLitejs on desktop" />
    </a>
</p>

## Installation

The plugin is available as the `vlitejs` package name on [npm](https://www.npmjs.com/package/vlitejs) and [Github](https://github.com/yoriiis/vlitejs).

```
npm i --save-dev vlitejs
```
```
yarn add --dev vlitejs
```

## Demo

Online demo is available on [vLitejs](https://yoriiis.github.io/vlitejs/demo).

## How it works

#### HTML5 video

```html
<video id="{{idSelector}}"
    class="vlite-js">
</video>
```

### Youtube video

```html
<video id="{{idSelector}}"
    class="vlite-js"
    data-youtube-id="{{videoId}">
</video>
```

### Options

Each players has its own object of options. By default, vLitejs use default value of these options like the list below. For more flexibility, vLitejs accepts two possibilities for passed them.

#### Options in the HTML

```html
<video id="{{idSelector}}"
    class="vlite-js"
    data-options='{"poster": "poster.jpg", "controls": true}'>
</video>
```

```javascript
var player = new vLite({
    selector: '#player'
});
```

#### Option in the Javascript constructor

```html
<video id="{{idSelector}}"
    class="vlite-js">
</video>
```

```javascript
var player = new vLite({
    selector: '#player',
    options: {
        "controls": true,
        "poster": "poster.jpg"
    }
});
```

## Browsers support

The project is fully compatible with the most popular web browser. More information about the HTML5 video support <a href="https://caniuse.com/#feat=video" target="_blank" title="Browser support">here</a>.

## Licences

`vLitejs` is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@yoriiis](http://github.com/yoriiis), If you like the project, like it on Github please :)
