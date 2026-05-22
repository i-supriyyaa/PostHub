require("dotenv").config();
const express = require("express");
const multer = require("multer");
const uploadFile = require("./services/storage.service");
const postModel = require("./models/post.model");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

// create post
app.post('/create-post', upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
    }

    const result = await uploadFile(req.file.buffer, req.file.originalname);

    const post = await postModel.create({
        image: result.url,
        fileId: result.fileId,
        caption: req.body.caption
    })

    return res.status(201).json({ message: "post created successfully", post });
    
})

// view all posts
app.get("/posts", async (req, res) => {
    const posts = await postModel.find();

    return res.status(200).json({
        message: "posts fetched successfully",
        posts
    });
})

// delete post
app.delete("/delete-post/:id", async (req, res) => {
    const { id } = req.params;

    const post = await postModel.findById(id);

    await postModel.findByIdAndDelete(id);

    return res.status(200).json({
        message: "post deleted successfully"
    });
})


// edit post
app.put("/edit-post/:id", upload.single("image"), async (req, res) => {
    const { id } = req.params;

    const post = await postModel.findById(id);

    const updateData = {
        caption: req.body.caption ?? post.caption
    };

    if (req.file) {
        const result = await uploadFile(req.file.buffer, req.file.originalname);
        updateData.image = result.url;
        updateData.fileId = result.fileId;
    }

    const updatedPost = await postModel.findByIdAndUpdate(id, updateData, { new: true });

    return res.status(200).json({
        message: "post updated successfully",
        post: updatedPost
    });
})


module.exports = app;