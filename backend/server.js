import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
config();

import invoiceRoutes from './routes/invoices.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/invoices', invoiceRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
