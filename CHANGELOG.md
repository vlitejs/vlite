# CHANGELOG

## 5.0.1

### Fixes

- Fix Vimeo iframe size ([f142964](https://github.com/vlitejs/vlite/commit/94b2f5a2ecaefaf798598fc065c7fb3e35f82443))

### Updates

- Update sticky plugin providers ([f142964](https://github.com/vlitejs/vlite/commit/dfcd78bf0949525618bf84b4fa8750c4d6ffa94a))

## 5.0.0

### ⚠️ Breaking changes

- Minimum supported `Node.js` version is `16.20.0` ([#97](https://github.com/vlitejs/vlite/pull/97))
- Update HTML ([#99](https://github.com/vlitejs/vlite/pull/99))
  - Remove `vlite-js` CSS classe
  - Remove `v-controlButton` on `v-bigPlay`
  - Add nested container `v-container` for sticky compatibility
- Add css file for PIP plugin ([#90](https://github.com/vlitejs/vlite/pull/90))

### New features

- Add the volume bar plugin ([#90](https://github.com/vlitejs/vlite/pull/90))
- Add the sticky plugin ([#99](https://github.com/vlitejs/vlite/pull/99))

### Updates

- Increase or decrease the volume by 0.1 and fix the round
- Update README.md ([#95](https://github.com/vlitejs/vlite/pull/95), [#96](https://github.com/vlitejs/vlite/pull/96))
- New directory structure ([#98](https://github.com/vlitejs/vlite/pull/98))

### Removes

- Remove animation on volume button ([#90](https://github.com/vlitejs/vlite/pull/90))

### Fixes

- Fix Dailymotion volume ([#90](https://github.com/vlitejs/vlite/pull/90))

## 4.2.0

### New features

- Add the Google IMA SDK plugin ([#77](https://github.com/vlitejs/vlite/pull/77))
- Add the AirPlay plugin ([#82](https://github.com/vlitejs/vlite/pull/82))

### Updates

- Enable `playsinline` by default ([f142964](https://github.com/vlitejs/vlite/commit/f142964e96f451c35a201758924f046143df37a9))
- Call Vlitejs `onReady` function before the plugins `onReady` functions ([7620e16](https://github.com/vlitejs/vlite/commit/7620e16#diff-72c3d7a0754b76d6ad0c31ddbf698d283c13d17a71fe6b07c8a795adac8d4762))
- Use native `aspect-ratio` for player responsive ([b9816bc](https://github.com/vlitejs/vlite/commit/b9816bc2d68246078e73ace363248e5bfa4bc068))
- Disable fullscreen on iPhone (not supported yet) ([49c9567](https://github.com/vlitejs/vlite/commit/49c9567b71216c4214c753742d7c4758dd486d14))

## 4.1.2

### Fixes

- Fix multiple cast instance ([#76](https://github.com/vlitejs/vlite/pull/76))

## 4.1.1

### Fixes

- Fix default values for Cast plugin options ([e0e492e](https://github.com/vlitejs/vlite/commit/e0e492eca03424808f837a9909eaa6937a3da2e1))

## 4.1.0

### New features

- Add the Dailymotion provider ([#73](https://github.com/vlitejs/vlite/pull/73))
- Add the Cast plugin ([#72](https://github.com/vlitejs/vlite/pull/72))

### Fixes

- Fix Youtube seekTo method conflicting with unstarted and unmuted video ([#75](https://github.com/vlitejs/vlite/pull/75))

## 4.0.7

### Fixes

- Fix progress bar height ([#71](https://github.com/vlitejs/vlite/pull/71))

## 4.0.6

### Updates

- Update environment ([#67](https://github.com/vlitejs/vlite/pull/67))

## 4.0.5

### Fixes

- Fix HTML5 event ready when the video is already loaded ([#62](https://github.com/vlitejs/vlite/pull/62))

### New features

- Add the `autoHideDelay` option ([#63](https://github.com/vlitejs/vlite/pull/63))

## 4.0.4

Optimize accessibility ([#58](https://github.com/vlitejs/vlite/pull/58))

### Updates

- Move keydown event to the player element instead of document
- Player has the focus after the big play button click and after the subtitle button (inside the list) click
- Add focus on first subtitle button when the subtitle menu is opened
- Remove keydown restriction on specific tags ([#57](https://github.com/vlitejs/vlite/pull/57))
- Limit keydown actions when the player or children's player has the focus
- Refacto `onKeyDown` function by categories
- Replace `querySelector` by cached elements
- Refacto subtitle click event and use `validateTarget` for event delegation

### Fixes

- Fix auto hide broken with `isPaused`
- Prevent focus to be captured by the iframe
- Fix Youtube progress bar updates on tabulation navigation

## 4.0.3

### Fixes

- Fix provider queue by ([#52](https://github.com/vlitejs/vlite/pull/52))
- Add new issue templates ([#56](https://github.com/vlitejs/vlite/pull/56))
- Fix conflicts between native keyboard shortcuts and HTML form elements ([#57](https://github.com/vlitejs/vlite/pull/57) by @bfiessinger)

## 4.0.2

### Fixes

- Fix README issues ([#43](https://github.com/vlitejs/vlite/pull/43))
- Fix mute option not transferred to the player ([#48](https://github.com/vlitejs/vlite/pull/48))
- Fix play not triggered without the poster ([#49](https://github.com/vlitejs/vlite/pull/49))

## 4.0.1

### Fixes

- Fixed the default parameters and fix the selector `HTMLDivElement` ([#43](https://github.com/vlitejs/vlite/pull/43), [#47](https://github.com/vlitejs/vlite/pull/47))

## 4.0.0

### ⚠ Breaking changes

- Rename `window.vlitejs` to `window.Vlitejs` to make sure the constructor name starts with a capital
- Remove `nativeControlsForTouch` option
- Remove `data-options` HTML attributes in favor of options from the JS constructor
- Supports the latest 2 browsers versions with `.browserslistrc`
- Remove the `dist` directory from GitHub, only available for NPM and CDN

### New features

- New design and new icons
- Add Vimeo provider
- Add Audio HTML5 provider
- Add subtitle plugin
- Add Picture-in-Picture plugin
- Add a provider API to allow extension of current providers
- Add a plugin API to allow extension of current plugins
- Add `sample-provider.js` and `sample-plugin.js` for guidelines
- Add multiple native `Event` fired on media actions (`play`, `pause`, etc.)
- Add A11Y compatibility (`<button>`, `<input type="range">`, `aria-*`, `:focus-visible`)
- Add the volume up/down shortcuts
- Update HTML attributes from options and vice versa (`autoplay`, `playsinline`, `muted`, `loop`)

### Updates

- Convert to Typescript
- Replace Travis by GitHub Action
- Update to webpack v5
- Update Babel config and `.browserslistrc`
- Move `formatVideoTime`, `checkSupportFullScreen`, `isTouch` to utils
- Split code into components (`loader`, `overlay`, `big-play`, `poster`, `control-bar`)
- Remove `MkDocs` and `docs` directory, all docs are available in README files in the repository

### Fixes

- Fix the `loop` and `muted` attributes

## 3.0.4

### Updates

- Update dependencies

## 3.0.3

### Fixes

- Fixed strict node engine version break with different node version ([#7](https://github.com/vlitejs/vlite/pull/7))

## 3.0.2

### Updates

- Update docs and add `.eslintignore`

## 3.0.1

### Updates

- Update `engines` in `package.json` (node and npm)

## 3.0.0

### New features

- Add all sources of the vLitejs project, including:
  - CSS
  - JS
  - Documentation with MkDocs build
  - Webpack configuration
  - Examples
- New folder structure
- Add `ESLint` with `Standard JS` on the project with associated npm scripts
- Add `StyleLint` configuration on the project with associated npm scripts
- Add `Babel` configuration on the project
- Add `postCSS` configuration on the project
- Add `browserslistrc` files for browsers support
- Add Travis builds: `stylelint`, `eslint` and `mkdocs build`
- Add `JSDoc` configuration file and all code comments
- Add `Material for MkDocs` to build the documentation website
- Add `Webpack` configuration
- Add `./examples` folder with vLitejs examples
- Add `.github` folder with `ISSUE_TEMPLATE` and `PULL_REQUEST_TEMPLATE`
- Add `./dist` folder with vLitejs assets
- Add `CHANGELOG` file
- Add `.editorconfig` file

### Removed

- Remove specific build file for `html5` player only or `youtube` player only. We keep only one bundle compatible with `html5` and `youtube`

### Updates

- Rename the export of the `vLite` constructor to`vlitejs`
- Rename `timeline` option to `progressBar`
- Rename `callback` option to `onReady`
- Rename CSS class prefixes from `.vl-` to `.v-`
- Rename all CSS class with [FUN](https://benfrain.com/enduring-css-writing-style-sheets-rapidly-changing-long-lived-projects/#h-H2_5) methodology

### Fixes

- Fix autoplay option that does not work with browser policy without user gesture. Muted option is forced to solved the problem.

## 2.0.1

### New features

- Add `playsinline` support
- Add fast-forward on the video (+ or - 10s) only on no touch devices

### Updates

- Optimize `unBindEvents` function

### Fixes

- Fix bug with native control for touch devices

## 2.0.0

### New features

- Add prefix `.vl-` before all CSS classes use by vlitejs to prevent conflicts
- Add keyboard shortcut (spacebar) to control the video
- Add option `autoHide` to hide the control bar if the user is inactive
- Add loader linked to `seeking` and `seeked` events

## 1.1.2

### New features

- Add progress bar hover and transition

### Fixes

- Prevent click catch by Youtube iframe which block player click

## 1.1.1

### New features

- Add `UMD` compatibility
- Add package on [npm](https://www.npmjs.com/package/vlitejs)

## 1.1.0

### New features

- First release of vLitejs
- Update README
