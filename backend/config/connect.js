const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/sbstProject')
        .then(
            ()=>{
                console.log('mongodb connect');
                
            }
        )
        .catch(
            ()=>{
                console.log('mongodb Not connect');
                
            }
        )