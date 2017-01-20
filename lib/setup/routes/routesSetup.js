const Glob = require('glob-promise');
const _ = require('lodash');
const Path = require('path');
const Promise = require('bluebird');

class RoutesSetup {

  /**
   * @param {GhostExpress_ServerRoutesConfig} config
   * @param {GhostExpressServer} server
   * @param {GhostLogger} logger
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server, logger) {
    return Promise.resolve()
    .then(() => {
      if (config && config.enabled) {
        const globPath = Path.resolve(require.main.filename, '../../', config.path);
        return Glob(globPath)
        .then(files => Promise.map(files, file => {
          const routerPath = Path.resolve(file);
          server.useRouter(require(routerPath))
        }))
        .then(() => server)
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