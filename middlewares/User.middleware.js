const { verifyToken } = require('../database/queries/User.queries');

const UserMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Accès non autorisé, token manquant' });
    }

    const token = authHeader.split(' ')[1]; // Ensure correct token extraction
    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé, token manquant' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};

module.exports = UserMiddleware;
