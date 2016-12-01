const Handlebars = require('express-handlebars');
const Promise = require('bluebird');

class HandlebarsSetup {

  /**
   * @param {GhostExpress_ServerTemplateConfig} config
   * @param {Express} app
   * @returns {Promise<Express,Error>}
   */
  static configure (config, app) {
    return Promise.resolve()
    .then(() => {
      const handlebars = HandlebarsSetup._initHandlebars(config);
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