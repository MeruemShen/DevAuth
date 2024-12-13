const path = require('path');
const fs = require('fs');
const { authenticator } = require('otplib');

const otpDirectory = path.resolve('./otpkeys');

module.exports = async (req, res, next) => {
    try {
        const { twoFactorCode } = req.body;
        const username = req.user.email;

        if (!twoFactorCode) {
            return res.status(400).json({ error: 'Le code 2FA est requis.' });
        }

        const fileName = Buffer.from(username).toString('base64').substring(0, 6);
        const secretPath = path.join(otpDirectory, fileName);
        
        if (!fs.existsSync(secretPath)) {
            return res.status(500).json({ error: 'Secret 2FA introuvable pour cet utilisateur.' });
        }

        const authenticatorSecret = fs.readFileSync(secretPath, 'utf-8');

        const isValid = authenticator.verify({ token: twoFactorCode, secret: authenticatorSecret });

        if (!isValid) {
            return res.status(401).json({ error: 'Code 2FA invalide.' });
        }

        next();
    } catch (error) {
        console.error('Erreur lors de la vérification du code 2FA :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

