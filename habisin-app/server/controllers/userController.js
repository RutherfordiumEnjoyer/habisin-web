const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ points: -1 })
      .limit(5)
      .select('username points badges');

    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};