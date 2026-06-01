const mongoose = require('mongoose');
const New = mongoose.model('New',{

title:{
    type: String
},

image:{
    type: String
},

description:{
    type: String
},

  blockquote:{
    type: String
  }

});

module.exports = New;