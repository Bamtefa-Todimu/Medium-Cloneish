const mongoose = require('mongoose')
const postSchema = require('../models/post')
const express = require('express')
const { Routes } = require('react-router-dom')
const route = express()

route.post('/createPost', async (req,res) => {
    console.log(req.body);
    try{
        const createPost = await postSchema.create(
            req.body
        )

        const savedPost = await createPost.save()
        res.json(savedPost)
    }
    catch(e)
    {
        // console.log(e);
        res.json({message:"could not create post"})
    }
})

route.get('/getAllPosts',async(req,res) => {
    try{
        const allPosts = await postSchema.find().sort({postTime:-1})
        res.json(allPosts)
    }
    catch(e)
    {
        // console.log(e)
        res.json({message:"couldnt retrieve all posts"})
    }
})


route.get('/post/:id',async(req,res) => {
    try{
        const allPosts = await postSchema.findById(req.params.id)
        res.json(allPosts)
    }
    catch(e)
    {
        // console.log(e)
        res.json({message:"couldnt retrieve single posts"})
    }
})

route.post('/updateLikes/:id',async(req,res) => {

    // console.log(req.params.id);
    // console.log(req.body);
    try{
        
        if(req.body.likes)
        {
            const likesupdated = await postSchema.findByIdAndUpdate(req.params.id,{
                likes:req.body.likes
            })
            // console.log(
            //     "updating"
            // );
            res.json({likes:likesupdated.likes})

        }
        else
        {
            const likesupdated = await postSchema.findById(req.params.id)
            // console.log(
            //     "fetching"
            // );
            res.json({likes:likesupdated.likes})
        }
    

    }
    catch(e)
    {
        // console.log(e)
        res.json({message:"couldnt update likes"})
    }
})


route.post('/updateComments/:id',async(req,res) => {

    // console.log(req.params.id);
    // console.log(req.body);
    try{
        
        if(req.body.comment.length > 0)
        {
            const commentsupdated = await postSchema.findByIdAndUpdate(req.params.id,{
                comments: req.body.comment
            })
            // console.log(
            //     "updating"
            // );
            // console.log(commentsupdated)
            res.json({likes:commentsupdated.comments})

        }
        else
        {
            const commentsupdated = await postSchema.findById(req.params.id)
            // console.log(
            //     "fetching"
            // );
            res.json({comment:commentsupdated.comments})
        }
    

    }
    catch(e)
    {
        // console.log(e)
        res.json({message:"couldnt update likes"})
    }
})

module.exports = route