const ErrorHandler = require('errorhandler');
const Promise = require('bluebird');

class ErrorHandlerSetup {

  /**
   * @param {GhostExpress_ServerErrorConfig} config
   * @param {Express} server
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server) {
    return Promise.resolve()
    .then(() => {
      server.use(ErrorHandler(config));
      return server;
    })
  }

}

module.exports = ErrorHandlerSetup;