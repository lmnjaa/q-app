import * as express from 'express';
import * as dotenv from 'dotenv';
import { routes } from './routes/routes';

// Configure dotenvnp
dotenv.config();

// Create express app
const app = express();

// Configure routes and middleware
app.use(routes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));