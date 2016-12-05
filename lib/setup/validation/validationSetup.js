const Path = require('path');
const Promise = require('bluebird');
const _ = require('lodash');

const ExpressValidator = require('express-validator');
let ExpressValidatorOptions; // https://github.com/ctavan/express-validator#middleware-options
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

        // Get absolute path to app-specific validators
        const rootDir = Path.dirname(require.main.filename);
        const AppValidatorPath = Path.join(rootDir, config.customValidatorsPath);
        const AppValidators = require(AppValidatorPath);

        // Merge these with Ghost default validators
        const CustomValidators = _.defaultsDeep(GhostValidators, AppValidators);
        ExpressValidatorOptions = { 
          customValidators: CustomValidators
        };

      } else {

        ExpressValidatorOptions = { 
          customValidators: GhostValidators;
        };

      }
      server.use(ExpressValidator(ExpressValidatorOptions));
      return server;
    })
  }

}

module.exports = ValidationSetup;