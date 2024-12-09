const { createBlog, getBlogs } = require("../controllers/blog.controllers");
const express = require('express');
const router = express.Router();

router.post('/', createBlog);
router.get('/', getBlogs);

module.exports = router;
