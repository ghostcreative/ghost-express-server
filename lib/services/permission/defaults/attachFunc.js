const _ = require('lodash');

const AttachFunc = {

  execute: (req, res) => {
    const assignedPermissions = _.keys(req.routeOptions.auth.permissions);

    return this._permissionService.findAll({
      where: {
        name: { $in: [assignedPermissions] }
      },
      include: [
        { model: this._roleService.model, where: { name: req.creds.role }, required: true },
        { model: this._modelScopeService.model }
      ]
    })
    .then(permissions => {
      if (_.isEmpty(permissions)) throw new Error(`Missing permissions. One of the following required: ${assignedPermissions.toString()}`);
      return permissions;
    })
  },

  registerPermissionService: (service) => {
    this._permissionService = service;
  },

  registerRoleService: (service) => {
    this._roleService = service;
  },

  registerModelScopeService: (service) => {
    this._modelScopeService = service;
  }

};

module.exports = AttachFunc;