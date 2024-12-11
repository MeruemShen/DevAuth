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

loadBlogs();