module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['FirefoxHeadless'],
    files: [
      'src/**/*.spec.js'
    ],
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
