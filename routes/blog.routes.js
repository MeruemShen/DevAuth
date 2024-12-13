const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } = require("../controllers/blog.controllers");
const UserMiddleware = require("../middlewares/User.middleware");
const require2faMiddleware = require("../middlewares/require2fa.middleware");
const express = require('express');
const router = express.Router();

router.post('/', UserMiddleware, require2faMiddleware, createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.put('/:id', UserMiddleware, updateBlog); 
router.delete('/:id', UserMiddleware, deleteBlog); 

module.exports = router;
