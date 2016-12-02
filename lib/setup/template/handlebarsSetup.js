const Handlebars = require('express-handlebars');
const Promise = require('bluebird');

class HandlebarsSetup {

  /**
   * @param {GhostExpress_ServerTemplateConfig} config
   * @param {Express} app
   * @returns {Promise<Express,Error>}
   */
  static configure (config, app) {
    if (!config.enabled) return Promise.resolve();
    return Promise.resolve()
    .then(() => HandlebarsSetup._initHandlebars(config))
    .then(handlebars => {
      app.engine('hbs', handlebars.engine);
      app.set('view engine', 'hbs');
      app.set('views', config.templatesDir);
      return app;
    })
  }

  /**
   * @param {GhostExpress_ServerTemplateConfig} config
   * @returns {Handlebars}
   */
  static _initHandlebars (config) {
    return Promise.resolve()
    .then(() => {
      return Handlebars.create({
        layoutsDir: config.layoutsDir,
        partialsDir: config.partialsDir,
        defaultLayout: config.defaultLayout,
        extname: config.extname
      });
    })
  }

}

module.exports = HandlebarsSetup;