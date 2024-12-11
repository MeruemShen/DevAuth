const { signup, login, logout } = require('../database/queries/User.queries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
       const token = jwt.sign({ userId: user.id, isTwoFactorEnabled: user.isTwoFactorEnabled }, process.env.JWT_SECRET, { expiresIn: '1h' });
       res.status(201).json({ token });
    } catch (error) {
        { console.error('Erreur lors de l\'inscription:', error.message);
        res.status(500).json({ error: 'Erreur lors de l\'inscription' }); }
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) { return res.status(400).json({ error: 'Email ou mot de passe incorrect' }); }
        const token = jwt.sign({ userId: user.id, isTwoFactorEnabled: user.isTwoFactorEnabled }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
        res.console.log(token) //a supprimé c'est juste pour voir le token en phase test
    } catch (error) {
        res.status(500).json({ message: 'Erreur récupération des blogs', error: error.message });
    }
};

module.exports.logout = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(400).json({ error: 'Token manquant' });
        }
        await logout(token);
        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la déconnexion' });
    }
};