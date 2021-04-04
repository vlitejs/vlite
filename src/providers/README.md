# Provider API

## Register a provider

First, import `vlitejs` and the provider with the following path: `vlitejs/providers/<PROVIDER_NAME>`.

```js
import 'vlitejs/vlite.css';
import vlitejs from 'vlitejs';
import vlitejsYoutube from 'vlitejs/providers/youtube';
```

Then, register the provider to `vLitejs`.

```js
vlitejs.registerProvider('youtube', vlitejsYoutube);
```

Finally, add the provider to the constructor.

```js
new vlitejs({
  selector: '#player',
  provider: 'youtube'
});
```

> The name of the provider declared as the first parameter of the `registerProvider` function must correspond to the value of the `provider` parameter in the constructor.

## Available providers

| Provider name | Path                        | Description                                                                                   |
| ------------- | --------------------------- | --------------------------------------------------------------------------------------------- |
| `youtube`     | `vlitejs/providers/youtube` | [Youtube player API](https://developers.google.com/youtube/iframe_api_reference) capabilities |
| `vimeo`       | `vlitejs/providers/vimeo`   | [Vimeo player SDK](https://developer.vimeo.com/player/sdk/basics) capabilities                |

## Create a provider

The Provider API allows you to create other providers than those referenced by `vLitejs`.

To start your new provider development, you can use the [sample-provider.js](https://github.com/yoriiis/vlitejs/blob/main/src/providers/sample-provider.js) file which is made for you. You can also get inspiration from the [youtube.ts](https://github.com/yoriiis/vlitejs/blob/main/src/providers/youtube.ts) and [vimeo.ts](https://github.com/yoriiis/vlitejs/blob/main/src/providers/vimeo.ts) provider files.

The provider needs to be an ES6 JavaScript class that extends the `vlitejs.Player` class or `window.vlitejs.Player` if the library is loaded in HTML. In all cases, the library needs to be available.

The `init` function is called by `vLitejs` to initialize the provider. The function `init` needs:

- To return a Promise which return the context of the player `this`
- Call the `onPlayerReady` when the player is ready (the function is exposed by the parent class)

TODO: detail others functions?

Providers usually use an API / SDK, the provider file needs to load it and process the initialization queue.

And finally, have fun!
