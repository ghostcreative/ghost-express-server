const Promise = require('bluebird');
const Winston = require('winston');
const ExpressWinston = require('express-winston');
const Logentries = require('le_node');

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
      const transports = [];
      if (config.console.enabled) transports.push(new (Winston.transports.Console)(config.console));
      if (config.logentries.enabled) transports.push(new (Winston.transports.Logentries)(config.logentries));
      server.use(ExpressWinston.logger({ transports: transports }));
      return server;
    })
    .catch(err => {
      logger.error('GhostExpressServerError: LoggerSetup.configure', err);
      throw new Error('GhostExpressServerError: LoggerSetup.configure failed');
    });
  }

}

module.exports = LoggerSetup;