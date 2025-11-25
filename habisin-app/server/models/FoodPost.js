const mongoose = require('mongoose');

const FoodPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  

  coordinates: {
    x: { type: Number, default: null },
    y: { type: Number, default: null }
  },


  poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('FoodPost', FoodPostSchema);