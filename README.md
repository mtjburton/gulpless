#Gulpless

##Intro
This is a basic project designed for making my life easier when developing static websites. It is heavily tailored for my specific needs so is quite opinionated in areas.

Source lives in `src/` and production ready code lives in `dist/`. The server root should be `dist/public/`

##Features
###Overview
- Based off html5-boilerplate
- Purecss for it's base
- LESS on top
- Twig for templates
- Optimise images
- Gulp and livereload
- Plumber and Notify
- PHP server

###GULP Commands
- `gulp build-css` Compiles and minifies LESS, see below for more information
- `gulp build-js` Lints and minifies scripts, see below for more information
- `gulp build-templates` Compiles templates, see below for more information
- `gulp copy-static` Copies files, see below for more information
- `gulp opt-image` Optimises images, see below for more information
- `gulp build` Runs the above commands to build everything
- `gulp clean` Deletes `dist`
- `gulp rebuild` Runs clean then build
- `gulp watch` Watches for changes to twig, less and js files. It will invoke the appropriate task to compile these. Note there is no watch for files in the static folder or vendor css/js
- `gulp connect` Runs the PHP dev server
- `gulp` The default command invokes build, watch and starts the dev server

###CSS/LESS
The only LESS file which is compiled (and minified) by default is `src/css/hbp.less`, this file is just the HTML5 boilerplate CSS file with an import in include `src/css/main.less` which should be your starting point to write LESS (either directly in here or importing other files). This process will output a css file to `dist/public/css/style.min.css`

All the files in the following glob will be treated as vendor css `src/css/vendor/**/*.css`. These files are copied to `dist/public/css/vendor/` and it is expected they have already been minified so gulp does not do this.

These steps occur when running the following commands:
- `gulp`
- `gulp build`
- `gulp rebuild`
- `gulp build-css`

LESS compilation errors are handled by plumber and notify, minifying and copying is not. Livereload is invoked as a final step.

###JavaScript
All JavaScript files in `src/js/` are linted and merged into a single minified file which is written to `dist/public/js/app.min.js`.

Vendor js is similar to vendor css. The files are located by `src/js/vendor/**/*.js` and are not linted or minified. In addition map files are also copied which match `src/js/vendor/**/*.map`.


These steps occur when running the following commands:
- `gulp`
- `gulp build`
- `gulp rebuild`
- `gulp build-js`

Linting errors are handled by plumber and notify, minifying and copying are not. Livereload is invoked as a final step.

###Templates
Templates are written in Twig. The idea is to create layouts in `src/templates/layouts/` and then create actual pages in `src/templates/pages/` which extend the layouts. There is also `src/templates/partials/` which is obviously for partials. In the gulpfile the base is set to `src/templates/` so the layouts and partials can be referenced using `layouts/` and `partials/` respectively, opposed to referencing files based on CWD.

This area probably needs extra work as it would be useful to have a base HTML5 boilerplate layout file which can be extended to create layout files which are then used to create pages. This will simply make merging upstream changes from H5BP easier (which will have to be a manual process, so keeping it low effort would be beneficial).

These steps occur when running the following commands:
- `gulp`
- `gulp build`
- `gulp rebuild`
- `gulp build-templates`

Files in `src/templates/pages/` are compiled and output to `dist/public/`. Livereload is invoked as a final step. It's worth noting that the watch task is configured to watch `src/templates/**/*.twig` so layout, page and partial changes will trigger a compile and reload of the browser.

###Static
All files in `src/static/` are copied to `dest/public/`. This is useful for favicons, robots.txt, .htaccess etc.

This occurs when running the following commands:
- `gulp`
- `gulp build`
- `gulp gulp rebuild`
- `gulp copy-static`

###Images
All files in `src/img/` will be optimised using [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) and output to `dist/public/img/`

This occurs when running the following commands:
- `gulp`
- `gulp build`
- `gulp gulp rebuild`
- `gulp opt-image`

##Notes
I have made a blog post which hopefully gives some idea about I chose to do things in the way I did. It can be found [here](http://mtjburton.co.uk/workflow-for-static-websites)
This is a work in progress and if you find any issues or have any suggestions log a bug/submit a PR.
