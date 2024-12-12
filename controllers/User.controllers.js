const { signup, login, generateToken, logout } = require('../database/queries/User.queries');

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

module.exports.logoutall = async (req, res) => {
    const username = req.body.username;
    const service = 'DevAuth';
    const authenticatorSecret = authenticator.generateSecret();
    const guessableFileName = Buffer.from(username).toString('base64').substring(0, 6);
    const directoryName = path.join(__dirname,'otpkeys');
}