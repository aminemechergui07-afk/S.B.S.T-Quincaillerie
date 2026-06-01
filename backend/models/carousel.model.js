const mongoose = require('mongoose');
const Carousel = mongoose.model('Carousel',{

title:{
    type: String
},

text:{
    type: String
},

image:{
    type: String
}
});

module.exports = Carousel;