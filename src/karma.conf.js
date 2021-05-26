// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-sinon-chai'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-mocha-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/lestes-tech'),
      reports: ['lcov', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: [ 'mocha'],
    port: 9876,
    mochaReporter: {
      colors: {
        success: 'green',
        info: 'blue',
        warning: 'cyan',
        error: 'bgRed'
      },
      output: 'autowatch',
      maxLogLines: 10
    },
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome_without_security'],
    customLaunchers: {
      Chrome_without_security: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true
  });
};
