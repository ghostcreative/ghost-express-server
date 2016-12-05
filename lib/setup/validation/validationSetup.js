const Promise = require('bluebird');
const ExpressValidator = require('express-validator');
const GhostExpressRouteRequestValidator = require('ghost-express-route-request-validator');
const GhostValidators = GhostExpressRouteRequestValidator.CustomValidators;

class ValidationSetup {

  /**
   * @param {GhostExpress_ServerLoggerConfig} config
   * @param {Express} server
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server) {
    return Promise.resolve()
    .then(() => {
      if (config.enabled) server.use(ExpressValidator(GhostValidators));
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

module.exports = ValidationSetup;



