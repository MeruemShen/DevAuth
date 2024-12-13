async function loadBlogs() {
    try {
        const token = localStorage.getItem('token');
        let currentUser = null;

        if (token) {
            const currentUserResponse = await fetch('/api/user/current_user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (currentUserResponse.ok) {
                currentUser = await currentUserResponse.json();
            } else {
                const errorData = await currentUserResponse.json();
                if (errorData.error === 'Token invalide ou expiré') {
                    localStorage.removeItem('token');
                    window.location.href = '/login.html'; 
                    return;
                } else {
                    throw new Error('Erreur lors de la récupération de l\'utilisateur.');
                }
            }
        }

        const response = await fetch('/api/blog');
        const blogs = await response.json();

        const blogContainer = document.getElementById('blogContainer');
        blogContainer.innerHTML = '';

        blogs.forEach(blog => {
            const isOwner = currentUser && blog.userId === currentUser.id;
            if (blog.isPublic || isOwner) {
                const blogCard = `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">${blog.title}</h5>
                                <p class="card-text">${blog.content.substring(0, 100)}...</p>
                                <a href="/blogPage.html?id=${blog.id}" class="btn btn-primary">Lire plus</a>
                                ${isOwner ? `<button class="btn btn-danger mt-2" onclick="deleteBlog(${blog.id})">Supprimer</button>` : ''}
                            </div>
                        </div>
                    </div>
                `;
                blogContainer.innerHTML += blogCard;
            }
        });

    } catch (error) {
        console.error('Erreur lors du chargement des blogs :', error);
    }
}

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
