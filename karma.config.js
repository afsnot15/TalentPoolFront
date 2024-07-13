module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['FirefoxHeadless'],
    files: [
      'src/**/*.spec.js'
    ],
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/talentpoolfront'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 50,
          branches: 50,
          functions: 50,
          lines: 50
        }
      }
    },
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--headless',
          '--remote-debugging-port=9222'
        ]
      }
    },
  });
};
