const jwt = require('jsonwebtoken');

const token = jwt.sign({
  data: 'foobar'
}, 'secret', { expiresIn: '2s' });

console.log('Token:', token);


// Décoder le token pour obtenir l'expiration
const decoded = jwt.decode(token);
const expiryDate = new Date(decoded.exp * 1000);
console.log('Expiration:', expiryDate);

// Comparer la date d'expiration à la date actuelle
const now = new Date();
if (now > expiryDate) {
  console.log('expiré');
} else {
  console.log('pas expiré');
}
