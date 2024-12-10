const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

const signup = async (data) => {
    try {
        const { email, password } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        const token = jwt.sign({ userId: user.id, isTwoFactorEnabled: user.isTwoFactorEnabled }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error.message);
        throw error;
    }
};

const login = async (data) => {
    try {
        const { email, password } = data;
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('Email ou mot de passe incorrect');
        }
        const token = jwt.sign({ userId: user.id, isTwoFactorEnabled: user.isTwoFactorEnabled }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
        throw error;
    }
};

//vérification du jwt
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Erreur lors de la vérification du token:', error.message);
        throw error;
    }
};


// deconnexion
// const logout = async (userId) => {
//     try {
//         // Invalidate the JWT tokens (implementation depends on your token storage strategy)
//         // For example, you can use a blacklist to invalidate tokens
//         // Here, we assume a simple in-memory blacklist for demonstration purposes
//         const blacklistedTokens = [];
//         blacklistedTokens.push(userId);
//         return { message: 'Déconnexion réussie' };
//     } catch (error) {
//         console.error('Erreur lors de la déconnexion:', error.message);
//         throw error;
//     }
// };

// module.exports = { logout };


module.exports = { signup, login, verifyToken };
