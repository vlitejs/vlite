title: Getting started - vLite.js
description: Project includes CSS, font icons and Javascript files. The installation is fast and the video player is easily customizable. Youtube API is automatically loaded

## Installation

The project contains HTML example, CSS files for minimalist design, font files for SVG icons and Javascript files for the library. All Javascripts and CSS files are available minified and unminified version. Install vlitejs with NPM or includes files manually in your project.

### NPM

```shell
npm install vlitejs
```

### Direct tag include

Simply download and include with a script tag. vLitejs will be registered as a global variable.<br />
Don't use the minified version during development. You will miss out on all the nice warnings for common mistakes!

#### Javascripts

The vLite Javascripts files are available in the `./js` folder, it contains three files with each their unminified version. Include the file of your choice in your HTML, before your application.

```html
<script src="js/vlite-html5+youtube.min.js"></script>
```

#### CSS

CSS files to customize the player and controls are available in the `./css` folder, import it directly in your project. Styles includes a small reset CSS from <a href="https://meyerweb.com/eric/tools/css/reset/" target="_blank" title="Reset CSS">Eric Meyer</a>.

```html
<link rel="stylesheet" href="css/vlite.min.css" />
```

#### Font

All icons are managed in SVG for more quality and are automatically included in a small font in the `/fonts` folder. There are two files `vlite.woff` and `vlite.woff2` for browser support. Add them in your project in a folder `/fonts`. If necessary, change the path to the font in the CSS file.

### Versions

Include the file of your choice in your application:

* For Youtube video player
    * `vlite-youtube.min.js`
    * `vlite-youtube.js`
* For native HTML5 video player
    * `vlite-html5.min.js`
    * `vlite-html5.js`
* For native HTML5 video __and__ Youtube video player
    * `vlite-html5+youtube.min.js`
    * `vlite-html5+youtube.js`

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'vlitejs/vlitejs'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>