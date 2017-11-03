const Promise = require('bluebird');
const Emoji = require('node-emoji');
const Http = require('http');

class GhostExpressServer {

    /**
     * @class GhostExpressServer
     * @constructor
     * @param {Express} server
     * @param {ServiceLocator} serviceLocator
     */
    constructor (server, serviceLocator) {
        this._server = server;
        this._serviceLocator = serviceLocator;
        this._logger = this._serviceLocator.getLogger();
    }

    /**
     * @return {Express}
     */
    getServerInstance () {
        return this._server;
    }

    start () {
        this._logger.info(Emoji.emojify(`:baby:  GhostExpressServer starting...`));
        return Promise.resolve()
        .then(() => this._setupTrailingMiddleware())
        .then(() => Http.createServer(this._server).listen(this._server.get('port'), () => {
            this._logger.info(Emoji.emojify(`:ghost:  GhostExpressServer running on port ${this._server.get('port')}`));
        }))
        .then(server => {
            this._httpServer = server;
            this._httpServer.on('close', () => { this._logger.info(Emoji.emojify(`:skull_and_crossbones:  GhostExpressServer closed`)) });
            return this._httpServer ;
        })
        .catch(err => {
            this._logger.error(Emoji.emojify('GhostExpressServerError: GhostExpressServer.start failed'), err);
            throw new Error(Emoji.emojify('GhostExpressServerError: GhostExpressServer.start failed'));
        })
    }

    stop () {
        this._httpServer.close();
    }

    useMiddleware (pathOrMiddleware, middleware) {
        this._server.use(pathOrMiddleware, middleware);
    }

    useRouter (pathOrMiddleware, middleware) {
        if (pathOrMiddleware.register) this._server.use(this._registerGhostRouter(pathOrMiddleware));
        else if (middleware && middleware.register) this._server.use(pathOrMiddleware, this._registerGhostRouter(middleware));
        else if (middleware) this._server.use(pathOrMiddleware, middleware);
        else this._server.use(pathOrMiddleware);
    }

    useSequelizeService (service) {
        this._serviceLocator.setSequelizeService(service);
    }

    _setupTrailingMiddleware () {
        const errorSetup = require('./setup/error/errorHandlerSetup');
        const routesSetup = require('./setup/routes/routesSetup');
        return Promise.all([
            routesSetup.configure(this._serviceLocator.getConfig('routes'), this, this._serviceLocator.getLogger()),
            errorSetup.configure(this._serviceLocator.getConfig('error'), this, this._serviceLocator.getLogger())
        ])
    }

    /**
     * @param {GhostExpressRouter} router
     * @returns {Express.Router}
     * @private
     */
    _registerGhostRouter (router) {
        router.authService = this._serviceLocator.getAuthService();
        router.permissionService = this._serviceLocator.getPermissionService();
        router.logger = this._logger;
        return router.register();
    }

}

module.exports = GhostExpressServer;
