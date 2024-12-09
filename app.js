const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('test');
});

app.listen(4000, () => {
    console.log(`✅ Server OK on port 4000`);
});
