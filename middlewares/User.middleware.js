const { verifyToken, isTokenBlacklisted } = require('../database/queries/User.queries');

const UserMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé, token manquant' });
    }
    if (isTokenBlacklisted(token)) {
        return res.status(401).json({ error: 'Token invalide ou expiré' }); }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};

module.exports = UserMiddleware;