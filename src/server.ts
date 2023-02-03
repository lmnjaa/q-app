import "reflect-metadata";

import * as express from 'express';
import * as dotenv from 'dotenv';
import * as dbConnect from './Db/DBConnection';

import router from './Routes/Routes';
import bodyParser = require('body-parser');

// Configure dotenvnp
dotenv.config();

// Db connection
dbConnect.initDbConnection();

// Create express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Configure routes and middleware
router(app);

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`[SERVER] Server listening on port ${port}`));