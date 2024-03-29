const { config: baseConfig } = require("./base.conf.js");

const parallelConfig = {
  maxInstances: 10,
  commonCapabilities: {
    "bstack:options": {
      buildName: "browserstack build",
      source: "webdriverio:sample-master:v1.2",
    },
  },
  services: [["browserstack", { buildIdentifier: "#${BUILD_NUMBER}" }]],
  capabilities: [
    {
      browserName: "safari",
      "appium:nativeWebTap": true,
      "bstack:options": {
        deviceName: "iPhone 14",
        osVersion: "16",
        idleTimeout: 300,
        enableApplePay: true,
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
