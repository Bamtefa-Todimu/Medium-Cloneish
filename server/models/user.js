const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    profilePhoto:{
        type:String
    },
    uid:{
        type:String
    },
    followers:[{type:Object}],
    following:[{type:Object}],
    description:{
        type:String
    },
    saved:[{type:Object}]
})

module.exports = mongoose.model('Users',userSchema)