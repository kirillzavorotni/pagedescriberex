/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.API_PORT || 3000;

app.use('/api/', require('./routes'));

app.all('*', (req, res) => {
    res.status(404).send({ error: 'Unknown url requested' });
});

app.listen(port, () => {
    console.log(`Server started at ${port} port`);
});
