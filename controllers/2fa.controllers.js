const { authenticator } = require('otplib');
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');

const otpDirectory = path.resolve('./otpkeys');

// Crée le dossier otpkeys s'il n'existe pas
if (!fs.existsSync(otpDirectory)) {
    fs.mkdirSync(otpDirectory);
}

/**
 * Sauvegarde le secret d'un utilisateur dans un fichier.
 * @param {string} username - L'email de l'utilisateur.
 * @param {string} secret - Le secret généré.
 */
const saveSecret = (username, secret) => {
    const fileName = Buffer.from(username).toString('base64').substring(0, 6);
    const secretPath = path.join(otpDirectory, fileName);
    fs.writeFileSync(secretPath, secret);
};

/**
 * Récupère le secret d'un utilisateur à partir d'un fichier.
 * @param {string} username - L'email de l'utilisateur.
 * @returns {string|null} - Le secret ou null s'il n'existe pas.
 */
const getSecret = (username) => {
    const fileName = Buffer.from(username).toString('base64').substring(0, 6);
    const secretPath = path.join(otpDirectory, fileName);
    if (fs.existsSync(secretPath)) {
        return fs.readFileSync(secretPath, 'utf-8');
    }
    return null;
};

// Générer le QR Code pour configurer le 2FA
module.exports.generateQRCode = async (req, res) => {
    try {
        const username = req.user.email; // Récupère l'utilisateur connecté
        const service = 'LessonManagementApp';

        // Génère ou récupère le secret
        let authenticatorSecret = getSecret(username);
        if (!authenticatorSecret) {
            authenticatorSecret = authenticator.generateSecret();
            saveSecret(username, authenticatorSecret);
        }

        // Génère l'URI et le QR Code
        const keyURI = authenticator.keyuri(username, service, authenticatorSecret);
        const qrCodeImage = await qrcode.toDataURL(keyURI);

        res.status(200).json({
            message: 'QR code généré avec succès',
            qrCode: qrCodeImage,
        });
    } catch (error) {
        console.error('Erreur lors de la configuration du 2FA :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

// Vérifier le code TOTP fourni par l'utilisateur
module.exports.verifyTOTP = async (req, res) => {
    try {
        const { twoFactorCode } = req.body;
        const username = req.user.email;

        if (!twoFactorCode) {
            return res.status(400).json({ error: 'Le code 2FA est requis.' });
        }

        const authenticatorSecret = getSecret(username);
        if (!authenticatorSecret) {
            return res.status(404).json({ error: 'Secret 2FA introuvable pour cet utilisateur.' });
        }

        const isValid = authenticator.verify({ token: twoFactorCode, secret: authenticatorSecret });

        if (!isValid) {
            return res.status(401).json({ error: 'Code 2FA invalide.' });
        }

        res.status(200).json({ message: '2FA vérifié avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la vérification du 2FA :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

// Afficher le QR code (génère un QR code si nécessaire)
module.exports.displayQR = async (req, res) => {
    try {
        const username = req.user.email;
        const service = 'LessonManagementApp';

        // Récupérer ou générer le secret
        let authenticatorSecret = getSecret(username);
        if (!authenticatorSecret) {
            authenticatorSecret = authenticator.generateSecret();
            saveSecret(username, authenticatorSecret);
        }

        // Génère l'URI et le QR Code
        const keyURI = authenticator.keyuri(username, service, authenticatorSecret);
        const qrCodeImage = await qrcode.toDataURL(keyURI);

        res.status(200).json({ qrCode: qrCodeImage });
    } catch (error) {
        console.error('Erreur lors de la génération du QR code :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};
