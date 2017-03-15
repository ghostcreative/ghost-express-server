'use strict';

const AuthService = require('./authService');
const BearerJwtPlugin = require('./plugins/bearerJwtPlugin');
const DefaultValidateFn = require('./defaults/validateFunc');
const DefaultLoginFn = require('./defaults/loginFunc');
const DefaultRegisterFn = require('./defaults/registerFunc');

class AuthServiceFactory {

  /**
   * @name GhostExpressRouter_AuthServiceConfig
   * @type {Object}
   * @property {String} authSecret
   * @property {'bearerJwt'} plugin
   * @property {Function} validateFn
   * @property {Function} loginFn
   * @property {Function} validateFn
   * @property {Function} registerFn
   */

  /**
   * @param {GhostExpressRouter_AuthServiceConfig} options
   * @param {Sequelize.Model} [authorizationService]
   * @param {Sequelize.Model} [profileService]
   * @param {Sequelize.Model} [userService]
   * @param {Sequelize.Model} [userRoleService]
   * @param {Sequelize.Model} [roleService]
   * @return {AuthService}
   */
 static create (options, authorizationService, profileService, userService, userRoleService, roleService) {
    const authPlugin = AuthServiceFactory.resolveAuthPlugin(options.plugin);
    const validateFn = AuthServiceFactory.resolveValidateFn(options.validateFn, userService, userRoleService, roleService, profileService);
    const loginFn = AuthServiceFactory.resolveLoginFn(options.loginFn, authorizationService, profileService, userService);
    const registerFn = AuthServiceFactory.resolveRegisterFn(options.registerFn, authorizationService, profileService, userService);
    return new AuthService(authPlugin, { validateFn, loginFn, registerFn, authSecret: options.authSecret });
  }

  static resolveAuthPlugin (plugin) {
    if (plugin == 'bearerJwt') return BearerJwtPlugin;

    throw new Error(`GhostExpressRouterError: AuthServiceFactory.resolveAuthPlugin - Unknown auth plugin "${plugin}"`);
  }

  /**
   * @param {Function} [validateFn]
   * @param {Sequelize.Model} [userService]
   * @param {Sequelize.Model} [userRoleService]
   * @param {Sequelize.Model} [roleService]
   * @param {Sequelize.Model} [profileService]
   * @return {Function}
   */
  static resolveValidateFn (validateFn, userService, userRoleService, roleService, profileService) {
    if (validateFn) return validateFn;
    if (!validateFn && !(userService && userRoleService && roleService && profileService)) throw new Error('GhostExpressRouterError: AuthServiceFactory.resolveValidateFn - Missing validateFn and required services: [userService, userRoleService, roleService, profileService].');

    DefaultValidateFn.registerUserService(userService);
    DefaultValidateFn.registerUserRoleService(userRoleService);
    DefaultValidateFn.registerRoleService(roleService);
    DefaultValidateFn.registerProfileService(profileService);
    return DefaultValidateFn;
  }

  /**
   * @param {Function} [loginFn]
   * @param {Sequelize.Model} [authorizationService]
   * @param {Sequelize.Model} [profileService]
   * @param {Sequelize.Model} [userService]
   * @return {Function}
   */
  static resolveLoginFn (loginFn, authorizationService, profileService, userService) {
    if (loginFn) return loginFn;
    if (!loginFn && !(authorizationService && profileService && userService)) throw new Error('GhostExpressRouterError: AuthServiceFactory.resolveLoginFn - Missing loginFn and required services: [authorizationService, profileService, userService].');

    DefaultLoginFn.registerAuthorizationService(authorizationService);
    DefaultLoginFn.registerProfileService(profileService);
    DefaultLoginFn.registerUserService(userService);
    return DefaultLoginFn;
  }

  /**
   * @param {Function} [registerFn]
   * @param {Sequelize.Model} [authorizationService]
   * @param {Sequelize.Model} [profileService]
   * @param {Sequelize.Model} [userService]
   * @return {Function}
   */
  static resolveRegisterFn (registerFn, authorizationService, profileService, userService) {
    if (registerFn) return registerFn;
    if (!registerFn && !(authorizationService && profileService && userService)) throw new Error('GhostExpressRouterError: AuthServiceFactory.resolveRegisterFn - Missing registerFn and required services: [authorizationService, profileService, userService].');

    DefaultRegisterFn.registerAuthorizationService(authorizationService);
    DefaultRegisterFn.registerProfileService(profileService);
    DefaultRegisterFn.registerUserService(userService);
    return DefaultRegisterFn;
  }

}

module.exports = AuthServiceFactory;