title: Available methods - vlite.js
description: The framework includes multiple methods to controls the video such as play, pause, seekTo, getInstance, requestFullscreen, exitFullscreen and destroy

Each players instanciation return the instance in parameter of the callback function __when the player is ready__ (Youtube and HTML5). There are available methods to easily manipulate the player.

## Play

The `play()` function trigger a play event to the video.

```javascript
var player = new vLite({
    selector: '#player-1',
    callback: (player) => {
        player.play();
    }
});
```

## Pause

The `pause()` function trigger a pause event to the video.

```javascript
var player = new vLite({
    selector: '#player-1',
    callback: (player) => {
        player.pause();
    }
});
```

## Seek to

The `seekTo()` function change the current time of the video. The function accept one parameter, the time in seconds.

```javascript
var player = new vLite({
    selector: '#player-1',
    callback: (player) => {
        player.seekTo(20);
    }
});
```

## Get the current time

The `getCurrentTime()` function return the current time of the video in seconds.

```javascript
var player = new vLite({
    selector: '#player-1',
    callback: (player) => {
        var currentTime = player.getCurrentTime();
    }
});
```

## Get the duration

The `getDuration()` function return the duration of the video in seconds.

```javascript
var player = new vLite({
    selector: '#player-1',
    callback: (player) => {
        var duration = player.getDuration();
    }
});
```

## Get the instance

The `getInstance()` function return the instance of the video. With HTML5 native video, the function return the video element. With Youtube video, the function return the instance of Youtube API for the current player.

```javascript
var player = new vLite({
    selector: '#player-1',
    callback: (player) => {
        var instance = player.getInstance();
    }
});
```

## Request fullscreen

The `requestFullscreen()` function request the native fullscreen event for the brower. The function must be called on user event (click for example) to prevent error on touch devices that requires user action.

!!! tip "Youtube fullscreen API ✔"
    By default, Youtube do not make available fullscreen in their API, but vLite do it for you.<br />
    Thanks to vLite framework, the native fullscreen API is available with Youtube and HTML5 video player.

```javascript
var button = document.querySelector('.button');
var player = new vLite({
    selector: '#player-1',
    callback: (player) => {
        button.addEventListener('click', function(e){
            e.preventDefault();
            player.requestFullscreen();
        });
    }
});
```

## Exit fullscreen

The `exitFullscreen()` function request the native exit of the fullscreen event of the browser. The function must be called on user event (click for example).

!!! tip "Youtube fullscreen API ✔"
    Also available with the Youtube video player.

```javascript
var button = document.querySelector('.button');
var player = new vLite({
    selector: '#player-1',
    callback: (player) => {
        button.addEventListener('click', function(e){
            e.preventDefault();
            player.exitFullscreen();
        });
    }
});
```

## Destroy

The `destroy()` function trigger a destroy event to remove all created events and instance (HTML5 video and Youtube video) of the current video player.

!!! tip "Optimized for your application ✔"
    Each Javascript framework should make available a destroy method to clean all events, variables and HTML created by himself when the user requests it.<br /><br />
    vLite has its own destroy method which destroy everything that's necessary for each specific video player.

```javascript
var button = document.querySelector('.button');
var player = new vLite({
    selector: '#player-1',
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