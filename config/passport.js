const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../database/models/User.model');
const { Op } = require('sequelize');
const {generateToken } = require('../database/queries/User.queries');
const scopes = ['identify', 'email', 'guilds', 'guilds.join'];

// Serialisation et désérialisation de l'utilisateur
passport.serializeUser((user, done) => {
    console.log('Utilisateur sérialisé:', user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        console.log('Utilisateur désérialisé:', user);
        done(null, user);
    } catch (error) {
        console.error('Erreur de désérialisation:', error);
        done(error, null);
    }
});


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/oauth2/redirect/google', 
            scope: ['profile', 'email'],
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                console.log('Google profile:', profile);

                let user = await User.findOne({
                     where:{
                         [Op.or]: [{ GoogleId: profile.id }, { email: profile.emails[0].value }]
                        } 
                    });

                if (!user) {
                    user = await User.create({
                        email: profile.emails[0].value,
                        name: profile.displayName,
                        GoogleId: profile.id,
                        password: 'temporary_password',
                    
                    });
                    console.log("utilisateur google créé , si il existe pas  ")
                }

                cb(null, user);
            } catch (error) {
                console.error('Erreur dans la stratégie Google:', error);
                cb(error, null);
            }
        }
    )
);


passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: '/auth/discord/callback',  
            scope: scopes,
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                console.log('Discord profile:', profile);

                
                let user = await User.findOne({ where: { DiscordId: profile.id } });

                if (!user) {
                    console.log('Aucun utilisateur Discord trouvé, création...');
                    user = await User.create({
                        email: profile.email || null, 
                        name: profile.username,
                        DiscordId: profile.id,
                        password: 'temporary_password',
                    });
                    console.log("Utilisateur Discord créé:", user);
                } else {
                    console.log("Utilisateur Discord déjà existant:", user);
                }

                cb(null, user);
            } catch (error) {
                console.error('Erreur dans la stratégie Discord:', error);
                cb(error, null);
            }
        }
    )
);


module.exports = passport;
