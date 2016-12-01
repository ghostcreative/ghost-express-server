const express               = require('express');
const bodyParser            = require('body-parser');
const cookieParser          = require('cookie-parser');
const errorHandler          = require('errorhandler');
const expressWinston        = require('express-winston');
const Logentries            = require('winston-logentries');
const winston               = require('winston');
const expressValidator      = require('express-validator');
const methodOverride        = require('method-override');
const path                  = require('path');
const config                = require('config');
const http                  = require('http');
const validators            = require('../middleware/validators/expressValidator');
const app                   = express();

console.info(`Creating express server with NODE_ENV:${config.util.getEnv('NODE_ENV')} and NODE_APP_INSTANCE:${process.env.NODE_APP_INSTANCE || 'default'}`);

// const handlebars = require('express-handlebars').create({
//   layoutsDir: path.resolve(__dirname, '../templates/views/layouts'),
//   partialsDir: path.join(__dirname, "views/partials"),
//   defaultLayout: 'main',
//   extname: 'hbs'
// });
//
// app.engine('hbs', handlebars.engine);
// app.set('view engine', 'hbs');
// app.set('views', path.resolve(__dirname, '../templates/views'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
// app.use(expressValidator(validators));

app.use(require('../middleware/auth/authTkn'));
app.use(require('../middleware/crossDomain/allowCrossDomain'));
//app.use(require('prerender-node').set('prerenderToken', config.get('server.plugins.prerender')));
app.use(require('http-responses'));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../../web/public')));
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

app.set('port', config.get("server.port"));
app.enable('trust proxy');

if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({ colorize: true }),
      new winston.transports.Logentries({token: config.get('server.plugins.logEntriesKey') })
    ]
  }));
}

module.exports = app;