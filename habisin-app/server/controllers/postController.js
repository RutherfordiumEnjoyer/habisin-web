const FoodPost = require('../models/FoodPost');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  try {
    const { title, description, location, quantity, coordinateX, coordinateY } = req.body;
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

    if (!imageUrl) return res.status(400).json({ message: "Gambar wajib diupload!" });

    // 1. Simpan Postingan
    const newPost = new FoodPost({
      title, description, location, quantity, imageUrl,
      coordinates: { x: coordinateX, y: coordinateY },
      poster: req.user.id 
    });
    const savedPost = await newPost.save();

    const user = await User.findById(req.user.id);
    user.points += 10;

    const badgesEarned = [];
    if (user.points >= 10 && !user.badges.includes("Donatur Pemula")) {
      user.badges.push("Donatur Pemula");
      badgesEarned.push("Donatur Pemula");
    }
    if (user.points >= 50 && !user.badges.includes("Pahlawan Pangan")) {
      user.badges.push("Pahlawan Pangan");
      badgesEarned.push("Pahlawan Pangan");
    }
    if (user.points >= 100 && !user.badges.includes("Legend Kampus")) {
      user.badges.push("Legend Kampus");
      badgesEarned.push("Legend Kampus");
    }

    await user.save();

    res.status(201).json({ 
      post: savedPost, 
      newBadges: badgesEarned,
      totalPoints: user.points
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllPosts = async (req, res) => {
  try {

    const posts = await FoodPost.find()
      .populate('poster', 'username email') 
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deletePost = async (req, res) => {
  try {
    const post = await FoodPost.findById(req.params.id);
    
    if (!post) return res.status(404).json({ message: "Post not found" });


    if (post.poster.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};