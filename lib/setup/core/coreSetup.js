const _ = require('lodash');
const Promise = require('bluebird');
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser')();
const HttpResponses = require('http-responses');
const Boom = require('express-boom');

class CoreSetup {

  /**
   * @param {GhostExpress_ServerCoreConfig} config
   * @param {Express} server
   * @param {GhostLogger} logger
   * @returns {Promise<Express,Error>}
   */
  static configure (config, server, logger) {
    return Promise.resolve()
    .then(() => {
      if (_.has(config, 'bodyParser.json.enabled') && config.bodyParser.json.enabled) {
        server.use(config.bodyParser.json.path, BodyParser.json({ limit: config.bodyParser.sizeLimit }));
      }
      if (_.has(config, 'bodyParser.urlencoded.enabled') && config.bodyParser.urlencoded.enabled) {
        server.use(config.bodyParser.urlencoded.path, BodyParser.urlencoded({ limit: config.bodyParser.urlencoded.limit, extended: config.bodyParser.urlencoded.extended }));
      }
      server.use(CookieParser);
      server.use(HttpResponses);
      server.use(Boom());
      server.set('port', config.port);
      CoreSetup._handleEnables(server, config.enable);
      if (config.allowCrossDomain) server.use(CoreSetup.allowCrossDomain);
      return server;
    })
    .catch(err => {
      logger.error('GhostExpressServerError: CoreSetup.configure', err);
      throw new Error('GhostExpressServerError: CoreSetup.configure failed');
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