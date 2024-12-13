const express = require('express');
var session = require('express-session');
require('dotenv').config();
const passport = require('passport');
const app = express();
const path = require('path');
var authRouter = require('./routes/auth');  
const routes = require('./routes');
const cors = require('cors');
var SQLiteStore = require('connect-sqlite3')(session);

// Middleware pour gérer les sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'none',
    secure: true
  },
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));

app.use(cors())

// Initialisez Passport et la session
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use('/', authRouter); 

app.get('/', (req, res) => {
    res.send('Test');
});

app.listen(4000, () => {
    console.log(`✅ Server OK on port 4000`);
});
