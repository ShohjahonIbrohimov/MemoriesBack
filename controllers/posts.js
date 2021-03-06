import Post from "../models/posts.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post(post);

  try {
    await newPost.save();

    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  try {
    const deletedPost = await Post.findByIdAndDelete(id, { new: true });

    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  try {
    const post = await Post.findById(id);
    const updatedPost = await Post.findByIdAndUpdate(id, {
      likeCount: post.likeCount + 1,
    });

    res.status(200).json({ message: "Liked successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
