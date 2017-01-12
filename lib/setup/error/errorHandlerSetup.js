const ErrorHandler = require('errorhandler');
const Promise = require('bluebird');

const ServiceLocator = require('../../services/serviceLocatorFactory').getServiceLocatorSingleton();

class ErrorHandlerSetup {

  /**
   * @param {GhostExpress_ServerErrorConfig} config
   * @param {Express} server
   * @param {GhostLogger} logger
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server, logger) {
    return Promise.resolve()
    .then(() => {
      server.use(ErrorHandlerSetup.logErrorHandler);
      server.use(ErrorHandler(config));
      return server;
    })
    .catch(err => {
      logger.error('GhostExpressServerError: ErrorHandlerSetup.configure', err);
      throw err;
    });
  }

  static logErrorHandler (err, req, res, next) {
    const logger = ServiceLocator.getLogger();
    logger.error(err ? err.message : 'Unknown server error', err);
    next();
  }

}

module.exports = ErrorHandlerSetup;