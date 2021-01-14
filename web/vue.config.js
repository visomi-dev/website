/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 */

process.env.VUE_APP_VERSION = require('./package.json').version;

/** @type {Options} */
const options = {
  configureWebpack: {
    devtool: 'source-map',
  },
};

module.exports = options;
