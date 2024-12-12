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
            document.getElementById('createBlogMessage').innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
        }
    } catch (error) {
        console.error('Erreur lors de la création du blog:', error);
        document.getElementById('createBlogMessage').innerHTML = '<div class="alert alert-danger">Une erreur s\'est produite lors de la création du blog</div>';
    }
});
