const { signup, login, logout } = require("../controllers/User.controllers");
const UserMiddleware = require('../middlewares/User.middleware');
const express = require('express');
const router = express.Router();

// router.post('/signup', UserMiddleware, signup);
// router.post('/login', UserMiddleware, login);
// router.post('/logout', UserMiddleware, logout);

router.post('/signup', signup);
router.post('/login', login);
router.get('/current_user', UserMiddleware, (req, res) => { res.status(200).json(req.user); });
module.exports = router;