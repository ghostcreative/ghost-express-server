const Promise = require('bluebird');
const Winston = require('winston');
const ExpressWinston = require('express-winston');
const Logentries = require('le_node');

class LoggerSetup {

  /**
   * @param {GhostExpress_ServerLoggerConfig} config
   * @param {Express} server
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server) {
    return Promise.resolve()
    .then(() => {
      const transports = [];
      if (config.console.enabled) transports.push(new (Winston.transports.Console)(config.console));
      if (config.logentries.enabled) transports.push(new (Winston.transports.Logentries)(config.logentries));
      server.use(ExpressWinston.logger({ transports: transports }));
      return server;
    })
  }

  /**
   * @param {GhostExpress_ServerTemplateConfig} config
   * @returns {Handlebars}
   */
  static _initHandlebars (config) {
    return Promise.resolve()
    .then(() => {
      return Handlebars.create({
        layoutsDir: config.layoutsDir,
        partialsDir: config.partialsDir,
        defaultLayout: config.defaultLayout,
        extname: config.extname
      });
    })
  }

}

module.exports = LoggerSetup;