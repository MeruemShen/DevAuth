document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('registerMessage').innerHTML = '<div class="alert alert-danger">Les mots de passe ne correspondent pas</div>';
        return;
    }

    try {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            document.getElementById('registerMessage').innerHTML = '<div class="alert alert-success">Inscription réussie</div>';
            setTimeout(() => window.location.href = '/', 1000);
        } else {
            document.getElementById('registerMessage').innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
        }
    } catch (error) {
        console.error('Erreur:', error);
        document.getElementById('registerMessage').innerHTML = '<div class="alert alert-danger">Une erreur s\'est produite lors de l\'inscription</div>';
    }
});