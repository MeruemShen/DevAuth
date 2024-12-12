async function loadNav() {
    try {
        const response = await fetch('../assets/nav.html');
        const navContent = await response.text();
        document.getElementById('nav-placeholder').innerHTML = navContent;

        const token = localStorage.getItem('token');
        const navLinks = document.getElementById('navLinks');

        if (token) {
            const accountLink = document.createElement('li');
            accountLink.classList.add('nav-item');
            accountLink.innerHTML = '<a class="btn btn-primary ms-2" href="/account.html">Mon Compte</a>';
            navLinks.appendChild(accountLink);
        } else {
            const loginLink = document.createElement('li');
            loginLink.classList.add('nav-item');
            loginLink.innerHTML = '<a class="btn btn-outline-light ms-2" href="/login.html">Connexion</a>';
            navLinks.appendChild(loginLink);

            const registerLink = document.createElement('li');
            registerLink.classList.add('nav-item');
            registerLink.innerHTML = '<a class="btn btn-primary ms-2" href="/register.html">Inscription</a>';
            navLinks.appendChild(registerLink);
        }
    } catch (error) {
        console.error('Erreur lors du chargement du fichier nav.html:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadNav);

