const ErrorHandler = require('errorhandler');
const Promise = require('bluebird');
const Celebrate = require('celebrate'); // used to handle Joi 400 validation errors
const Boom = require('express-boom'); // used to handle non 400 errors

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
      server.use(Boom());
      server.use(ErrorHandlerSetup.logErrorHandler);
      server.use(Celebrate.errors());
      server.use(ErrorHandler(config)); // TODO - remove this for a custom error handler, should return html errors if html type was requested

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