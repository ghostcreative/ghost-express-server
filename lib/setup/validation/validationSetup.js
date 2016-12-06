const Path = require('path');
const Promise = require('bluebird');
const _ = require('lodash');

const ExpressValidator = require('express-validator');
const GhostExpressRouteRequestValidator = require('ghost-express-route-request-validator');
const GhostExpressValidator = new GhostExpressRouteRequestValidator();
const GhostValidators = GhostExpressValidator.GhostValidators;

class ValidationSetup {

  /**
   * @param {GhostExpress_ServerValidationConfig} config
   * @param {Express} server
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server) {
    return Promise.resolve()
    .then(() => {
      server.use(ExpressValidator(ValidationSetup._setValidators(config)));
      return server;
    })
  }

  /**
   * @param {GhostExpress_ServerValidationConfig} config
   * @returns {Object}
   */
  static _setValidators (config) {
    const ExpressValidatorOptions = {};
    ExpressValidatorOptions.customValidators = GhostValidators;
    if (config.customValidatorsPath) {
      // Get absolute path to app-specific validators
      const rootDir = Path.dirname(require.main.filename);
      const AppValidatorPath = Path.join(rootDir, config.customValidatorsPath);
      const AppValidators = require(AppValidatorPath);

      // Merge these with Ghost default validators
      ExpressValidatorOptions.customValidators = _.defaultsDeep(GhostValidators, AppValidators);
    }
    return ExpressValidatorOptions;
  }

}

module.exports = ValidationSetup;