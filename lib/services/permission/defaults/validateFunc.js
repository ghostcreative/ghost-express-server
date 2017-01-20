const _ = require('lodash');

const ValidateFunc = {

  execute: (req, res) => {
    return this._db.permission.findAll({
      where: {
        name: { $in: [req.routeOptions.auth.permissions] }
      },
      include: [
        { model: this._db.rolePermission, where: { roleName: req.creds.role }, required: true },
        { model: this._db.modelScope }
      ]
    })
    .then(permissions => {
      if (_.isEmpty(permissions)) throw new Error(`You do not have permission to perform this action.`);
      _.each(permissions, permission => {
        if (_.has(permission, 'modelScope.scopePropFromCred')) {
          const propToCheck = _.camelCase(permission.modelScope.scopePropFromCred);
          if (!this._credPropMatchesParam(_.head(_.at(req.creds, permission.modelScope.scopePropFromCred)), req.query, propToCheck)) throw new Error(`You do not have permission to perform this action.`);
          else if (!this._credPropMatchesParam(_.head(_.at(req.creds, permission.modelScope.scopePropFromCred)), req.params, propToCheck)) throw new Error(`You do not have permission to perform this action.`);
          else if (!this._credPropMatchesParam(_.head(_.at(req.creds, permission.modelScope.scopePropFromCred)), req.body, propToCheck)) throw new Error(`You do not have permission to perform this action.`);
        }
      });
      return permissions;
    })
  },

  registerDb: (db) => {
    this._db = db;
  },

  _credPropMatchesParam: (credential, params, propToCheck) => {
    return credential == params[propToCheck]
  }


};

module.exports = ValidateFunc;