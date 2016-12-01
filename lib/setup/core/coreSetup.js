const Promise = require('bluebird');
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser')();
const Express = require('express');
const HttpResponses = require('http-responses');

class CoreSetup {

  /**
   * @param {GhostExpress_ServerCoreConfig} config
   * @param {Express} app
   * @returns {Promise<Express,Error>}
   */
  static configure (config, app) {
    return Promise.resolve()
    .then(() => {
      app.use(CoreSetup._initBodyParser(config.bodyParser));
      app.use(CookieParser);
      app.use(HttpResponses);
      app.set(config.port);
      CoreSetup._handleEnables(app, config.enable);
      if (config.staticAssets.enabled) app.use(Express.static(config.staticAssets.staticDir));
      if (config.allowCrossDomain) app.use(CoreSetup.allowCrossDomain);
      return app;
    })
  }

  static _handleEnables (app, enables) {
    enables.forEach(enable => app.enable(enable))
  }

  static _initBodyParser (config) {
    BodyParser.json({ limit: config.sizeLimit });
    BodyParser.urlencoded({ limit: config.sizeLimit, extended: config.extended });
    return BodyParser;
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