const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // This removes the "Chrome is being controlled by automated software" flags
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
        }
        return launchOptions;
      });
    },
    // Blocks internal ad networks from stalling out the page load timers
    blockHosts: ["*adtrafficquality.google", "*google-analytics.com", "*googletagmanager.com"],
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000
  },
});
