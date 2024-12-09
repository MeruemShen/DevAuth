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

module.exports = { getAllBlogs, createBlog };
