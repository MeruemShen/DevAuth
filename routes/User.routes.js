const { signup, login } = require("../controllers/User.controllers");
const UserMiddleware = require('../middlewares/User.middleware');
const express = require('express');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/current_user', UserMiddleware, (req, res) => { res.status(200).json(req.user); });
router.post('/expired_token')
module.exports = router;