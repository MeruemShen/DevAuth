const passport = require('../config/passport');
const router = require('express').Router();
const { generateToken } = require('../database/queries/User.queries'); 

// Google Authentication
router.get('/login/federated/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login' }), 
  async (req, res) => {
      try {
          
          const token = generateToken(req.user);

          // Stocker le token dans un cookie accessible via JavaScript
          res.cookie('authToken', token, {
              secure: true, 
              sameSite: 'Strict',
              maxAge: 24 * 60 * 60 * 1000,
          });

          res.redirect('/redirection.html'); 
      } catch (error) {
          console.error('Erreur dans la callback Google:', error);
          res.status(500).json({ error: 'Une erreur est survenue lors de l\'authentification.' });
      }
  }
);

// Discord Authentication
router.get('/auth/discord', passport.authenticate('discord'));

router.get('/auth/discord/callback', 
  passport.authenticate('discord', { failureRedirect: '/' }), 
  (req, res) => {
    try {
      const token = generateToken(req.user);

    
      res.cookie('authToken', token, {
          secure: true, 
          sameSite: 'Strict',
          maxAge: 24 * 60 * 60 * 1000,
      });

      res.redirect('/redirection.html'); 
    } catch (error) {
        console.error('Erreur dans le callback Discord:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'authentification avec Discord.' });
    }
  }
);

module.exports = router;
