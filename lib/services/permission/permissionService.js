'use strict';

const _ = require('lodash');

class PermissionService {

  /**
   * @param {GhostExpressRouter_PermissionServiceConfig} options
   */
  constructor (options) {
    this._attachFn = options.attachFn;
    this._validateFn = options.validateFn;
  }

  /**
   * @param {Object} strategyOptions
   * @param {String} strategyOptions.method
   * @param {'bearerJwt'} strategyOptions.plugin
   * @param {Object} strategyOptions.override
   */
  strategy (strategyOptions = {}) {
    if (strategyOptions.method == 'attach') {
      this._attachFn = strategyOptions.override;
    } else if (strategyOptions.method == 'permit') {
      this._validateFn = strategyOptions.override;
    }
  }

  attach (req, res) {
    return this._attachFn.execute(req, res);
  }

  /**
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  permit (req, res) {
    return this._validateFn.execute(req, res)
    .catch(err => {
      if (_.has(req.routeOptions, 'auth.required') && req.routeOptions.auth.required === false) [];
      else throw err;
    })
  }

}

module.exports = PermissionService;