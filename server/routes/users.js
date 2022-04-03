const express = require('express')
const routes = express()
const mongoose = require('mongoose')
const userSchema = require('../models/user')

routes.get('/getUser/:id', async(req,res) => {
    try{
        const user = await userSchema.findOne({username:req.params.id})
        console.log(user)
        res.json(user)
    }
    catch(e)
    {
        console.log(e);
    }
})


routes.post('/createUser', async(req,res) => {
    // console.log(req.body)

    try
    {
        const userExists = await userSchema.findOne({
            username:req.body.username,
            email:req.body.email
        })
        console.log(userExists)
        if(userExists.length < 1)
        {
            const createUser = await userSchema.create(
                req.body
            )

            const createdUser = await createUser.save()
            res.json(createdUser)
        }
        else
        {
            res.json(userExists)
        }
    }
    catch(e)
    {
        console.log(e);
    }
})


routes.post('/followUser/:id', async(req,res) => {
    console.log(req.body);

    try{
        const updateFollowers = await userSchema.findOneAndUpdate({username:req.params.id},
            { $push: { followers: req.body } }
        )
        const updateFollowing = await userSchema.findOneAndUpdate({username:req.body.author},
            { $push: { following: {author:req.params.id} } }
        )
    }
    catch(e)
    {
        console.log(e);
    }
})

routes.post('/unfollowUser/:id', async(req,res) => {
    console.log(req.body);

    try{
        const updateUnFollowers = await userSchema.findOneAndUpdate({username:req.params.id},
            { $pull: { followers: req.body } }
        )
        const updateUnFollowing = await userSchema.findOneAndUpdate({username:req.body.author},
            { $pull: { following: {author:req.params.id} } }
        )
    }
    catch(e)
    {
        console.log(e);
    }
})

routes.post('/updateSaved/:id',async(req,res) => {
    // console.log(req.body)
    console.log(req.body)

    try{
        const updateFollowers = await userSchema.findOneAndUpdate({username:req.params.id},
            { $push: { saved: req.body } }
        )
        console.log(updateFollowers)
        
    }
    catch(e)
    {
        console.log(e);
    }
})
module.exports = routes