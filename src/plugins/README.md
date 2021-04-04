# Plugin API

## Register a plugin

First, import `vlitejs` and the plugin with the following path: `vlitejs/plugins/<PLUGIN_NAME>`. Plugins usually have CSS files, you can load them too.

```js
import 'vlitejs/plugins/subtitle.css';
import vlitejs from 'vlitejs';
import vlitejsSubtitle from 'vlitejs/plugins/subtitle';
```

Then, register the plugin to `vLitejs`.

```js
vlitejs.registerPlugin('subtitle', vlitejsSubtitle);
```

Finally, add the plugin to the constructor.

```js
new vlitejs({
  selector: '#player',
  plugins: ['subtitle']
});
```

> The name of the plugin declared as the first parameter of the `registerPlugin` function must correspond to the value of the `plugin` parameter in the constructor.

## Available plugins

| Plugin name | Path                       | Description                                |
| ----------- | -------------------------- | ------------------------------------------ |
| `subtitle`  | `vlitejs/plugins/subtitle` | Supports for multiple caption tracks (VTT) |
| `pip`       | `vlitejs/plugins/pip`      | Supports for picture-in-picture mode       |

## Create a plugin

The Plugin API allows you to create other plugins than those referenced by `vLitejs`.

To start your new plugin development, you can use the [sample-plugin.js](https://github.com/yoriiis/vlitejs/blob/main/src/providers/sample-plugin.js) file which is made for you. You can also get inspiration from the [subtitle.ts](https://github.com/yoriiis/vlitejs/blob/main/src/plugins/subtitle.ts) and [pip.ts](https://github.com/yoriiis/vlitejs/blob/main/src/plugins/pip.ts) plugin files.

The plugin needs to be an ES6 JavaScript class. `vLitejs` will automatically expose on the plugin constructor an object with the player instance. The `init` function is called by `vLitejs` to initialize the plugin.

```js
export default class SamplePlugin {
  constructor({ player }) {}

  init() {
    // The plugin is initialize
  }
}
```
