'use strict';
const _ = require('lodash');
const Config = require('config');
const Express = require('express');
const Promise = require('bluebird');
const GhostExpressServer = require('./GhostExpressServer');

class GhostExpressServerFactory {

  /**
   * @name GhostExpress_ServerBodyParserConfig
   * @type {Object}
   * @property {String} sizeLimit
   * @property {Boolean} extended
   */

  /**
   * @name GhostExpress_ServerStaticAssetsConfig
   * @type {Object}
   * @property {Boolean} enabled
   * @property {String} staticDir
   */

  /**
   * @name GhostExpress_ServerCoreConfig
   * @type {Object}
   * @property {Boolean} allowCrossDomain
   * @property {GhostExpress_ServerBodyParserConfig} bodyParser
   * @property {[String]} enable
   * @property {String} port
   * @property {GhostExpress_ServerStaticAssetsConfig} staticAssets
   */

  /**
   * @name GhostExpress_ServerErrorConfig
   * @type {Object}
   * @property {Boolean} dumpExceptions
   * @property {String} showStack
   */

  /**
   * @name GhostExpress_ServerLoggerConsoleConfig
   * @type {Object}
   * @property {Boolean} enabled
   * @property {Boolean} colorize
   */

  /**
   * @name GhostExpress_ServerLoggerLogentriesConfig
   * @type {Object}
   * @property {Boolean} enabled
   * @property {String} token
   */

  /**
   * @name GhostExpress_ServerLoggerConfig
   * @type {Object}
   * @property {GhostExpress_ServerLoggerConsoleConfig} console
   * @property {GhostExpress_ServerLoggerLogentriesConfig} logentries
   */

  /**
   * @name GhostExpress_ServerPluginsConfig
   * @type {Object}
   * @property {GhostExpress_ServerPrerenderConfig} prerender
   */

  /**
   * @name GhostExpress_ServerPrerenderConfig
   * @type {Object}
   * @property {Boolean} enabled
   * @property {String} token
   */

  /**
   * @name GhostExpress_ServerTemplateConfig
   * @type {Object}
   * @property {Boolean} enabled
   * @property {'handlebars'} engine
   * @property {String} templatesDir
   * @property {String} layoutsDir
   * @property {String} partialsDir
   * @property {String} defaultLayout
   * @property {String} extname
   */

  /**
   * @name GhostExpress_ServerConfig
   * @type {Object}
   * @property {GhostExpress_ServerCoreConfig} core
   * @property {GhostExpress_ServerErrorConfig} error
   * @property {GhostExpress_ServerLoggerConfig} logger
   * @property {GhostExpress_ServerPluginsConfig} plugins
   * @property {GhostExpress_ServerTemplateConfig} template
   */

  /**
   * @param {GhostExpress_ServerConfig} config
   * @returns {Express}
   */
  static create (config) {
    const ExpressServer = Express();
    return Promise.resolve()
    .then(this._initServerSetup(config, ExpressServer))
    .then(() => {
      return new GhostExpressServer(ExpressServer);
    })
  }

  /**
   * @param {GhostExpress_ServerConfig} config
   * @param {Express} server
   * @returns {[Promise]}
   */
  static _initServerSetup (config, server) {
    const coreSetup = require('./setup/core/coreSetup');
    const errorSetup = require('./setup/error/errorHandlerSetup');
    const loggerSetup = require('./setup/logger/loggerSetup');
    const prerenderSetup = require('./setup/plugins/prerenderSetup');
    const templateSetup = require('./setup/template/handlebarsSetup');
    const validationSetup = require('./setup/validation/validationSetup');

    return Promise.all([
      coreSetup.configure(config.core, server),
      errorSetup.configure(config.error, server),
      loggerSetup.configure(config.logger, server),
      prerenderSetup.configure(config.plugins.prerender, server),
      templateSetup.configure(config.template, server),
      validationSetup.configure(config.validation, server)
    ])
  }


  /**
   * @param {GhostExpress_ServerConfig} config
   * @returns {GhostExpress_ServerConfig}
   */
  static _setDefaultConfig (config) {
    return _.defaultsDeep(config, Config.get('server'))
  }

}

module.exports = GhostExpressServerFactory;