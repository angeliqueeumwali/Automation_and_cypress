const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    // Blocks slow third-party ad scripts from causing timeouts
    blockHosts: [
      "*adtrafficquality.google",
      "*doubleclick.net",
      "*googleads.g.doubleclick.net"
    ],
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000
  },
});
