const path = require('path');
const fs = require('fs');
const { authenticator } = require('otplib');

const otpDirectory = path.resolve('./otpkeys');

const require2faMiddleware = async (req, res, next) => {
    try {
        const username = req.user.email;
        const fileName = Buffer.from(username).toString('base64').substring(0, 6);
        const secretPath = path.join(otpDirectory, fileName);

        if (!fs.existsSync(secretPath)) {
            return res.status(403).json({ 
                error: 'Vous devez configurer l\'authentification à deux facteurs pour créer un post.',
                require2fa: true 
            });
        }

        next();
    } catch (error) {
        console.error('Erreur dans le middleware 2FA:', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

module.exports = require2faMiddleware;
