const express = require('express');
const dotenv = require('dotenv');
const { v2: cloudinary } = require('cloudinary');

const Post = require('../mongodb/models/post');
dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// get all posts 
router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({});
        
        res.status(200).json({ succes: false, data: posts })
    } catch (error) {
        res.status(500).json({ succes: false, message: error });
    }
})

// create a post
router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        // console.log("Photourl ",photoUrl);
        // console.log("red.body ",req.body);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });
        // console.log("post added")
        res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ succes: false, message: error });
    }
});


module.exports = router;