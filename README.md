<br /><p align="center">
    <a href="https://yoriiis.github.io/vlitejs" title="vLitejs">
        <img src="https://yoriiis.github.io/vlitejs/images/logo-vlite.svg" alt="vLitejs" width="200px" />
    </a>
</p><br /><br />
<p align="center">
    <img alt="TravisCI" src="https://img.shields.io/badge/vLitejs-v3.0.2-ff7f15.svg?style=for-the-badge">
    <a href="https://travis-ci.com/yoriiis/vlitejs">
        <img alt="TravisCI" src="https://img.shields.io/travis/yoriiis/vlitejs?style=for-the-badge">
    </a>
    <img alt="npm" src="https://img.shields.io/npm/v/vlitejs?style=for-the-badge">
    <img alt="Node.js" src="https://img.shields.io/node/v/vlitejs?style=for-the-badge">
    <a href="https://gitter.im/vlitejs/vlitejs">
        <img alt="Support" src="https://img.shields.io/gitter/room/yoriiis/vlitejs?color=%2345cba1&style=for-the-badge">
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

## The new smallest Javascript video library

vLitejs is a **fast** and **lightweight** Javascript library to customize and skin native HTML5 video and Youtube video. Only **5Kb** on production with gzip, vLitejs has no dependency with any framework or library and is write in **Javascript native**.<br /><br />

<p align="center">
    <a href="https://yoriiis.github.io/vlitejs/demo" title="vLitejs demo">
        <img src="https://yoriiis.github.io/vlitejs/images/demo.jpg" alt="vLitejs demo" width="500px" />
    </a>
</p>

## Installation

The plugin is available as the `vlitejs` package name on [npm](https://www.npmjs.com/package/vlitejs).

```
npm i --save-dev vlitejs
```
```
yarn add --dev vlitejs
```

## Demo

Online demo is available on [yoriiis.github.io/vlitejs/demo](https://yoriiis.github.io/vlitejs/demo).

The project includes also several examples of vLitejs implementation.

## How it works
HTML5 and Youtube video players use the same minimalist structure with native HTML5 `<video>` tag.

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

### Options

Each video players has its own options object. For more flexibility, vLitejs accepts two possibilities for passed them. Available options are available on the [vLitejs website](https://yoriiis.github.io/vlitejs).

#### Options in HTML

```html
<video id="player"
    data-options='{"autoplay": false, "controls": true}'>
</video>
```

```javascript
new vlitejs({
    selector: '#player'
});
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

## Browsers support

The project is fully compatible with the most popular web browsers. More information about the HTML5 video support on <a href="https://caniuse.com/#feat=video" target="_blank" title="Video element - Can I use">Can I Use</a>. HTML and CSS files are W3C valid.

## Licence

vLitejs and his documentation are licensed under the [MIT License](http://opensource.org/licenses/MIT).<br />
Created with ♥ by [@yoriiis](http://github.com/yoriiis).

## Contributors

Many thanks to Maxime LEROUGE for its contribution and <a href="https://www.behance.net/victorshm" target="_blank" title="Victor Schirm">Victor Schirm</a> for the vLitejs logo 👍
