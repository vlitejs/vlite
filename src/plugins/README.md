# Plugin API

The plugin's API allows you to extends the capabilities of `vLitejs` and add custom functionnalities. Subtitle and Picture-in-Picture are available in the project and can be loaded on demand with the API.

## Available plugins

| Plugin name | Global name              | Path                       | Provider&sup1; | Media type&sup2; | Description                                |
| ----------- | ------------------------ | -------------------------- | :------------: | :--------------: | ------------------------------------------ |
| `subtitle`  | `window.VlitejsSubtitle` | `vlitejs/plugins/subtitle` |    `html5`     |     `video`      | Supports for multiple caption tracks (VTT) |
| `pip`       | `window.VlitejsPip`      | `vlitejs/plugins/pip`      |    `html5`     |     `video`      | Supports for picture-in-picture mode       |

- _&sup1;Providers: `html5|youtube|vimeo`_
- _&sup2;Media type: `video|audio`_

## Register a plugin

Before using any plugin, you need to register it in `vLitejs`.

The documentation below uses the Subtitle plugin as an example but the operation is the same for picture-in-picture and other plugins. Only the plugin name and the library name change.

Import `vlitejs` then the plugin with the following path: `vlitejs/plugins/<PLUGIN_NAME>`. If the plugin has a stylesheet, load it also.

```js
import 'vlitejs/vlite.css';
import 'vlitejs/plugins/subtitle.css';
import Vlitejs from 'vlitejs';
import VlitejsSubtitle from 'vlitejs/plugins/subtitle';
```

You can also download it and include it with a script tag. The library will be registered as the global variable `window.Vlitejs` and the provider as `window.VlitejsPip`.

<!-- prettier-ignore -->
```html
<link href="https://cdn.jsdelivr.net/npm/vlitejs@4/dist/vlite.css" rel="stylesheet" crossorigin />
<link href="https://cdn.jsdelivr.net/npm/vlitejs@4/dist/vlitejs/plugins/subtitle.css" rel="stylesheet" crossorigin />
<script src="https://cdn.jsdelivr.net/npm/vlitejs@4/dist/vlite.js" crossorigin></script>
<script src="https://cdn.jsdelivr.net/npm/vlitejs@4/dist/plugins/subtitle.js" crossorigin></script>
```

Then, register the plugin to `vLitejs`.

```js
Vlitejs.registerPlugin('subtitle', VlitejsSubtitle);
```

Finally, add the plugin to the constructor.

```js
new Vlitejs({
  selector: '#player',
  plugins: ['subtitle']
});
```

> The name of the plugin declared as the first parameter of the `registerPlugin` function should correspond to the value of the `plugins` parameter in the constructor.

## Create a plugin

The Plugin API allows you to create other plugins than those referenced by `vLitejs`.

To start your new plugin development, you can use the [sample-plugin.js](https://github.com/yoriiis/vlitejs/blob/main/src/providers/sample/sample-plugin.js) file which is made for you. You can also get inspiration from the [subtitle.ts](https://github.com/yoriiis/vlitejs/blob/main/src/plugins/subtitle.ts) and [pip.ts](https://github.com/yoriiis/vlitejs/blob/main/src/plugins/pip.ts) plugin files.

### Rules

Here are some points to help you in your development:

- The plugin should be an ES6 JavaScript class.
- The `init` function is automatically called by `vLitejs` to initialize the plugin.

### Methods

| Method   | Parameters | Promise | Description           |
| -------- | :--------: | :-----: | --------------------- |
| `init()` |     -      |    -    | Initialize the plugin |

### Constructor parameters

`vLitejs` will automatically expose on the plugin constructor the player instance in the `player` variable to allow you full access to the player. The player instance gives access to the following data:

| Arguments             |      Type       | Description                                         |
| --------------------- | :-------------: | --------------------------------------------------- |
| `player.element`      |  `HTMLElement`  | Media element                                       |
| `player.container`    |  `HTMLElement`  | Container of the media element                      |
| `player.options`      |    `Object`     | [Player options](../../README.md#Player-options)    |
| `player.isFullScreen` |    `Boolean`    | Is the player in fullscreen mode                    |
| `player.isMuted`      |    `Boolean`    | Is the player muted                                 |
| `player.isPaused`     | `null\|Boolean` | Is the player paused (`null` before the first play) |
| `player.Vlitejs`      |     `Class`     | `vLitejs` instance                                  |

### Provider and media declaration

Each plugin must declare with which provider it is compatible and for which type of media (`video|audio`) with the public instance field.

Example of the subtitle plugin only compatible with the HTML5 video:

```js
class Subtitle {
  providers = ['html5']; // 'html5|youtube|vimeo'
  types = ['video']; // video|audio'
}
```
