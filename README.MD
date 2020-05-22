# Cordova-Knockout-OnsenUI

## About

I like my applications simple.

- I prefer libraries over frameworks
- I prefer vanilla javascript over languages that need compiling.
- I like ES6

Unfortunately, Cordova doesn't seem to work well with ES6 modules, which is why this template uses Webpack to convert all scripts to ES5.

## What does this template include

- Onsen UI elements
- Onsen UI theme (dark="dark" or light="") in rootPage.js
- Knockout JS components (pages and elements)
- Shared Data Storage (using knockout observable objects)
- A decent looking side menu accessible on all screens
- An http module for GET requests that ignore CORS (proxy on browser and advanced http cordova plugin on phones)
- Android Backbutton navigates backwards
- The Application works in background mode by default

## Instructions

- ensure that you have the requirements:
  - node
  - cordova
  - android SDK (if you will build for android)
  - etc
- clone the repo or just download the code
- change the basic app data in `config.xml`
- change the basic app data in `package.json`
- run `npm install` which simply calls "cordova prepare"
- add cordova platforms (`cordova platform add android browser ios`)
- build the ES6 code with webpack (`npm run build` or preferably `npm run nodemon` to build as files change)
- All JavaScript code is in the `src` folder.
- All CSS, html and JavaScript libraries are in the `www` folder.
- `npm run build` simply sends the JS from src to `www/js/index.min.js`
- start cordova in your prefered platform.

During development simply run "`npm run nodemon`" and start a cordova debugging session in the browser or on your device. Unfortunately it is not possible to debug the ES6 code in a simple way while running cordova.

Note: If you are using VSCode, I strongly reccomend the plugin `es6-string-html`. It will highlight the HTML in the knockout templates.

## Contributions

Contributions to this template are wellcome.

Simply fork the repository, do your changes and send a pull request.
