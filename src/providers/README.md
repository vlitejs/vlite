# Provider API

The provider's API allows you to extends the capabilities of `vLitejs` to providers other than the HTML5 video or audio player.

## Available providers

Each provider can be loaded on demand with the API.

| Name                                  | Description                        |
| ------------------------------------- | ---------------------------------- |
| [Youtube](./youtube/README.md)        | Support for Youtube player API     |
| [Vimeo](./vimeo/REDME.md)             | Support for Vimeo player SDK       |
| [Dailymotion](./dailymotion/REDME.md) | Support for Dailymotion player API |

## Create a custom provider

The Provider API allows you to create other providers than those referenced by `vLitejs`.

To start your new provider development, you can use the [sample-provider.js](https://github.com/vlitejs/vlite/blob/main/src/providers/sample/sample-provider.js) file which is made for you. You can also get inspiration from the [youtube.ts](https://github.com/vlitejs/vlite/blob/main/src/providers/youtube.ts) and [vimeo.ts](https://github.com/vlitejs/vlite/blob/main/src/providers/vimeo.ts) provider files.

### Rules

Here are some points to help you in your development:

- The provider file should return a function that take as parameter `Player`.
- The function should return an ES6 JavaScript class that extends the `Player` parameter returned by the parent function.
- `vLitejs` should be available before the provider import.
- The `sample-provider.js` exposes all the necessary functions, do not rename or remove them because `vLitejs` will not recognize them.
- The `init` function is automatically called by `vLitejs` to initialize the provider.
- Call the `super.onReady()` function when the player is ready (the function is exposed by the parent class).
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

At the end of the sample file, the queue is processed and each player initialized. Then call the `super.onReady()` function when the player is ready.
