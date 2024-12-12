const { signup, login } = require("../controllers/User.controllers");
const UserMiddleware = require('../middlewares/User.middleware');
const express = require('express');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;