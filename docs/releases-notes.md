title: Releases notes - vLite.js
description: vLite.js changelog

# Release notes

## Changelog

### 2.0.1 <small>| February 02, 2019</small>

* Add playsinline support
* Add fast-forward when user click on the left/right area on the video (+ or - 10s) only on no touch devices
* Optimize unBindEvents function
* Fix native control for touch bug

### 2.0.0 <small>| December 16, 2018</small>

* Add prefix `.vl-` before all CSS classes use by vLite to prevent conflicts
* Add keyboard shortcut (spacebar) to control the video
* Add option `autoHide` to hide the control bar if the user is inactive
* Add loader linked to `seeking` and `seeked` events

### 1.1.2 <small>| December 16, 2018</small>

* Add progress bar hover and transition
* Prevent click catch by Youtube iframe which block vLite click
* `fullscreen` option on Youtube player can be use with `nativeControlsForTouch` option

### 1.1.1 <small>| April 28, 2018</small>

* Add UMD (Universal Module Definition) compatibility
* Add package `vlitejs` on [npm](https://www.npmjs.com/package/vlitejs)

### 1.1.0 <small>| April 21, 2018</small>

* Add Javascript Promise for check if the video HTML5 is ready
* Add `nativeControlsForTouch` to keep native controls on touch devices
* Possibility to add options for the video by the DOM with the data attribute `data-options` or by the constructor. The priority will be given to options pass by the data attribute `data-options` in the DOM.

### 1.0.0 <small>| December 11, 2017</small>

* Initial release

<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'vlitejs/vlitejs'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>