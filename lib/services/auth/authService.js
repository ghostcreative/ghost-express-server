'use strict';

const _ = require('lodash');

class AuthService {

  /**
   * @param {Object} authPlugin
   * @param {GhostExpressRouter_AuthServiceConfig} options
   */
  constructor (authPlugin, options) {
    this._authPlugin = authPlugin;
    this._authSecret = options.authSecret;
    this._validateFn = options.validateFn;
    this._loginFn = options.loginFn;
    this._registerFn = options.registerFn;
    this._resetPasswordFn = options.resetPasswordFn;
    this._verifyResetTokenFn = options.verifyResetTokenFn;
  }

  /**
   * @param {Object} strategyOptions
   * @param {String} strategyOptions.method
   * @param {'bearerJwt'} strategyOptions.plugin
   * @param {Object} strategyOptions.override
   */
  strategy (strategyOptions = {}) {
    if (strategyOptions.method == 'authenticate') {
      this._validateFn = strategyOptions.override;
      this._authPlugin = strategyOptions.plugin;
    } else if (strategyOptions.method == 'login') {
      this._loginFn = strategyOptions.override;
    } else if (strategyOptions.method == 'register') {
      this._registerFn = strategyOptions.override;
    } else if (strategyOptions.method == 'resetPassword') {
      this._resetPasswordFn = strategyOptions.override;
    } else if (strategyOptions.method == 'requestPasswordReset') {
      this._requestPasswordResetFn = strategyOptions.override;
    } else if (strategyOptions.method == 'verifyResetToken') {
      this._verifyResetTokenFn = strategyOptions.override;
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  authenticate (req, res) {
    return this._authPlugin.validateRequest(req, this._authSecret)
    .then(decoded => this._validateFn.execute(decoded))
    .catch(err => {
      if (_.has(req.routeOptions, 'auth.required') && req.routeOptions.auth.required === false) return {};
      else throw err;
    })
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  login (req, res) {
    return this._loginFn.execute(req, res)
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  register (req, res) {
    return this._registerFn.execute(req, res)
  }

  // /**
  //  * @param {Request} req
  //  * @param {Response} res
  //  * @param {Function} next
  //  */
  // resetPassword (req, res, next) {
  //
  // }
  //
  // /**
  //  * @param {Request} req
  //  * @param {Response} res
  //  * @param {Function} next
  //  */
  // requestPasswordReset (req, res, next) {
  //
  // }
  //
  // /**
  //  * @param {Request} req
  //  * @param {Response} res
  //  * @param {Function} next
  //  */
  // verifyResetToken (req, res, next) {
  //
  // }

}

module.exports = AuthService;