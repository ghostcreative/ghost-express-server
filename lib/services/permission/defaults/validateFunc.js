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
      return permissions;
    })
  },

  registerDb: (db) => {
    this._db = db;
  }

};

module.exports = ValidateFunc;