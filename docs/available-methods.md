title: Available methods - vLitejs
description: vLitejs includes multiple methods to controls the video such as play, pause, seekTo, getInstance, requestFullscreen, exitFullscreen and destroy

Each video players instantiation return the player instance in parameter of the onReady function __when the player is ready__ (Youtube and HTML5).

Below, the list of available methods to easily manipulate the video player.

## `play`

Trigger a play event to the video.

```javascript
new vlitejs({
    onReady: (player) => {
        player.play();
    }
});
```

## `pause`

Trigger a pause event to the video.

```javascript
new vlitejs({
    onReady: (player) => {
        player.pause();
    }
});
```

## `seekTo`

`parameters: float || integer`

Change the current time of the video (seconds).

```javascript
new vlitejs({
    onReady: (player) => {
        player.seekTo(20);
    }
});
```

## `getCurrentTime`

`@return float || integer`

Return the current time of the video (seconds).

```javascript
new vlitejs({
    onReady: (player) => {
        var currentTime = player.getCurrentTime();
    }
});
```

## `getDuration`

`@return float || integer`

Return the duration of the video (seconds).

```javascript
new vlitejs({
    onReady: (player) => {
        var duration = player.getDuration();
    }
});
```

## `getInstance`

`@return object`

Return the instance of the video.

* `HTML5` - Return the video element
* `Youtube` - Return the Youtube API instance of the current video player

```javascript
new vlitejs({
    onReady: (player) => {
        var instance = player.getInstance();
    }
});
```

## `requestFullscreen`

Request the native fullscreen event for the browser. The function must be called on a user event to prevent error on touch devices that requires user action.

!!! tip "Youtube fullscreen API ✔"
    By default, Youtube do not make available fullscreen in their API, but thanks to vLitejs framework, the native fullscreen API is available with HTML5 and Youtube video players.

```javascript
new vlitejs({
    onReady: (player) => {
        document.querySelector('.button').addEventListener('click', function(e) {
            e.preventDefault();
            player.requestFullscreen();
        });
    }
});
```

## `exitFullscreen`

Request the native exit of the fullscreen event of the browser. The function must be called on a user event to prevent error on touch devices that requires user action.

!!! tip "Youtube fullscreen API ✔"
    By default, Youtube do not make available fullscreen in their API, but thanks to vLitejs framework, the native fullscreen API is available with HTML5 and Youtube video players.

```javascript
new vlitejs({
    onReady: (player) => {
        document.querySelector('.button').addEventListener('click', function(e) {
            e.preventDefault();
            player.exitFullscreen();
        });
    }
});
```

## `destroy`

Trigger a destroy event to remove all created events and the instance of the current video player (HTML5 or Youtube).

!!! tip "Optimized for your application ✔"
    For better performance on a webapp, think about destroying the video instance when you no longer need it.

```javascript
new vlitejs({
    onReady: (player) => {
        document.querySelector('.button').addEventListener('click', function(e) {
            e.preventDefault();
            player.destroy();
        });
    }
});
```

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'vlitejs/vlitejs'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>
