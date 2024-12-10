const express = require('express');
const router = express.Router();

router.get('/api', (req, res) => {
    res.send('API Route');
});

const blogRoutes = require('./blog.routes');
router.use('/blog', blogRoutes); 

const UserRoute = require('./User.routes');
router.use('/User', UserRoute);

module.exports = router;
