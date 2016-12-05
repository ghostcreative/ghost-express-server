const Promise = require('bluebird');
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser')();
const Express = require('express');
const HttpResponses = require('http-responses');

class CoreSetup {

  /**
   * @param {GhostExpress_ServerCoreConfig} config
   * @param {Express} server
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server) {
    return Promise.resolve()
    .then(() => {
      server.use(BodyParser.json({ limit: config.bodyParser.sizeLimit }));
      server.use(BodyParser.urlencoded({ limit: config.bodyParser.sizeLimit, extended: config.bodyParser.extended }));
      server.use(CookieParser);
      server.use(HttpResponses);
      server.set('port', config.port);
      CoreSetup._handleEnables(server, config.enable);
      if (config.staticAssets.enabled) server.use(Express.static(config.staticAssets.staticDir));
      if (config.allowCrossDomain) server.use(CoreSetup.allowCrossDomain);
      return server;
    })
  }

  static _handleEnables (server, enables) {
    enables.forEach(enable => server.enable(enable))
  }

  static allowCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-type, authorization, x-requested-with, x-ylift-anonymous-id, x-gc-anonymous-id');
    next();
  };

}

module.exports = CoreSetup;