const express = require('express');
require('dotenv').config();
const app = express();
const routes = require('./routes');

app.use(express.json());

app.use('/api', routes); 

app.get('/', (req, res) => {
    res.send('Test');
});

app.listen(4000, () => {
    console.log(`✅ Server OK on port 4000`);
});
