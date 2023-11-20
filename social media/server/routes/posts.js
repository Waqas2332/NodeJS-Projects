import express from "express";
import PostSchema from "../models/posts.js";
import mongoose from "mongoose";

const router = express.Router();

// GET ==> All Posts
router.get("/", async function (req, res) {
  try {
    const response = await PostSchema.find();
    res.status(200).json({
      message: "Data fetched successfully",
      response: response,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({ message: error._message, ok: false });
  }
});

router.get("/post", function (req, res) {
  res.send("This is single post");
});

// POST ==> New POST creation
router.post("/newpost", async function (req, res) {
  try {
    const response = await PostSchema.create(req.body);
    res
      .status(201)
      .json({ message: "Data created successfully", response, ok: true });
  } catch (error) {
    res.status(400).json({ message: error._message, ok: false });
  }
});
router.get("/:postID", async function (req, res) {
  const id = req.params.postID;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Post Not Found", ok: false });
    return;
  }
  try {
    const response = await PostSchema.findById(id);
    console.log(response);
  } catch (error) {
    res.status(500).json({ message: error._message, ok: false });
  }
});

router.delete("/:id", async function (req, res) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Post Not Found", ok: false });
    return;
  }
  try {
    const response = await PostSchema.findByIdAndDelete(id);
    console.log(response);
  } catch (error) {
    res.status(500).json({ message: error._message, ok: false });
  }
});

export default router;
