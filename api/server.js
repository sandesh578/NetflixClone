const dotenv = require('dotenv');
const log4js = require('log4js');
const path = require('path');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { decrypt } = require('./crypto/fileCrypto');

const logger = log4js.getLogger(`${path.basename(__filename).split('.')[0]}`);
dotenv.config({ path: './.config/.env.dev' });

const BACKEND_API_PORT = decrypt(process.env.BACKEND_API_PORT);

logger.info('Initiating server');

const app = express();
const Router = express.Router();

// Declaring Access Control
app.use(cors());
app.use(Router);

Router.use(express.urlencoded({ extended: false }));
Router.use(express.json());

const server = http.createServer(app);
server.listen(BACKEND_API_PORT);

logger.info(`server listening on port: ${BACKEND_API_PORT}`);

module.exports = { server, app, Router };
