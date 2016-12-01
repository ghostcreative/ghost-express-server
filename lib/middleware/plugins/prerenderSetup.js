const Prerender = require('prerender-node');
const Promise = require('bluebird');

class PrerenderSetup {

  /**
   * @param {String} token
   * @returns {Promise<Express,Error>}
   */
  static configure (token) {
    return Promise.resolve()
    .then(() => {
      app.use(Prerender.set('prerenderToken', token));
      return app;
    })
  }

}

module.exports = PrerenderSetup;