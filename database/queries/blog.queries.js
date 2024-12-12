const Blog = require('../models/Blog.model');

const getAllBlogs = async () => {
    try {
        return await Blog.findAll(); 
    } catch (error) {
        console.error('Erreur lors de la récupération des blogs:', error.message);
        throw error;
    }
};

const createBlog = async (data) => {
    try {
        return await Blog.create(data); 
    } catch (error) {
        console.error('Erreur lors de la création du blog:', error.message);
        throw error;
    }
};

const getBlogById = async (id) => {
    try {
        return await Blog.findByPk(id);
    } catch (error) {
        console.error(`Erreur lors de la récupération du blog avec l'ID ${id}:`, error.message);
        throw error;
    }
};

const deleteBlog = async (id) => {
    try {
        const blog = await Blog.findByPk(id);
        if (blog) {
            await blog.destroy();
            return blog;
        }
        return null;
    } catch (error) {
        console.error(`Erreur lors de la suppression du blog avec l'ID ${id}:`, error.message);
        throw error;
    }
};

module.exports = { getAllBlogs, createBlog, getBlogById, deleteBlog };
