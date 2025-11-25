const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createPost, getAllPosts, deletePost } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', getAllPosts);

router.post('/', auth, upload.single('image'), createPost);

router.delete('/:id', auth, deletePost);

module.exports = router;