# Plugin: IMA

Supports for Google IMA SDK.

> [!NOTE]
> The `playsinline` player option is required for iOS.

## Overview

| <!-- -->         | <!-- -->                      |
| ---------------- | ----------------------------- |
| Name             | `ima`                         |
| Path             | `vlitejs/plugins/ima`         |
| Entry point      | `vlitejs/plugins/ima/ima.js`  |
| Stylesheet       | `vlitejs/plugins/ima/ima.css` |
| Provider&sup2;   | `'html5'`                     |
| Media type&sup3; | `'video'`                     |

## Usage

### HTML

```html
<video id="player" src="<path_to_video_mp4>"></video>
```

### JavaScript

```js
import 'vlitejs/vlite.css';
import 'vlitejs/plugins/ima.css';
import Vlitejs from 'vlitejs';
import VlitejsIma from 'vlitejs/plugins/ima.js';

Vlitejs.registerPlugin('ima', VlitejsIma, {
  adTagUrl: '<your_ad_tag_url>' // Required by Google IMA SDK
});

new Vlitejs('#player', {
  plugins: ['ima']
});
```

## Events

The plugin exposes the following native `CustomEvent` on the `.v-vlite` element. Access to event data can be obtained through the `event.detail` property. See the [event documentation](../../../README.md#Events).

| Event Type   | Description                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `adsloader`  | Sent when the [AdsLoader](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsLoader) is initialized   |
| `adsrequest` | Sent when the [AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest) is initialized |
| `adsmanager` | Sent when the [AdsManager](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsManager) is initialized |

## Configuration

The plugin allows customization with an optional object as the third parameter of the `registerPlugin` function.

| Event Type             |    Type    |            Default            | Description                                                                                                                                                                                                  |
| ---------------------- | :--------: | :---------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `adTagUrl`             |  `String`  |             `''`              | Specify the **required** ad tag URL that is requested from the ad server. See the [IMA sample tags](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/tags)                    |
| `adTimeout`            |  `Number`  |            `5000`             | If the ads take too long to load, the ads are canceled and the video plays automatically                                                                                                                     |
| `adsRenderingSettings` |  `Object`  | `DefaultAdsRenderingSettings` | Customize the ads rendering settings. See the [AdsRenderingSettings](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRenderingSettings) reference |
| `updateImaSettings`    | `Function` |          `() => {}`           | Update the Google IMA settings. The `imaSettings` property is exposed as a parameter                                                                                                                         |
| `debug`                | `Boolean`  |            `false`            | Load the debug version of IMA SDK                                                                                                                                                                            |

### `DefaultAdsRenderingSettings`

```json
{
  "restoreCustomPlaybackStateOnAdBreakComplete": true,
  "enablePreloading": true,
  "uiElements": ["adAttribution", "countdown"]
}
```

## SDK documentation

See the [Google IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side) documentation.
