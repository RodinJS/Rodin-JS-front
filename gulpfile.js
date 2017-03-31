'use strict';

const _ = require('lodash');
const es = require('event-stream');
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const sequence = require('run-sequence');
const del = require('del');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const size = require('gulp-size');
const connect = require('gulp-connect');
const templateCache = require('gulp-angular-templatecache');
const VERSION = require('./package.json').version;
const VENDOR = require('./package.json').dependencies;
const VENDORMAP = require('./vendor.json');

const JS = ['src/app/**/*.js', '!src/systemjs-module/**', '!src/assists/**'];
const HTML = ['src/app/**/*.html', 'src/app/**/**/*.html'];
const SASS = ['src/styles/main.scss', '!src/styles/{vendor,vendor/**}'];
const SASSWATCHER = ['src/**/**.scss', '!src/styles/{vendor,vendor/**}'];
const FONT = ['src/fonts/**/*.{ttf,woff,woff2,eof,svg,eot,json,otf}'];
const IMG = ['src/images/**/*.{jpg,jpeg,ico,png,svg,gif,json,xml}'];

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10',
];

const UGLIFY_AGRESIVE = {
    preserveComments: 'license',
    mangle: true,
    compress: true,
};

const ERROR_MESSAGE = {
    errorHandler: notify.onError('Error: <%= error.message %>'),
};


gulp.task('vendor', () => {
    let vendor_tasks = generate_vendor(VENDOR);

    let custom_vendor_tasks = _.map(VENDORMAP, (item, key) => {
        let src, dest;

        src = item.src;
        if (!src) {
            throw new Error(`Please provide ${key} external module src.`);
        }

        dest = `./build/scripts/vendor/${item.dest || ''}`;

        return gulp.src(src).pipe(gulp.dest(dest));
    });

    es.merge(_.concat(vendor_tasks, custom_vendor_tasks));
});

function generate_vendor(vendor) {
    let list = [];
    return _.concat(list, _.map(vendor, (item, key) => {
        let src, dest, dependencies;
        let module = key;
        if (VENDORMAP && VENDORMAP[module]) {
            let moduleMap = VENDORMAP[module];
            src = moduleMap.src;
            if (!src) {
                throw new Error(`Please provide ${key} module src.`);
            }

            dest = `./build/scripts/vendor/${moduleMap.dest || key}`;
        } else {
            dependencies = require(`./node_modules/${module}/package.json`).dependencies;
            src = `./node_modules/${module}/**/*.*`;
            dest = `./build/scripts/vendor/${module}`;
        }

        delete VENDORMAP[module];
        let task = gulp.src(src).pipe(gulp.dest(dest));

        if (dependencies) {
            _.concat(list, generate_vendor(dependencies));
        }

        return task;
    }));
}

gulp.task('js', () => {
    const s = size({ title: 'JS -> ', pretty: true });
    return gulp.src(JS)
      .pipe(plumber(ERROR_MESSAGE))
      .pipe(sourcemaps.init())
      .pipe(babel({
          "presets": [
              "es2015"
          ],
          "plugins": [
              "angularjs-annotate",
              "transform-es2015-modules-systemjs",
              "transform-class-properties"
          ]
      }))
      .pipe(s)
      .pipe(plumber.stop())
      .pipe(gulp.dest('./build/app'))
      .pipe(notify({
        onLast: true,
        message: () => `JS - Total size ${s.prettySize}`,
    }));
});

gulp.task('js-prod', () => {
    const s = size({ title: 'JS production -> ', pretty: false });
    return gulp.src(JS)
      .pipe(plumber(ERROR_MESSAGE))
      .pipe(babel({
          "presets": [
              "es2015"
          ],
          "plugins": [
              "angularjs-annotate",
              "transform-es2015-modules-systemjs",
              "transform-class-properties"
          ]
      }))
      .pipe(uglify(UGLIFY_AGRESIVE))
      .pipe(s)
      .pipe(plumber.stop())
      .pipe(gulp.dest('./build/app'))
      .pipe(notify({
        onLast: true,
        message: () => `JS(prod) - Total size ${s.prettySize}`,
    }));
});

gulp.task('template', () => {
    const s = size({ title: 'template -> ', pretty: false });
    return gulp.src(HTML)
      .pipe(plumber(ERROR_MESSAGE))
      .pipe(templateCache({
        standalone: true,
    }))
      .pipe(rename('app.templates.js'))
      .pipe(s)
      .pipe(plumber.stop())
      .pipe(gulp.dest('./src/app/config/'))
      .pipe(notify({
        onLast: true,
        message: () => `template - Total size ${s.prettySize}`,
    }));
});

gulp.task('generate-index', () => {
    const s = size({ title: 'generate-index -> ', pretty: false });
    return gulp.src('./src/index.html')
      .pipe(plumber(ERROR_MESSAGE))
      .pipe(s)
      .pipe(plumber.stop())
      .pipe(gulp.dest('./build/'))
      .pipe(notify({
        onLast: true,
        message: () => `generate-index - Total size ${s.prettySize}`,
    }));
});

gulp.task('sass', () => {
    const s = size({
        onLast: true,
        title: 'SASS -> ',
        pretty: true,
    });
    return gulp.src(SASS)
      .pipe(plumber(ERROR_MESSAGE))
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('style.css'))
      .pipe(sourcemaps.init())
      .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe(sourcemaps.write())
      .pipe(s)
      .pipe(plumber.stop())
      .pipe(gulp.dest('./build/styles'))
      .pipe(notify({
        onLast: true,
        message: () => `SASS - Total size ${s.prettySize}`,
    }));
});

