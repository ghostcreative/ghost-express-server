const Promise = require('bluebird');
const expressValidator = require('express-validator');
const Validators = require('./validators');

class ValidatorSetup {

  /**
   * @returns {Promise<Express,Error>}
   */
  static configure () {
    return Promise.resolve()
    .then(() => {
      app.use(expressValidator({ customValidators: Validators }));
      return app;
    })
  }

}

module.exports = ValidatorSetup;