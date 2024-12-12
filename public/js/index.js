async function loadNav() {
    try {
        const response = await fetch('../assets/nav.html');
        const navContent = await response.text();
        document.getElementById('nav-placeholder').innerHTML = navContent;
        const token = localStorage.getItem('token');
        console.log(token)
        const navLinks = document.getElementById('navLinks');

        if (token) {
            const responseUser = await fetch('/api/user/current_user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!responseUser.ok) {
                const errorData = await responseUser.json();
                if (errorData.error === 'Token invalide ou expiré') {
                    localStorage.removeItem('token');
                    window.location.href = '/login.html'; 
                    return;
                } else {
                    throw new Error("Erreur lors de la récupération de l'utilisateur.");
                }
            }
            
            const user = await responseUser.json();

            const logoutLink = document.createElement('li');
            logoutLink.classList.add('nav-item');
            logoutLink.innerHTML = '<a class="btn btn-danger ms-2" href="#" onclick="logout()">Déconnexion</a>';
            navLinks.appendChild(logoutLink);

            //tous déconnecté avec authentification


            if (user.DoubleFacteur) {

                const createButton = document.createElement('div');
                createButton.innerHTML = '<a href="/create-blog.html" class="btn btn-success">Créer un Article</a>';
                document.getElementById('createArticleButton').appendChild(createButton);

                const accountLink = document.createElement('li');
                accountLink.classList.add('nav-item');
                accountLink.innerHTML = '<a class="btn btn-primary ms-2" href="/account.html">Mon Compte</a>';
                navLinks.appendChild(accountLink);
            }

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

function logout() {
    localStorage.removeItem('token');
    location.reload();
}

function logoutalldevice() {

}

document.addEventListener('DOMContentLoaded', loadNav);