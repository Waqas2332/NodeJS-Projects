import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(express.json());
app.use("/posts", postRoutes);

app.listen(8000, function () {
  mongoose
    .connect("mongodb+srv://wmunir232:wmunir232@cluster0.f69ksnx.mongodb.net/")
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => console.log(err));
  console.log("Server running");
});
