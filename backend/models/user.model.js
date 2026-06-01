const mongoose = require('mongoose');
const User = mongoose.model('User',{

name:{
    type: String
},

lastName:{
    type: String
},

tel: {
   type: Number
},

email:{
    type: String,
    unique: true
},

password:{
    type: String
},

image:{
    type: String
},

date: {
    type: Date
},

role:{
    type: String
}

});


module.exports = User;