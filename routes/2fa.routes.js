const { Router } = require('express');
const { generateQRCode, verifyTOTP, displayQR } = require('../controllers/2fa.controllers');
const UserMiddleware = require('../middlewares/User.middleware');

const router = Router();

router.get('/setup', UserMiddleware, generateQRCode);
router.post('/verify', UserMiddleware, verifyTOTP);
router.get('/qrcode', UserMiddleware, displayQR)

 module.exports = router;
