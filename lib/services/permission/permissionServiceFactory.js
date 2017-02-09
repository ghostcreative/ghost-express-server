'use strict';
const DefaultAttachFn = require('./defaults/attachFunc');
const DefaultValidateFn = require('./defaults/validateFunc');

const PermissionService = require('./permissionService');

class PermissionServiceFactory {

  /**
   *  @name GhostExpressServer_PermissionServiceConfig
   *	@type {Object}
   *  @property {Function} attachFn
   *  @property {Function} validateFn
   */

  /**
   * @param {GhostExpressServer_PermissionServiceConfig} options
   * @param {Sequelize.Model} [permissionService]
   * @param {Sequelize.Model} [roleService]
   * @param {Sequelize.Model} [rolePermissionService]
   * @param {Sequelize.Model} [modelScopeService]
   * @return {PermissionService}
   */
  static create (options, permissionService, roleService, rolePermissionService, modelScopeService) {
    const attachFn = PermissionServiceFactory.resolveAttachFn(options.attachFn, permissionService, roleService, modelScopeService);
    const validateFn = PermissionServiceFactory.resolveValidateFn(options.validateFn, permissionService, rolePermissionService, modelScopeService);
    return new PermissionService({ attachFn, validateFn });
  }

  /**
   * @param {Function} [attachFn]
   * @param {Sequelize.Model} [permissionService]
   * @param {Sequelize.Model} [roleService]
   * @param {Sequelize.Model} [modelScopeService]
   * @return {Function}
   */
  static resolveAttachFn (attachFn, permissionService, roleService, modelScopeService) {
    if (attachFn) return attachFn;
    if (!attachFn && !(permissionService && roleService && modelScopeService)) throw new Error('GhostExpressServerError: PermissionServiceFactory.resolveAttachFn - Missing attachFn and required services: [permissionService, roleService, modelScopeService].');

    DefaultAttachFn.registerPermissionService(permissionService);
    DefaultAttachFn.registerRoleService(roleService);
    DefaultAttachFn.registerModelScopeService(modelScopeService);
    return DefaultAttachFn;
  }

  /**
   * @param {Function} [validateFn]
   * @param {Sequelize.Model} [permissionService]
   * @param {Sequelize.Model} [rolePermissionService]
   * @param {Sequelize.Model} [modelScopeService]
   * @return {Function}
   */
  static resolveValidateFn (validateFn, permissionService, rolePermissionService, modelScopeService) {
    if (validateFn) return validateFn;
    if (!validateFn && !(permissionService && rolePermissionService && modelScopeService)) throw new Error('GhostExpressServerError: PermissionServiceFactory.resolveValidateFn - Missing validateFn and required services: [permissionService, rolePermissionService, modelScopeService].');

    DefaultValidateFn.registerPermissionService(permissionService);
    DefaultValidateFn.registerRolePermissionService(rolePermissionService);
    DefaultValidateFn.registerModelScopeService(modelScopeService);
    return DefaultValidateFn;
  }

}

module.exports = PermissionServiceFactory;