gulp.task('sass-prod', () => {
    const s = size({
        onLast: true,
        title: 'SASS -> ',
        pretty: false,
    });
    return gulp.src(SASS)
      .pipe(plumber(ERROR_MESSAGE))
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('style.css'))
      // .pipe(sourcemaps.init())
      .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe(cleanCSS())
      // .pipe(sourcemaps.write())
      .pipe(s)
      .pipe(gulp.dest('./build/styles'))
      .pipe(notify({
        onLast: true,
        message: () => `SASS(prod) - Total size ${s.prettySize}`,
    }));
});

gulp.task('font', () => {
    gulp.src(FONT)
      .pipe(plumber(ERROR_MESSAGE))
      .pipe(gulp.dest('./build/fonts'));
});

gulp.task('img', () => {
    gulp.src(IMG)
      .pipe(plumber(ERROR_MESSAGE))
      .pipe(gulp.dest('./build/images'));
});

gulp.task('watch', () => {
    gulp.watch(SASS, ['sass']);
    gulp.watch(SASSWATCHER, ['sass']);
    gulp.watch(JS, ['js']);
    gulp.watch(HTML, ['build-template']);
    gulp.watch(FONT, ['font']);
    gulp.watch(IMG, ['img']);
    gulp.watch('src/index.html', ['generate-index']);
});

gulp.task('clean', () => {
    return del(['./build/**']);
});

gulp.task('connect', () => {
    connect.server({
        root: './build/',
        port: 8585,
        livereload: true,
    });
});

gulp.task('build-template', (done) => {
    sequence('template', 'js', done);
});

//BUNDLE//

/**
 * ENVS: local, dev, stage, prod
 */
const bundleVendorsJS = ['node_modules/jquery/dist/jquery.min.js', 'src/app/pages/home/highlight.pack.js'];
const strip = require('gulp-strip-comments');
const stripDebug = require('gulp-strip-debug');
const replace = require('gulp-replace');
const webpack = require('webpack');


gulp.task('vendorForBundle', () => {
    let vendor_tasks = generate_vendor({ "angular-ui-notification": "^0.2.0", "font-awesome": "4.7.0"});

    let custom_vendor_tasks = _.map(VENDORMAP, (item, key) => {
        let src, dest;

        src = item.src;
        if (!src) {
            throw new Error(`Please provide ${key} external module src.`);
        }

        dest = `./build/scripts/vendor/${item.dest || ''}`;

        return gulp.src(src).pipe(gulp.dest(dest));
    });

    es.merge(_.concat(vendor_tasks, custom_vendor_tasks));
});

gulp.task('bundleVendors',()=>{
    return gulp.src(bundleVendorsJS)
        .pipe(concat('vendors.js'))
        .pipe(strip())
        .pipe(uglify(UGLIFY_AGRESIVE))
        .pipe(gulp.dest('./build/app'))

});

gulp.task('generateBundleIndex', () => {
    const s = size({ title: 'generate-index -> ', pretty: false });
    return gulp.src('./src/index.build.html')
        .pipe(replace(/\?v=(.{4})/g, `?v=${Date.now()}`))
        .pipe(plumber(ERROR_MESSAGE))
        .pipe(s)
        .pipe(plumber.stop())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./build/'))
        .pipe(notify({
            onLast: true,
            message: () => `generate-index - Total size ${s.prettySize}`,
        }));
});

gulp.task('webpack', (done) => {
    // run webpack
    webpack(require('./webpack.config'), (error) => {
        let pluginError;
        if (error) {
            pluginError = new gulpUtil.PluginError('webpack', error);

            if (done) {
                done(pluginError);
            } else {
                console.log('[webpack]', pluginError);
            }
            return;
        }
        if (done) {
            done();
        }
    });
});

gulp.task('cleanBundleFile', ()=>{
    const s = size({ title: 'cleanBundleFile -> ', pretty: false });
    return gulp.src('./build/app/bundle.js')
        .pipe(strip())
        .pipe(uglify(UGLIFY_AGRESIVE))
        .pipe(stripDebug())
        .pipe(replace('env:"local"', `env:"${process.env.NODE_ENV || 'local'}"`))
        .pipe(plumber(ERROR_MESSAGE))
        .pipe(s)
        .pipe(plumber.stop())
        .pipe(gulp.dest('./build/app'))
        .pipe(notify({
            onLast: true,
            message: () => `generate-index - Total size ${s.prettySize}`,
        }));
});

gulp.task('bundleTemplate', () => {
    const s = size({ title: 'template -> ', pretty: false });
    return gulp.src(HTML)
        .pipe(plumber(ERROR_MESSAGE))
        .pipe(templateCache({
            standalone: true,
        }))
        .pipe(rename('app.templates.js'))
        .pipe(s)
        .pipe(plumber.stop())
        .pipe(gulp.dest('./build/app/config/'))
        .pipe(notify({
            onLast: true,
            message: () => `template - Total size ${s.prettySize}`,
        }));
});
//BUNDLE//


gulp.task('prod', (done) => {
    sequence('clean', 'vendor', ['generate-index', 'template', 'js-prod', 'sass-prod',  'font', 'img'], done);
});

gulp.task('default', (done) => {
    sequence('clean', 'vendor', ['generate-index', 'template', 'js', 'sass',  'font', 'img', 'connect', 'watch'], done);
});

gulp.task('bundle', (done)=>{
    sequence('clean', 'vendorForBundle', 'bundleTemplate', 'webpack', ['sass', 'font', 'img', 'generateBundleIndex', 'bundleVendors', 'cleanBundleFile'], done)
});