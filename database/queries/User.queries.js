const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        return user;
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error.message);
        throw error;
    }
};

const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('Email ou mot de passe incorrect');
        }
        return user;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
        throw error;
    }
};

const generateToken = (user) => {
    return jwt.sign({ userId: user.id, email: user.email, DoubleFacteur: user.DoubleFacteur }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Erreur lors de la vérification du token:', error.message);
        throw error;
    }
};


module.exports = { signup, login, generateToken, verifyToken };
