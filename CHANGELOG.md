# 3.0.3

#### Fixes

* Fixed strict node engine version break with different node version [#6](https://github.com/yoriiis/vlitejs/issues/6)


# 3.0.2

#### Updates

* Update docs and add `.eslintignore`


# 3.0.1

#### Updates

* Update `engines` in `package.json` (node and npm)


# 3.0.0

#### New features

* Add all sources of the vLitejs project, including:
    * CSS
    * JS
    * Documentation with MkDocs build
    * Webpack configuration
    * Examples
* New folder structure
* Add `ESLint` with `Standard JS` on the project with associated npm scripts
* Add `StyleLint` configuration on the project with associated npm scripts
* Add `Babel` configuration on the project
* Add `postCSS` configuration on the project
* Add `browserslistrc` files for browsers support
* Add Travis builds: `stylelint`, `eslint` and `mkdocs build`
* Add `JSDoc` configuration file and all code comments
* Add `Material for MkDocs` to build the documentation website
* Add `Webpack` configuration
* Add `./examples` folder with vLitejs examples
* Add `.github` folder with `ISSUE_TEMPLATE` and `PULL_REQUEST_TEMPLATE`
* Add `./dist` folder with vLitejs assets
* Add `CHANGELOG` file
* Add `.editorconfig` file

#### Removed

* Remove specific build file for `html5` player only or `youtube` player only. We keep only one bundle compatible with `html5` and `youtube`

#### Updates

* Rename the export of the `vLite` constructor to` vlitejs`
* Rename `timeline` option to `progressBar`
* Rename `callback` option to `onReady`
* Rename CSS class prefixes from `.vl-` to `.v-`
* Rename all CSS class with [FUN](https://benfrain.com/enduring-css-writing-style-sheets-rapidly-changing-long-lived-projects/#h-H2_5) methodology

#### Fixes

* Fix autoplay option that does not work with browser policy without user gesture. Muted option is forced to solved the problem.


# 2.0.1

#### New features

* Add `playsinline` support
* Add fast-forward on the video (+ or - 10s) only on no touch devices

#### Updates

* Optimize `unBindEvents` function

#### Fixes

* Fix bug with native control for touch devices


# 2.0.0

#### New features

* Add prefix `.vl-` before all CSS classes use by vlitejs to prevent conflicts
* Add keyboard shortcut (spacebar) to control the video
* Add option `autoHide` to hide the control bar if the user is inactive
* Add loader linked to `seeking` and `seeked` events


# 1.1.2

#### New features

* Add progress bar hover and transition

#### Fixes

* Prevent click catch by Youtube iframe which block player click


# 1.1.1

#### New features

* Add `UMD` compatibility
* Add package on [npm](https://www.npmjs.com/package/vlitejs)


# 1.1.0

#### New features

* First release of vLitejs
* Update README
