'use strict';
const _ = require('lodash');
const GhostLogger = require('ghost-logger');

const AuthServiceFactory = require('./auth/authServiceFactory');
const PermissionServiceFactory = require('./permission/permissionServiceFactory');

class ServiceLocator {

  constructor (config) {
    if (!this._config) {
      this._config = config;
    }

    this._sequelizeServices = {};
  }

  /**
   * @param {String} configPath
   * @returns {Config}
   */
  getConfig (configPath) {
    return this._config.get(configPath);
  }

  /**
   * @returns {AuthService}
   */
  getAuthService () {
    if (!this._authService) {
      if (!this._config.get('auth')) throw new Error('GhostExpressServerError: ServiceLocator.getAuthService - No auth config set.');
      this._authService = AuthServiceFactory.create(
        this._config.get('auth'),
        this.getSequelizeService('authorization'),
        this.getSequelizeService('profile'),
        this.getSequelizeService('user'),
        this.getSequelizeService('userRole'),
        this.getSequelizeService('role')
      );
    }
    return this._authService;
  }

  /**
   * @returns {PermissionService}
   */
  getPermissionService () {
    if (!this._permissionService) {
      if (!this._config.get('auth')) throw new Error('GhostExpressServerError: ServiceLocator.getPermissionService - No auth config set.');
      this._permissionService = PermissionServiceFactory.create(
        {},
        this.getSequelizeService('permission'),
        this.getSequelizeService('role'),
        this.getSequelizeService('rolePermission'),
        this.getSequelizeService('modelScope')
      );
    }
    return this._permissionService;
  }

  /**
   * @returns {GhostLogger}
   */
  getLogger () {
    if (!this._logger) {
      if (!this._config.get('logger')) throw new Error('GhostExpressServerError: ServiceLocator.getLogger - No logger config set.');
      this._logger = new GhostLogger(this._config.get('logger'));
    }
    return this._logger;
  }

  /**
   * @param {String} name
   * @returns {Sequelize.Model}
   */
  getSequelizeService (name) {
    return this._sequelizeServices[name]
  }

  /**
   * @param {Sequelize.Model} service
   */
  setSequelizeService (service) {
    if (!_.hasIn(service, 'model.name')) throw new Error('GhostExpressServerError: ServiceLocator.setSequelizeService - No sequelize model set in provided service.');
    this._sequelizeServices[service.model.name] = service;
  }

}

module.exports = ServiceLocator;