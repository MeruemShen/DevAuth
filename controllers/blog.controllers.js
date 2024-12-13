const { getAllBlogs, createBlog, deleteBlog, getBlogById, updateBlog } = require('../database/queries/blog.queries');

module.exports.createBlog = async (req, res) => {
    try {
        const { title, content, isPublic } = req.body;
        const userId = req.user.id; 


        if (!title || !content || isPublic === undefined) {
            return res.status(400).json({ message: 'Champs manquants' });
        }

        const newBlog = await createBlog({ title, content, isPublic, userId });
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
        const userId = req.user.userId; 
        const deletedBlog = await deleteBlog(id, userId);
        console.log(deletedBlog);

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog non trouvé ou non autorisé' });
        }

        res.status(200).json({ message: 'Blog supprimé avec succès', blog: deletedBlog });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du blog', error: error.message });
    }
};

module.exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, isPublic } = req.body;
        const updatedBlog = await updateBlog(id, { title, content, isPublic }, req.user.userId); 

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog non trouvé ou non autorisé' });
        }

        res.status(200).json({ message: 'Blog mis à jour avec succès', blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du blog', error: error.message });
    }
};
