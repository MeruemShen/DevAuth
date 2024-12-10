const { getAllBlogs, createBlog, deleteBlog, getBlogById } = require('../database/queries/blog.queries');

module.exports.createBlog = async (req, res) => {
    try {
        const { title, content, isPublic } = req.body;

        if (!title || !content || isPublic === undefined) {
            return res.status(400).json({ message: 'Champs manquants' });
        }

        const newBlog = await createBlog({ title, content, isPublic });
        res.status(201).json({ message: 'Blog créé avec succès', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Erreur création du blog', error: error.message });
    }
};

module.exports.getBlogs = async (req, res) => {
    try {
        const blogs = await getAllBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur récupération des blogs', error: error.message });
    }
};

module.exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await getBlogById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog non trouvé' });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du blog', error: error.message });
    }
};

module.exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await deleteBlog(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog non trouvé' });
        }

        res.status(200).json({ message: 'Blog supprimé avec succès', blog: deletedBlog });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du blog', error: error.message });
    }
};