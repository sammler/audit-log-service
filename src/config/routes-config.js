const express = require('express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const pkg = require('./../../package.json');

const healthCheckRoutes = require('./../modules/health-check/health-check.routes.js');
const logsRoutes = require('./../modules/logs/logs.routes');

function init(app) {
  const router = express.Router(); // eslint-disable-line new-cap

  // /health-check
  app.use('/', healthCheckRoutes);

  // /logs
  app.use('/v1/logs', logsRoutes);

  // /api-docs
  const swaggerDoc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './api-docs.yml'), 'utf8'));
  swaggerDoc.info.version = pkg.version;
  app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.use('/', router);
}

module.exports = {
  init
};
