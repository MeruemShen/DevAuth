const { verifyToken } = require('../database/queries/User.queries');
const jwt = require('jsonwebtoken');
const User = require('../database/models/User.model');

const UserMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Accès non autorisé, token manquant' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé, token manquant' });
    }

    try {
        const decoded = verifyToken(token);
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé.' });
        }
        
        if (user.logoutAllAt && new Date(decoded.iat * 1000) < new Date(user.logoutAllAt)) {
            return res.status(401).json({ error: 'Token expiré (déconnexion globale).' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};

module.exports = UserMiddleware;
