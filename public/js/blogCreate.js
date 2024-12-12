document.getElementById('createBlogForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const isPublic = document.getElementById('isPublic').checked;
    const token = localStorage.getItem('token');

    if (!token) {
        document.getElementById('createBlogMessage').innerHTML = '<div class="alert alert-danger">Vous devez être connecté pour créer un blog.</div>';
        return;
    }

    try {
        const response = await fetch('/api/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, content, isPublic }) 
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('createBlogMessage').innerHTML = '<div class="alert alert-success">Blog créé avec succès</div>';
            document.getElementById('createBlogForm').reset();
            setTimeout(() => window.location.href = '/blogs.html', 1000);
        } else {
            if (data.require2fa) {
                document.getElementById('createBlogMessage').innerHTML = `
                    <div class="alert alert-warning">
                        ${data.error}
                        <br>
                        <a href="/blogs.html" class="btn btn-primary mt-2">Configurer le 2FA</a>
                    </div>`;
            } else {
                document.getElementById('createBlogMessage').innerHTML = `<div class="alert alert-danger">${data.error || 'Une erreur est survenue'}</div>`;
            }
        }
    } catch (error) {
        console.error('Erreur lors de la création du blog:', error);
        document.getElementById('createBlogMessage').innerHTML = '<div class="alert alert-danger">Une erreur s\'est produite lors de la création du blog</div>';
    }
});
