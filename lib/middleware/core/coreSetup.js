const Promise = require('bluebird');

class CoreSetup {

  /**
   * @param {GhostExpress_ServerConfig} config
   * @param {Express} app
   * @returns {Promise<Express,Error>}
   */
  static configure (config, app) {
    return Promise.resolve()
    .then(() => {

    })
  }

  /**
   * @param {GhostExpress_ServerTemplateConfig} config
   * @returns {Handlebars}
   */
  static _initHandlebars (config) {
    return Promise.resolve()
    .then(() => {

    })
  }

}

module.exports = CoreSetup;