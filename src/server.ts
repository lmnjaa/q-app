import * as express from 'express';
import * as dotenv from 'dotenv';

// Configure dotenvnp
dotenv.config();

// Create express app
const app = express();

// Configure routes and middleware

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));