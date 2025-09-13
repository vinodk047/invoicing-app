const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const invoiceRoutes = require('./routes/invoices');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/invoices', invoiceRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
