# Provider API

The provider's API allows you to extends the capabilities of `vLitejs` to providers other than the HTML5 video or audio player. Youtube and Vimeo are available in the project and can be loaded on demand with the API.

## Available providers

| Name      | Global name             | Path                        | Description                                                                                   |
| --------- | ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------- |
| `youtube` | `window.VlitejsYoutube` | `vlitejs/providers/youtube` | [Youtube player API](https://developers.google.com/youtube/iframe_api_reference) capabilities |
| `vimeo`   | `window.VlitejsVimeo`   | `vlitejs/providers/vimeo`   | [Vimeo player SDK](https://developer.vimeo.com/player/sdk/basics) capabilities                |

## Register a provider

Before using any provider other than `html5`, you need to register it in `vLitejs`.

The documentation below uses the Youtube provider as an example but the operation is the same for Vimeo and other providers. Only the provider name and the library name change.

Import `vlitejs` then the provider with the following path: `vlitejs/providers/<PROVIDER_NAME>`.

```js
import 'vlitejs/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsYoutube from 'vlitejs/providers/youtube';
```

You can also download it and include it with a script tag. The library will be registered as the global variable `window.Vlitejs` and the provider as `window.VlitejsYoutube`.

```html
<link href="https://cdn.jsdelivr.net/npm/vlitejs@4/dist/vlite.css" rel="stylesheet" crossorigin />
<script src="https://cdn.jsdelivr.net/npm/vlitejs@4/dist/vlite.js" crossorigin></script>
<script src="https://cdn.jsdelivr.net/npm/vlitejs@4/dist/providers/youtube.js" crossorigin></script>
```

Then, register the provider to `vLitejs`.

```js
Vlitejs.registerProvider('youtube', VlitejsYoutube);
```

Finally, add the provider to the constructor.

```js
new Vlitejs({
  selector: '#player',
  provider: 'youtube'
});
```

> The name of the provider declared as the first parameter of the `registerProvider` function should correspond to the value of the `provider` parameter in the constructor.

## Create a provider

The Provider API allows you to create other providers than those referenced by `vLitejs`.

To start your new provider development, you can use the [sample-provider.js](https://github.com/yoriiis/vlitejs/blob/main/src/providers/sample/sample-provider.js) file which is made for you. You can also get inspiration from the [youtube.ts](https://github.com/yoriiis/vlitejs/blob/main/src/providers/youtube.ts) and [vimeo.ts](https://github.com/yoriiis/vlitejs/blob/main/src/providers/vimeo.ts) provider files.

### Rules

Here are some points to help you in your development:

- The provider should be an ES6 JavaScript class that extends the `Vlitejs.Player` class or `window.Vlitejs.Player` if the library is loaded in HTML.
- The library should be available before the provider.
- The `sample-provider.js` exposes all the necessary functions, do not rename or remove them because `vLitejs` will not recognize them.
- The `init` function is automatically called by `vLitejs` to initialize the provider.
- Call the `super.onPlayerReady()` function when the player is ready (the function is exposed by the parent class).
- Replace the content of the following functions with the appropriate code for the new provider (except `init` and `waitUntilVideoIsReady`).

### Methods

| Method                    | Parameters |  Promise  | Description                                       |
| ------------------------- | :--------: | :-------: | ------------------------------------------------- |
| `init()`                  |     -      |     -     | Initialize the provider                           |
| `waitUntilVideoIsReady()` |     -      | `Promise` | Wait until the player is ready and the API loaded |
| `initPlayer()`            |     -      | `Promise` | Initialize the player                             |
| `getVolume()`             |     -      |     -     | Get the volume                                    |
| `getInstance()`           |     -      |     -     | Get the player instance                           |
| `getCurrentTime()`        |     -      | `Promise` | Get the current time                              |
| `getDuration()`           |     -      | `Promise` | Get the duration                                  |
| `methodPlay()`            |     -      |     -     | Method to play                                    |
| `methodPause()`           |     -      |     -     | Method to pause                                   |
| `methodMute()`            |     -      |     -     | Method to mute                                    |
| `methodUnMute()`          |     -      |     -     | Method to unmute                                  |
| `methodSeekTo(time)`      |  `Number`  |     -     | Method to seek to a current time is seconds       |
| `removeInstance()`        |     -      |     -     | Remove the player instance                        |

### API and queue

Providers typically use an API/SDK. The provider file should load it and process the initialization queue.

There are two possible scenario:

- The API is already available: initialize the player (`initPlayer()`)
- The API is not available: push the instance into the queue (`providerQueue`)

At the end of the sample file, the queue is processed and each player initialized. Then call the `super.onPlayerReady()` function when the player is ready.
