const Promise = require('bluebird');
const ExpressWinston = require('express-winston');
const GhostLogger = require('ghost-logger');

class LoggerSetup {

  /**
   * @param {GhostExpress_ServerLoggerConfig} config
   * @param {Express} server
   * @param {GhostLogger} logger
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server, logger) {
    return Promise.resolve()
    .then(() => {
      const Logger = new GhostLogger(config);
      server.use(ExpressWinston.logger({
        winstonInstance: Logger
      }));
      return server;
    })
    .catch(err => {
      logger.error('GhostExpressServerError: LoggerSetup.configure', err);
      throw new Error('GhostExpressServerError: LoggerSetup.configure failed');
    });
  }

}

module.exports = LoggerSetup;