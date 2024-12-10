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

module.exports = { signup, login, verifyToken };
