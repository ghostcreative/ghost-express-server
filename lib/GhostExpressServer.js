'use strict';
const Promise = require('bluebird');
const _ = require('lodash');
const Colors = require('colors');
const Emoji = require('node-emoji');
const Util = require('./util/util');
const Http = require('http');

class GhostExpressServer {

  /**
   * @param {Express} server
   * @param {ServiceLocator} serviceLocator
   */
  constructor (server, serviceLocator) {
    this._server = server;
    this._serviceLocator = serviceLocator;

    this.auth = this._serviceLocator.getAuthService();
  }

  /**
   * @return {Express}
   */
  getServerInstance () {
    return this._server;
  }

  start () {
    console.info(Emoji.emojify(`:baby:  starting...`));
    return Promise.resolve()
    .then(() => Http.createServer(this._server).listen(this._server.get('port'), () => { console.info(Emoji.emojify(`:ghost:  running on port ${this._server.get('port')}`).green); }))
    .then(server => {
      this._httpServer = server;
      this._httpServer.on('close', () => { console.info(Emoji.emojify(`:skull_and_crossbones:  closed`.red)) });
      return this._httpServer;
    })
  }

  stop () {
    this._httpServer.close();
  }

  // app.use wrapper - http://expressjs.com/en/api.html#app.use
  useMiddleware (pathOrMiddleware, middleware) {
    this._server.use(pathOrMiddleware, middleware);
  }

  useRouter (pathOrMiddleware, middleware) {
    if (middleware.register) this._server.use(pathOrMiddleware, this._registerGhostRouter(middleware));
    else this._server.use(pathOrMiddleware, middleware);
  }

  /**
   * @param {GhostRouter} router
   * @returns {Express.Router}
   * @private
   */
  _registerGhostRouter (router) {
    router.setAuthService = this._serviceLocator.getAuthService();
    router.setPermissionService = this._serviceLocator.getPermissionService();
    return router.register();
  }

}

module.exports = GhostExpressServer;