const ErrorHandler = require('errorhandler');
const Promise = require('bluebird');

const ServiceLocator = require('../../services/serviceLocatorFactory').getServiceLocatorSingleton();

class ErrorHandlerSetup {

  /**
   * @param {GhostExpress_ServerErrorConfig} config
   * @param {Express} server
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server) {
    return Promise.resolve()
    .then(() => {
      server.use(ErrorHandlerSetup.logErrorHandler);
      server.use(ErrorHandler(config));
      return server;
    })
  }

  static logErrorHandler (err, req, res, next) {
    const logger = ServiceLocator.getLogger();
    logger.error(err ? err.message : 'Unknown server error', err);
    next();
  }

}

module.exports = ErrorHandlerSetup;