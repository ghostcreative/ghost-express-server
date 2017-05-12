const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const AngularExpressEngine = require('@nguniversal/express-engine');
const AngularCore = require('@angular/core');

class AngularSetup {

    /**
     * @param {GhostExpress_ServerAngularConfig} config
     * @param {Express} server
     * @param {GhostLogger} logger
     * @returns {Promise<Express,Error>}
     */
    static configure (config, server, logger) {
        return Promise.resolve()
        .then(() => {
            AngularCore.enableProdMode();
            const appPath = path.resolve(__dirname, config.ngServerAppPath);
            console.log('apptPath', appPath);
            const NgServerApp = require(appPath);
            server.engine(
                config.engineName,
                AngularExpressEngine.ngExpressEngine({
                    bootstrap: NgServerApp
                })
            );
            return server;
        })
        .catch(err => {
            logger.error('GhostExpressServerError: AngularSetup.configure', err);
            throw new Error('GhostExpressServerError: AngularSetup.configure failed');
        })
    }

}

module.exports = AngularSetup;