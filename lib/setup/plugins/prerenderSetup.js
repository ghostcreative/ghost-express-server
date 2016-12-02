const Prerender = require('prerender-node');
const Promise = require('bluebird');

class PrerenderSetup {

  /**
   * @param {GhostExpress_ServerPrerenderConfig} config
   * @param {Express} server
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server) {
    return Promise.resolve()
    .then(() => {
      if (config.enabled) server.use(Prerender.set('prerenderToken', config.token));
      return server;
    })
  }

}

module.exports = PrerenderSetup;