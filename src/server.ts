import * as express from 'express';
import * as dotenv from 'dotenv';
import { routes } from './routes/routes';
import * as dbConnect from './db/dbConnection';

// Configure dotenvnp
dotenv.config();

// Db connection
dbConnect.DbConnection.initDb();

// Create express app
const app = express();

// Configure routes and middleware
app.use(routes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));