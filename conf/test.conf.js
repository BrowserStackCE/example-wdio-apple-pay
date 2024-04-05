const { config: baseConfig } = require("./base.conf.js");

const parallelConfig = {
  maxInstances: 10,
  commonCapabilities: {
    "bstack:options": {
      buildName: "browserstack build",
      source: "webdriverio:sample-master:v1.2",
    },
  },
  services: [["browserstack", { 
    browserstackLocal: true, 
    buildIdentifier: '#${BUILD_NUMBER}', 
    opts: { 
      forcelocal: false, 
      localIdentifier: 'webdriverio-browserstack-repo' 
    } 
  },]],
  capabilities: [
    {
      browserName: "safari",
      "appium:nativeWebTap": true,
      "bstack:options": {
        deviceName: "iPhone 15",
        osVersion: "17",
        idleTimeout: 300,
        enableApplePay: true,
        local: true,
        localIdentifier: "webdriverio-browserstack-repo"
      },
    },
  ],
};

exports.config = { ...baseConfig, ...parallelConfig };

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = { ...caps[i], ...exports.config.commonCapabilities[i] };
});
