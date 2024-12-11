const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');

const routes = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes); 

app.get('/', (req, res) => {
    res.send('Test');
});

app.listen(4000, () => {
    console.log(`✅ Server OK on port 4000`);
});
