const express = require('express');
const router = express.Router();

router.get('/api', (req, res) => {
    res.send('API Route');
});

const blogRoutes = require('./blog.routes');
router.use('/blog', blogRoutes); 

const UserRoute = require('./User.routes');
router.use('/user', UserRoute);

const FaRoutes = require('./2fa.routes');
router.use('/2fa', FaRoutes);
module.exports = router;
