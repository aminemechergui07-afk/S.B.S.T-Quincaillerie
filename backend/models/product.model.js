const mongoose = require('mongoose');
const Product = mongoose.model('Product',{

name:{
    type: String
},

prix:{
    type: Number
},

images:{
    type: Array,
    default: []
},

description:{
    type: String
},

status:{
    type: String
},

board:{
    type: mongoose.Schema.Types.ObjectId,
   ref: 'Board'
},

date:{
    type: Date
}

});

module.exports = Product;