exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: ['./tests/specs/applepay_test.js'],
  exclude: [],

  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 100000,
  connectionRetryTimeout: 240000,
  connectionRetryCount: 3,
  hostname: 'hub.browserstack.com',
  services: [['browserstack',
  { 
    browserstackLocal: true, 
    buildIdentifier: '#${BUILD_NUMBER}', 
    opts: { 
      forcelocal: false, 
      localIdentifier: 'webdriverio-browserstack-repo' 
    } 
  },]],

  before: function () {
    var chai = require('chai');
    global.expect = chai.expect;
    chai.Should();
  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 400000,
  },
};
