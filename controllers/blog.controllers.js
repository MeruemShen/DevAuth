const { getAllBlogs, createBlog } = require('../database/queries/blog.queries');

module.exports.createBlog = async (req, res) => {
    try {
        const { title, content, isActive } = req.body;

        if (!title || !content || isActive === undefined) {
            return res.status(400).json({ message: 'Champs manquants' });
        }

        const newBlog = await createBlog({ title, content, isActive });
        res.status(201).json({ message: 'Blog créé avec succès', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Erreur création du blog', error: error.message });
    }
};

module.exports.getBlogs = async (req, res) => {
    try {
        const blogs = await getAllBlogs(filter);
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur récupération des blogs', error: error.message });
    }
};

