'use strict';
const _ = require('lodash');
const Config = require('config');
const ghostExpressServer = require('./GhostExpressServer');

class GhostExpressServerFactory {

  /**
   * @name GhostExpress_ServerErrorConfig
   * @type {Object}
   * @property {Boolean} dumpExceptions
   * @property {String} showStack
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
   * @property {Boolean} allowCrossDomain
   * @property {GhostExpress_ServerTemplateConfig} template
   * @property {GhostExpress_ServerPluginsConfig} plugins
   */

  /**
   * @param {GhostExpress_ServerConfig} config
   * @returns {GhostExpressServer}
   */
  create (config) {

  }

  /**
   * @param {GhostExpress_ServerConfig} config
   * @returns {GhostExpress_ServerConfig}
   */
  _setDefaultConfig (config) {
    return _.defaultsDeep(config, Config.get('server'))
  }

}

module.exports = GhostExpressServerFactory;