async function loadBlogs() {
    try {
        const response = await fetch('/api/blog');
        const blogs = await response.json();

        console.log('Blogs récupérés :', blogs);

        const blogContainer = document.getElementById('blogContainer');
        blogContainer.innerHTML = '';

        const publicBlogs = blogs.filter(blog => blog.isPublic);

        publicBlogs.forEach(blog => {
            const blogCard = `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${blog.title}</h5>
                            <p class="card-text">${blog.content.substring(0, 100)}...</p>
                            <a href="/blogPage.html?id=${blog.id}" class="btn btn-primary">Lire plus</a>
                            <button class="btn btn-danger mt-2" onclick="deleteBlog(${blog.id})">Supprimer</button>
                        </div>
                    </div>
                </div>
            `;
            blogContainer.innerHTML += blogCard;
        });

    } catch (error) {
        console.error('Erreur lors du chargement des blogs :', error);
    }
}

// Function to handle delete request
async function deleteBlog(blogId) {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Vous devez être connecté pour supprimer un blog.');
        return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer ce blog ?')) {
        try {
            const response = await fetch(`/api/blog/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Blog supprimé avec succès.');
                loadBlogs();
            } else {
                const data = await response.json();
                alert(`Erreur lors de la suppression du blog: ${data.message}`);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du blog:', error);
            alert('Une erreur s\'est produite lors de la suppression du blog.');
        }
    }
}

loadBlogs();
