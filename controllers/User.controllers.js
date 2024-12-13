const { signup, login, generateToken } = require('../database/queries/User.queries');

module.exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await signup(email, password);
        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error.message);
        res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await login(email, password);
        console.log(user);
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};

module.exports.logoutAllDevices = async (req, res) => {
    try {
        req.user.logoutAllAt = new Date(); // Met à jour la date de déconnexion globale
        await req.user.save();

        res.status(200).json({ message: 'Déconnecté de tous les appareils.' });
    } catch (err) {
        console.error('Erreur lors de la déconnexion :', err);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

