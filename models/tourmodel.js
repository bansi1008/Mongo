const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },

  ratingsAverage: {
    type: Number,
    required: true
  }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
