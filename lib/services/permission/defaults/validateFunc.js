const _ = require('lodash');

const ValidateFunc = {

  execute: (req, res) => {

    function _credPropMatchesParam (credential, request, propToCheck) {
      let matches = true;
      if (request.query[propToCheck]) {
        matches = (request.query[propToCheck] == credential);
        if (!matches) return matches;
      }
      if (request.params[propToCheck]) {
        matches = (request.params[propToCheck] == credential);
        if (!matches) return matches;
      }
      if (request.body[propToCheck]) {
        matches = (request.body[propToCheck] == credential);
        if (!matches) return matches;
      }
      if (request.body.doc && request.body.doc[propToCheck]) {
        matches = (request.body.doc[propToCheck] == credential);
        if (!matches) return matches;
      }
      return matches;
    }

    return this._permissionService.findAll({
      where: {
        name: { $in: [req.routeOptions.auth.permissions] }
      },
      include: [
        { model: this._rolePermissionService.model, where: { roleName: req.creds.role }, required: true },
        { model: this._modelScopeService.model }
      ]
    })
    .then(permissions => {
      if (_.isEmpty(permissions)) throw new Error(`You do not have permission to perform this action.`);
      return _.map(permissions, permission => {
        if (_.has(permission.toJSON(), 'modelScope.scopePropFromCred')) {
          const propToCheck = _.camelCase(permission.modelScope.scopePropFromCred);
          if (!_credPropMatchesParam(_.head(_.at(req.creds, permission.modelScope.scopePropFromCred)), req, propToCheck)) throw new Error(`You do not have permission to perform this action.`);
        }
        return permission.get({ plain: true });
      });
    })
    .catch(err => {
      if (_.has(req.routeOptions, 'auth.options.requirePermissions') && req.routeOptions.auth.options.requirePermissions === false) return permissions;
      else throw err;
    })
  },

  registerPermissionService: (service) => {
    this._permissionService = service;
  },

  registerRolePermissionService: (service) => {
    this._rolePermissionService = service;
  },

  registerModelScopeService: (service) => {
    this._modelScopeService = service;
  }


};

module.exports = ValidateFunc;
