const Promise = require('bluebird');
const Celebrate = require('celebrate'); // used to handle Joi 400 validation errors
const ErrorHandler = require('errorhandler');
const { errorHandler: CustomErrorHandler } = require('./errorHandler');
const { InternalError } = require('@foundry-ai/api-errors');
const ServiceLocator = require('../../services/serviceLocatorFactory').getServiceLocatorSingleton();

class ErrorHandlerSetup {

  /**
   * @param {GhostExpress_ServerErrorConfig} config
   * @param {GhostExpressServer} ghostServer
   * @param {GhostLogger} logger
   * @returns {Promise<Express,Error>}
   */
  static configure (config, ghostServer, logger) {
    return Promise.resolve()
    .then(() => {
        const raven = ghostServer.getServerInstance().get('raven');
        if (raven) ghostServer.useMiddleware('*', raven.errorHandler());
        ghostServer.useMiddleware('*', ErrorHandlerSetup.logError);
        ghostServer.useMiddleware('*', ErrorHandlerSetup._formatErrorMessage);
        ghostServer.useMiddleware('*', Celebrate.errors());
        ghostServer.useMiddleware('*', CustomErrorHandler);
        ghostServer.useMiddleware('*', ErrorHandler(config));

        return ghostServer;
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
    if (!err || !err.message) next(new InternalError());
    else if (err.isJoi) err.message = err.message.replace( /(^.*\[|\].*$)/g, '' );
    next(err);
  }

}

module.exports = ErrorHandlerSetup;
