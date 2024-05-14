const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  content: {
    type: String,
    maxlength: 250,
  },
  name: {
    type: String,
    maxlength: 20,
  },
  place: {
    type: String,
    maxlength: 20,
  },
  stars: {
    type: Number,
    default: 4.5,
  },
  approved: {
    type: Boolean,
    default: false,
  }
});

const Review = new mongoose.model("Review",reviewSchema)
module.exports = Review
