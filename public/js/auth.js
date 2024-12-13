
document.getElementById('googleBtn').addEventListener('click', () => {
    window.location.href = '/login/federated/google'; // Redirection vers le backend pour Google OAuth
});

document.getElementById('discordBtn').addEventListener('click', () => {
    window.location.href = '/auth/discord'; // Redirection vers le backend pour Discord OAuth
});
