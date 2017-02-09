const Promise = require('bluebird');
const _ = require('lodash');
const Moment = require('moment');
const Bcrypt = require('bcryptjs');

const RegisterFunc = {

  execute: (req, res) => {
    return Promise.resolve()
    .then(() => this._profileService.findOne({ where: { email: req.body.email } }))
    .then(profile => {
      if (profile) throw new res.BadRequest({ mesage: 'That email is already registered to an account, please login.' });
      return this._profileService.create({ email: req.body.email, name: req.body.name });
    })
    .then(profile => {
      return this._userService.create({
        email: profile.email,
        profileId: profile.id,
        name: profile.name,
        role: req.params.role,
        hash: Bcrypt.hashSync(req.body.password, 10)
      });
    })
    .tap(user => {
      this._authorizationService.create({
        userId: user.id,
        role: user.role,
        remoteAddress: req.ip,
        type: 'registration'
      })
    });
  },

  registerAuthorizationService: (service) => {
    this._authorizationService = service;
  },

  registerUserService: (service) => {
    this._userService = service;
  },

  registerProfileService: (service) => {
    this._profileService = service;
  }

};

module.exports = RegisterFunc;