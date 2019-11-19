title: Available methods - vLitejs
description: The framework includes multiple methods to controls the video such as play, pause, seekTo, getInstance, requestFullscreen, exitFullscreen and destroy

Each players instantiation return the player instance in parameter of the callback function __when the player is ready__ (Youtube and HTML5).

Below, the list of available methods to easily manipulate the player.

## `play`

Trigger a play event to the video.

```javascript
new vlitejs({
    callback: (player) => {
        player.play();
    }
});
```

## `pause`

Trigger a pause event to the video.

```javascript
new vlitejs({
    callback: (player) => {
        player.pause();
    }
});
```

## `seekTo`

`float || integer`

Change the current time of the video. The function accept one parameter, the time in seconds.

```javascript
new vlitejs({
    callback: (player) => {
        player.seekTo(20);
    }
});
```

## `getCurrentTime`

`float || integer`

Return the current time of the video in seconds.

```javascript
new vlitejs({
    callback: (player) => {
        var currentTime = player.getCurrentTime();
    }
});
```

## `getDuration`

`float || integer`

Return the duration of the video in seconds.

```javascript
new vlitejs({
    callback: (player) => {
        var duration = player.getDuration();
    }
});
```

## `getInstance`

`object`

Return the instance of the video.

* `HTML5` - the function return the video element
* `Youtube` - the function return the instance of Youtube API for the current player

```javascript
new vlitejs({
    callback: (player) => {
        var instance = player.getInstance();
    }
});
```

## `requestFullscreen`

Request the native fullscreen event for the brower. The function must be called on user event (click for example) to prevent error on touch devices that requires user action.

!!! tip "Youtube fullscreen API ✔"
    By default, Youtube do not make available fullscreen in their API, but vLitejs do it for you.<br />
    Thanks to vLitejs framework, the native fullscreen API is available with Youtube and HTML5 video player.

```javascript
var button = document.querySelector('.button');
new vlitejs({
    callback: (player) => {
        button.addEventListener('click', function(e){
            e.preventDefault();
            player.requestFullscreen();
        });
    }
});
```

## `exitFullscreen`

Request the native exit of the fullscreen event of the browser. The function must be called on user event (click for example).

!!! tip "Youtube fullscreen API ✔"
    Also available with the Youtube video player.

```javascript
var button = document.querySelector('.button');
new vlitejs({
    callback: (player) => {
        button.addEventListener('click', function(e){
            e.preventDefault();
            player.exitFullscreen();
        });
    }
});
```

## `destroy`

Trigger a destroy event to remove all created events and instance (HTML5 video or Youtube video) of the current video player.

!!! tip "Optimized for your application ✔"
    Each Javascript framework should make available a destroy method to clean all events, variables and HTML created by himself when the user requests it.<br /><br />
    vLitejs has its own destroy method which destroy everything that's necessary for each specific video player.

```javascript
var button = document.querySelector('.button');
new vlitejs({
    callback: (player) => {
        buton.addEventListener('click', function(e){
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