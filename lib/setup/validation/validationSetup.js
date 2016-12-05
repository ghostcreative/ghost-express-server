const Promise = require('bluebird');
const _ = require('lodash');

const ExpressValidator = require('express-validator');
const GhostExpressRouteRequestValidator = require('ghost-express-route-request-validator');
const GhostValidators = GhostExpressRouteRequestValidator.GhostValidators;

class ValidationSetup {

  /**
   * @param {GhostExpress_ServerValidationConfig} config
   * @param {Express} server
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server) {
    return Promise.resolve()
    .then(() => {
      if (config.customValidatorsPath) {
        const AppValidators = require(config.customValidatorsPath);
        const CustomValidators = _.defaultsDeep(GhostValidators, AppValidators);
        server.use(ExpressValidator(CustomValidators));
      } else {
        server.use(ExpressValidator(GhostValidators));
      }
      return server;
    })
  }

}

module.exports = ValidationSetup;