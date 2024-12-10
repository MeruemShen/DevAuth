const { createBlog, getBlogs, getBlogById, deleteBlog } = require("../controllers/blog.controllers");
const express = require('express');
const router = express.Router();

router.post('/', createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById); 
router.delete('/:id', deleteBlog);  

module.exports = router;
