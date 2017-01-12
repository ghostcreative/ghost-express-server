const Promise = require('bluebird');
const Express = require('express');

class StaticAssetSetup {

  /**
   * @param {GhostExpress_StaticAssetConfig} config
   * @param {Express} server
   * @param {GhostLogger} logger
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server, logger) {
    return Promise.resolve()
    .then(() => {
      if (config.enabled) {
        config.directories.forEach(directory => {
          if (directory.enabled) server.use(directory.url, Express.static(directory.path))
        })
      }
      return server;
    })
    .catch(err => {
      logger.error('GhostExpressServerError: StaticAssetSetup.configure', err);
      throw new Error('GhostExpressServerError: StaticAssetSetup.configure failed');
    })

  }

}

module.exports = StaticAssetSetup;