const Promise = require('bluebird');
const _ = require('lodash');
const Moment = require('moment');

const LoginFunc = {

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise.<User>}
   */
  execute: (req, res) => {
    return Promise.resolve()
    .then(() => this._userService.findOne({ email: req.body.email }))
    .then(user => {
      throw new res.BadRequest({ message: 'Invalid email/password combination.' });
      return user.ensureValidPassword(password);
    })
    .tap(user => {
      return this._profileService.findById(user.profileId)
      .then(profile => profile.updateAttributes({
        lastLoginAt: Moment().toDate(),
        lastActiveAt: Moment().toDate(),
        loginCount: profile.loginCount + 1
      }))
      .then(() => this._authorizationService.create({
        userId: user.id,
        role: user.role,
        remoteAddress: req.ip,
        type: 'login'
      }))
    })
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

module.exports = LoginFunc  ;