# Ghost Express Server 

## Installation

`npm install ghost-express-server --save`

## Overview

### Config (default listed below)

```json
{
  "server": {
    "core": {
      "allowCrossDomain": false,
      "bodyParser": {
        "sizeLimit": "50mb",
        "extended": false
      },
      "enable": ["trust proxy"],
      "port": 4000,
      "staticAssets": {
        "enabled": false,
        "staticDir": "-- DEFAULT STATIC DIR --"
      }

    },

    "error": {
      "dumpExceptions": true,
      "showStack": true
    },

    "logger": {
      "console": {
        "enabled": true,
        "json": true
      },
      "logentries": {
        "enabled": false,
        "token": "-- DEFAULT LOGENTRIES TOKEN --"
      }
    },

    "plugins": {
      "prerender": {
        "enabled": false,
        "token": "-- DEFAULT PRERENDER TOKEN --"
      }
    },

    "template": {
      "enabled": false
    }
  }
}
```

There are three steps to getting the server up and running.
 
### 1. Require 

```js
const GhostExpressServer = require('ghost-express-server');
// Easy enough
```

### 2. Create

```js
GhostExpressServer.create(config)
.then(server => { ... }) 
// See config above
```

### 3. Start

```js
GhostExpressServer.create(config)
.then(server => server.start()) 
// Make servers great again
```