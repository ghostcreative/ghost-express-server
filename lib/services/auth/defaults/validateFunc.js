const Promise = require('bluebird');
const _ = require('lodash');
const Moment = require('moment');

const ValidateFunc = {

  execute: (decoded) => {
    return Promise.resolve()
    .then(() => {
      if (!decoded.user || !decoded.expires || !decoded.role) {
        throw new Error('Malformed authorization token, please sign in.');
      }

      if (Moment(decoded.expires).isBefore(Moment())) {
        throw new Error('Authorization token has expired, please sign in.');
      }

      let user, profile, roles;
      return Promise.resolve()
      .then(() => this._userService.findById(decoded.user, { include: [{ model: this._profileService.model }] }))
      .tap(_user_ => user = _user_)
      .then(() => this._userRoleService.findOne({
        where: { userId: user.id },
        include: [{ model: this._roleService.model, where: { name: decoded.role }, required: true }]
      }))
      .then(userRole => {
        const role = userRole ? userRole.roleName : '';
        const creds = {};
        creds.user = _.clone(user.toJSON());
        creds.profile = _.clone(user.profile.toJSON());
        creds.role = _.clone(role);
        return creds;
      })

    })
  },

  registerUserService: (service) => {
    this._userService = service;
  },

  registerUserRoleService: (service) => {
    this._userRoleService = service;
  },

  registerRoleService: (service) => {
    this._roleService = service;
  },

  registerProfileService: (service) => {
    this._profileService = service;
  }

};

module.exports = ValidateFunc;