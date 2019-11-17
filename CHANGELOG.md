# 3.0.0

#### New features

* Add all sources of `vLitejs` project including:
    * CSS
    * JS
    * Documentation
    * Webpack configuration for build
    * Example
* New folder structure
* Add `ESLint` on the project and add npm scripts
* Add `StyleLint` on the project and add npm scripts
* Add `Babel` on the project
* Add `postCSS` on the project
* Add `browserslistrc` files for browsers support
* Add Travis builds: `stylelint`, `eslint` and `mkdocs build`
* Add `JSDoc` configuration file and all code comments
* Add `Material for MkDocs` to build the documentation website
* Add `Webpack` configuration for builds
* Add `./examples` folder with `vLite` examples
* Add `.github` folder with `ISSUE_TEMPLATE` and `PULL_REQUEST_TEMPLATE`
* Add `./build` folder with `vLitejs` assets build
* Add `CHANGELOG` file
* Add `.editorconfig` file

#### Removed

* Remove specific build file for `html5` player only or `youtube` player only. We keep only one bundle compatible with `html5` and `youtube`


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

* Add prefix `.vl-` before all CSS classes use by vLite to prevent conflicts
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

* First release of `vLitejs`
* Update README