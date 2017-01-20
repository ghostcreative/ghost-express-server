const Glob = require('glob-promise');

class RoutesSetup {

  /**
   * @param {GhostExpress_ServerRoutesConfig} config
   * @param {Express} server
   * @param {GhostLogger} logger
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server, logger) {
    return Promise.resolve()
    .then(() => {
      if (config && config.enabled) {
        return Glob(config.path)
        .map(file => server.useRouter(require(file))
        .then(() => server))
      }
      return server;
    })
    .catch(err => {
      logger.error('GhostExpressServerError: RoutesSetup.configure', err);
      throw new Error('GhostExpressServerError: RoutesSetup.configure failed');
    })

  }

}

module.exports = RoutesSetup;