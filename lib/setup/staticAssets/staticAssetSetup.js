const Promise = require('bluebird');
const Express = require('express');

class StaticAssetSetup {

  /**
   * @param {GhostExpress_StaticAssetConfig} config
   * @param {Express} server
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server) {
    return Promise.resolve()
    .then(() => {
      if (config.enabled) {
        config.directories.forEach(directory => server.use(Express.static(directory)))
      }
      return server;
    })
  }

}

module.exports = StaticAssetSetup;