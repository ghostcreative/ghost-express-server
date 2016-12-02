'use strict';
const _ = require('lodash');
const Colors = require('colors');
const Emoji = require('node-emoji');

const Http = require('http');

class GhostExpressServer {

  /**
   * @param {Express} server
   */
  constructor (server) {
    this._server = server;
    this._server.on('connect', console.info(Emoji.emojify(`Ghost express server running on port ${this._server.get('port')}. :ghost :champagne`)))
    this._server.on('close', console.info(Emoji.emojify(`Ghost express server closed. :skull_and_crossbones`)))
  }

  start () {
    console.info(Emoji.emojify(`Ghost express server starting...`));
    return Promise.resolve()
    .then(() => Http.createServer(this._server).listen(this._server.get('port')))
    .then(server => this._httpServer = server)
  }

  stop () {
    return this._httpServer.close();
  }

  useMiddleware (middleware) {
    this._server.use(middleware);
  }

  useRouter (router) {
    this._server.use(router);
  }

}

module.exports = GhostExpressServer;