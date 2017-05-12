'use strict';
const _ = require('lodash');
const Config = require('config');
const Express = require('express');
const Promise = require('bluebird');
const ServiceLocatorFactory = require('./services/serviceLocatorFactory');
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
     * @property {[String]} directories
     */

    /**
     * @name GhostExpress_ServerAngularConfig
     * @type {Object}
     * @property {Boolean} enabled
     * @property {String} engineName
     * @property {String} baseUrl
     * @property {String} ngServerAppPath
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
     * @name GhostExpress_ServerLoggerLogglyConfig
     * @type {Object}
     * @property {Boolean} enabled
     * @property {String} token
     */

    /**
     * @name GhostExpress_ServerLoggerNewRelicConfig
     * @type {Object}
     * @property {Boolean} enabled
     * @property {String} level
     * @property {String} token
     * @property {String} subdomain
     * @property {String[]} tags
     */

    /**
     * @name GhostExpress_ServerLoggerConfig
     * @type {Object}
     * @property {GhostExpress_ServerLoggerConsoleConfig} console
     * @property {GhostExpress_ServerLoggerLogentriesConfig} logentries
     * @property {GhostExpress_ServerLoggerLogglyConfig} loggly
     * @property {GhostExpress_ServerLoggerNewRelicConfig} newrelic
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
     * @name GhostExpress_ServerRoutesConfig
     * @type {Object}
     * @property {Boolean} enabled
     * @property {String} path
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
     * @name GhostExpress_StaticAssetConfig
     * @type {Object}
     * @property {Boolean} enabled
     */

    /**
     * @name GhostExpress_ServerConfig
     * @type {Object}
     * @property {GhostExpress_ServerAngularConfig} angular
     * @property {GhostExpress_ServerCoreConfig} core
     * @property {GhostExpress_ServerErrorConfig} error
     * @property {GhostExpress_ServerLoggerConfig} logger
     * @property {GhostExpress_ServerPluginsConfig} plugins
     * @property {GhostExpress_ServerTemplateConfig} template
     * @property {GhostExpress_StaticAssetConfig} staticAssets
     */

    /**
     * @param {GhostExpress_ServerConfig} config
     * @returns {Promise.<Express.Server>}
     */
    static create (config) {
        const ExpressServer = Express();
        const ServiceLocator = ServiceLocatorFactory.getServiceLocatorSingleton(config);
        return Promise.resolve()
        .then(() => this._initServerSetup(config, ExpressServer, ServiceLocator))
        .then(() => {
            return new GhostExpressServer(ExpressServer, ServiceLocator);
        })
    }

    /**
     * @param {GhostExpress_ServerConfig} config
     * @param {Express} server
     * @param {ServiceLocator} serviceLocator
     * @returns {Promise.<[]>}
     */
    static _initServerSetup (config, server, serviceLocator) {
        const angularSetup = require('./setup/angular/angularSetup');
        const coreSetup = require('./setup/core/coreSetup');
        const loggerSetup = require('./setup/logger/loggerSetup');
        const prerenderSetup = require('./setup/plugins/prerenderSetup');
        const staticAssetSetup = require('./setup/staticAssets/staticAssetSetup');
        const templateSetup = require('./setup/template/handlebarsSetup');

        return Promise.all([
            angularSetup.configure(config.angular, server, serviceLocator.getLogger()),
            coreSetup.configure(config.core, server, serviceLocator.getLogger()),
            loggerSetup.configure(config.logger, server, serviceLocator.getLogger()),
            prerenderSetup.configure(config.plugins.prerender, server, serviceLocator.getLogger()),
            staticAssetSetup.configure(config.staticAssets, server, serviceLocator.getLogger()),
            templateSetup.configure(config.template, server, serviceLocator.getLogger())
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