'use strict';

let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require(__dirname + '/config/env');

require(__dirname + '/routes/file-routes.js')(router);
require(__dirname + '/routes/user-routes.js')(router);

mongoose.connect(config.DB_PORT);
app.use(bodyParser.json());
app.use('/', router);

app.listen(config.PORT, () => {
  console.log('server started on port ' + config.PORT);
});
