# Plugin API

The plugin's API allows you to extends the capabilities of `vLitejs` and add custom functionnalities.

## Available plugins

Each plugin can be loaded on demand with the API.

| Plugin name                           | Description                                |
| ------------------------------------- | ------------------------------------------ |
| [Subtitle](./subtitle/README.md)      | Supports for multiple caption tracks (VTT) |
| [Picture-in-Picture](./pip/README.md) | Supports for picture-in-picture mode       |
| [Volume bar](./volume-bar/README.md)  | Supports for volume bar                    |
| [Cast](./cast/README.md)              | Supports for Google Cast API               |
| [AirPlay](./airplay/README.md)        | Supports for Apple AirPlay API             |
| [Ima](./ima/README.md)                | Supports for Google IMA SDK                |

## Create a custom plugin

The Plugin API allows you to create other plugins than those referenced by `vLitejs`.

To start your new plugin development, you can use the [sample-plugin.js](https://github.com/vlitejs/vlite/blob/main/src/plugins/sample/sample-plugin.js) file which is made for you. You can also get inspiration from the [subtitle.ts](https://github.com/vlitejs/vlite/blob/main/src/plugins/subtitle.ts) and [pip.ts](https://github.com/vlitejs/vlite/blob/main/src/plugins/pip.ts) plugin files.

### Rules

Here are some points to help you in your development:

- The plugin should be an ES6 JavaScript class.
- The `init` function is automatically called by `vLitejs` to initialize the plugin.
- The `onReady` function is automatically called by `vLitejs` when the player is ready.

### Methods

| Method      | Parameters | Promise | Description                       |
| ----------- | :--------: | :-----: | --------------------------------- |
| `init()`    |     -      |    -    | Initialize the plugin             |
| `onReady()` |     -      |    -    | Run code when the player is ready |

### Constructor parameters

`vLitejs` will automatically expose on the plugin constructor the player instance in the `player` variable to allow you full access to the player. The player instance gives access to the following data:

| Arguments             |      Type       | Description                                         |
| --------------------- | :-------------: | --------------------------------------------------- |
| `player.media`        |  `HTMLElement`  | Media element                                       |
| `player.elements`     |    `Objects`    | Player HTML elements                                |
| `player.options`      |    `Object`     | [Player options](../../README.md#Options)           |
| `player.isFullScreen` |    `Boolean`    | Is the player in fullscreen mode                    |
| `player.isMuted`      |    `Boolean`    | Is the player muted                                 |
| `player.isPaused`     | `null\|Boolean` | Is the player paused (`null` before the first play) |
| `player.isTouch`      |    `Boolean`    | Is touch device                                     |
| `player.type`         |    `String`     | Player type (`video\|audio`)                        |
| `player.plugins`      |    `Object`     | List of plugins instances                           |
| `player.Vlitejs`      |     `Class`     | `vLitejs` instance                                  |
| `player.controlBar`   |     `Class`     | `controlBar` instance                               |

### Provider and media declaration

Each plugin must declare with which provider it is compatible and for which type of media (`video|audio`) with the public instance field.

Example of the subtitle plugin compatible with the HTML5 video:

```js
class Subtitle {
  providers = ['html5']; // 'html5|youtube|vimeo'
  types = ['video']; // video|audio'
}
```
