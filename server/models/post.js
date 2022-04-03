const mongoose = require('mongoose')

const dbSchema = mongoose.Schema({
    author : {
        type:String,
        required:true
    },
    authorPic:{
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    previewContent:{
        type:String,
        default:"no preview content"
    },
    postBody: {
        type:String,
        required:true
    },
    tag:{
        type:String
    },
    postTime: {
        type:String,
        default: Date.now()
    },
    postDate:{
        type:String
    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
        type:[{type:Object}],
        default:[]
    }
})

module.exports = mongoose.model('posts',dbSchema)