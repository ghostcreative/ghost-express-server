const Prerender = require('prerender-node');
const Promise = require('bluebird');

class PrerenderSetup {

  /**
   * @param {GhostExpress_ServerPrerenderConfig} config
   * @param {Express} server
   * @param {GhostLogger} logger
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server, logger) {
    return Promise.resolve()
    .then(() => {
      if (config.enabled) server.use(Prerender.set('prerenderToken', config.token));
      return server;
    })
    .catch(err => {
      logger.error('GhostExpressServerError: PrerenderSetup.configure', err);
      throw new Error('GhostExpressServerError: PrerenderSetup.configure failed');
    });
  }

}

module.exports = PrerenderSetup;