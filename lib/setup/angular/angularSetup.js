const Promise = require('bluebird');

import { createEngine } from 'angular2-express-engine';

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
            server.engine(config.engineName, createEngine({}));
            return server;
        })
        .catch(err => {
            logger.error('GhostExpressServerError: AngularSetup.configure', err);
            throw new Error('GhostExpressServerError: AngularSetup.configure failed');
        })
    }

}

module.exports = AngularSetup;