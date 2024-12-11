async function loadBlog() {
    try {
        const params = new URLSearchParams(window.location.search);
        const blogId = params.get('id');

        if (!blogId) {
            document.getElementById('blogContent').innerHTML = `
                <h2 class="text-danger">Aucun blog trouvé</h2>
            `;
            return;
        }

        const response = await fetch(`/api/blog/${blogId}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération du blog.');

        const blog = await response.json();

        document.getElementById('blogContent').innerHTML = `
            <h1 class="mb-4">${blog.title}</h1>
            <p class="text-muted">Publié le ${new Date(blog.createdAt).toLocaleDateString()}</p>
            <div class="mt-4 text-start">
                <p>${blog.content}</p>
            </div>
        `;
    } catch (error) {
        console.error('Erreur lors du chargement du blog :', error);
        document.getElementById('blogContent').innerHTML = `
            <h2 class="text-danger">Erreur lors de la récupération du blog</h2>
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadBlog);
