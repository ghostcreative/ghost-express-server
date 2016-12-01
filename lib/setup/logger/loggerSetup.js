const Promise = require('bluebird');
const ExpressWinston = require('express-winston');
const Logentries = require('winston-logentries'); // needed don't delete
const Winston = require('winston');

class LoggerSetup {

  /**
   * @param {GhostExpress_ServerLoggerConfig} config
   * @param {Express} app
   * @returns {Promise<Express,Error>}
   */
  static configure (config, app) {
    return Promise.resolve()
    .then(() => {
      app.use(ExpressWinston.logger({
        transports: [
          new Winston.transports.Console(config.console),
          new Winston.transports.Logentries(config.logentries)
        ]
      }));
      return app;
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