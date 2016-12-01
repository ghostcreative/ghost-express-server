const ErrorHandler = require('errorhandler');
const Promise = require('bluebird');

class ErrorHandlerSetup {

  /**
   * @param {GhostExpress_ServerErrorConfig} config
   * @returns {Promise<Express,Error>}
   */
  static configure (config) {
    return Promise.resolve()
    .then(() => {
      app.use(ErrorHandler(config));
      return app;
    })
  }

}

module.exports = ErrorHandlerSetup;