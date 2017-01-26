const Promise = require('bluebird');
const GhostLogger = require('ghost-logger');

class LoggerSetup {

  /**
   * @param {GhostLogger_Options} config
   * @param {Express} server
   * @param {GhostLogger} logger
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server, logger) {
    return Promise.resolve()
    .then(() => {
      const Logger = new GhostLogger(config);
      server.use(Logger);
      return server;
    })
    .catch(err => {
      logger.error('GhostExpressServerError: LoggerSetup.configure', err);
      throw new Error('GhostExpressServerError: LoggerSetup.configure failed');
    });
  }

}

module.exports = LoggerSetup;