document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            document.getElementById('loginMessage').innerHTML = '<div class="alert alert-success">Connexion réussie</div>';
            setTimeout(() => window.location.href = '/', 1000);
        } else {
            document.getElementById('loginMessage').innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
        }
    } catch (error) {
        console.error('Erreur:', error);
        document.getElementById('loginMessage').innerHTML = '<div class="alert alert-danger">Une erreur s\'est produite lors de la connexion</div>';
    }
});
