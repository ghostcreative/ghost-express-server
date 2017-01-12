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
   * @param {Sequelize} db
   * @return {PermissionService}
   */
  static create (options, db) {
    const attachFn = PermissionServiceFactory.resolveAttachFn(options.attachFn, db);
    const validateFn = PermissionServiceFactory.resolveValidateFn(options.validateFn, db);
    return new PermissionService({ attachFn, validateFn });
  }

  /**
   * @param {Function} [attachFn]
   * @param {Sequelize} [db]
   * @return {Function}
   */
  static resolveAttachFn (attachFn, db) {
    if (attachFn) return attachFn;
    if (!attachFn && !db) throw new Error('GhostExpressServerError: PermissionServiceFactory.resolveAttachFn - Missing attachFn and database.');

    DefaultAttachFn.registerDb(db);
    return DefaultAttachFn;
  }

  /**
   * @param {Function} [validateFn]
   * @param {Sequelize} [db]
   * @return {Function}
   */
  static resolveValidateFn (validateFn, db) {
    if (validateFn) return validateFn;
    if (!validateFn && !db) throw new Error('GhostExpressServerError: PermissionServiceFactory.resolveValidateFn - Missing validateFn and database.');

    DefaultValidateFn.registerDb(db);
    return DefaultValidateFn;
  }

}

module.exports = PermissionServiceFactory;