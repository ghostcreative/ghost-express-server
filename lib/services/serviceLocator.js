'use strict';
const AuthServiceFactory = require('./auth/authServiceFactory');
const PermissionServiceFactory = require('./permission/permissionServiceFactory');

class ServiceLocator {

  constructor (config) {
    if (!this._config) {
      this._config = config;
    }
  }

  /**
   * @returns {AuthService}
   */
  getAuthService () {
    if (!this._authService) {
      if (!this._config.get('auth')) throw new Error('GhostExpressServerError: ServiceLocator.getAuthService - No auth config set.');
      this._authService = AuthServiceFactory.create(this._config.get('auth'), this.getDbService());
    }
    return this._authService;
  }

  /**
   * @returns {GhostSequelize}
   */
  getDbService () {
    if (!this._dbService) {
      if (!this._config.get('sequelize')) throw new Error('GhostExpressServerError: ServiceLocator.getDbService - No sequelize config set.');
      const GhostSequelize = require('ghost-sequelize');
      this._dbService = new GhostSequelize(this._config.get('sequelize'));
    }
    return this._dbService;
  }

  /**
   * @returns {PermissionService}
   */
  getPermissionService () {
    if (!this._permissionService) {
      if (!this._config.get('auth')) throw new Error('GhostExpressServerError: ServiceLocator.getPermissionService - No auth config set.');
      this._permissionService = PermissionServiceFactory.create({}, this.getDbService());
    }
    return this._permissionService;
  }

  /**
   * @param {GhostSequelize} dbService
   */
  setDbService (dbService) {
    this._dbService = dbService;
  }

}

module.exports = ServiceLocator;