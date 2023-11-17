import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
});

const PostSchema = mongoose.model("Post", postSchema);

export default PostSchema;
