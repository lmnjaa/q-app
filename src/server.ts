import "reflect-metadata";

import * as express from 'express';
import * as dotenv from 'dotenv';

import router from './Routes/Routes';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import MysqlService from "./Services/MysqlService";

// Swagger
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJsonDocument from '../swagger.json';

// Configure dotenvnp
dotenv.config();

// Db connection
new MysqlService().setup();

// Create express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure routes and middleware
router(app);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsonDocument));

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log([`💾 SERVER successfully listening on port ${port}`]));