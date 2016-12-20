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
   */
  constructor (server) {
    this._server = server;
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
    .tap(() => Util.listAllEndpoints(this._server._router.stack))
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
    this._server.use(pathOrMiddleware, middleware);
  }

}

module.exports = GhostExpressServer;