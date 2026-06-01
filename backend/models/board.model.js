const mongoose = require('mongoose');
const Board = mongoose.model('Board',{

 product: {
    type: mongoose.Types.ObjectId
 },    

 message: {
    type: String,
    required: true
  },
  stars: {
    type: Number,     
    required: true,
    min: 1,          
    max: 5            
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date
  }
  
});

module.exports = Board