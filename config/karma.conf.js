module.exports = function (config) {
  config.set({
    frameworks: [
      'jasmine'
    ],

    reporters: [
      'progress',
      'coverage'
    ],

    files: [
      'config/spec.bundle.js'
    ],

    preprocessors: {
      'config/spec.bundle.js': ['webpack', 'sourcemap']
    },

    browsers: [
      'PhantomJS'
    ],

    singleRun: true,

    port: 9876,

    colors: true,

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'},
        {type: 'json'},
      ]
    },

    webpack: require('./webpack.test.js'),

    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  });
};