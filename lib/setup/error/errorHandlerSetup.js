const ErrorHandler = require('errorhandler');
const Promise = require('bluebird');
const Celebrate = require('celebrate'); // used to handle Joi 400 validation errors

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
      server.use('*', ErrorHandlerSetup.logError);
      server.use('*', ErrorHandlerSetup._formatErrorMessage);
      server.use(Celebrate.errors());
      server.use('*', ErrorHandler(config)); // TODO - remove this for a custom error handler, should return html errors if html type was requested

      return server;
    })
    .catch(err => {
      logger.error('GhostExpressServerError: ErrorHandler.configure', err);
      throw new Error('GhostExpressServerError: ErrorHandler.configure failed');
    });
  }

  static logError (err, req, res, next) {
    const logger = ServiceLocator.getLogger();
    const errorMessage = `GhostExpressServer ErrorHandler.logError - ${err ? err.message : 'Unknown server error'}`;
    logger.error(errorMessage, err);
    next(err);
  }

  static  _formatErrorMessage (err, req, res, next) {
    if (!err || !err.message) return res.boom.badImplementation()
    else if (err.isJoi) err.message = err.message.replace( /(^.*\[|\].*$)/g, '' );
    next(err);
  }

}

module.exports = ErrorHandlerSetup;
