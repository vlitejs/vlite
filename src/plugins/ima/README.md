# Plugin: Cast

Supports for Google IMA SDK.

## Overview

| <!-- -->          | <!-- -->                           |
| ----------------- | ---------------------------------- |
| Name              | `ima`                              |
| Global name&sup1; | `window.VlitejsIma`                |
| Path              | `vlitejs/dist/plugins/ima`         |
| Entry point       | `vlitejs/dist/plugins/ima/ima.js`  |
| Stylesheet        | `vlitejs/dist/plugins/ima/ima.css` |
| Provider&sup2;    | `'html5'`                          |
| Media type&sup3;  | `'video'`                          |

- _&sup1; Useful only if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._
- _&sup2;Providers: `html5|youtube|vimeo`_
- _&sup3;Media type: `video|audio`_

## Usage

### HTML

```html
<video id="player" class="vlite-js" src="<path_to_video_mp4>"></video>
```

### JavaScript

```js
import 'vlitejs/dist/vlite.css';
import 'vlitejs/dist/plugins/ima.css';
import Vlitejs from 'vlitejs';
import VlitejsIma from 'vlitejs/dist/plugins/ima';

Vlitejs.registerPlugin('ima', VlitejsIma, {
  adTagUrl: '<your_ad_tag_url>' // Required by Google IMA SDK
});

new Vlitejs('#player', {
  plugins: ['ima']
});
```

## Events

The plugin exposes the following native `CustomEvent` on the `.v-vlite` element. Access to event data can be obtained through the `event.detail` property.

| Event Type   | Description                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `adsloader`  | Sent when the [AdsLoader](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsLoader) is initialized   |
| `adsrequest` | Sent when the [AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest) is initialized |
| `adsmanager` | Sent when the [AdsManager](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsManager) is initialized |

## Configuration

[Locale codes](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/localization#locale-codes)
[IMA sample tags](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/tags)

## SDK documentation

See the [Google IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side) documentation.
