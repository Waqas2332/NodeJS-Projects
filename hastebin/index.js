const express = require("express");
const mongoose = require("mongoose");
const Document = require("./models/document");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const code = `Welcome to CodeBin

Use the commands in the top right corner
to create a new file to share with others`;
  res.render("code-display", { code, language: "plaintext" });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/save", async (req, res) => {
  const value = req.body.value;
  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`);
  } catch (error) {}
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("code-display", { code: document.value, id });
  } catch (error) {
    res.redirect("/");
  }
});

app.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("new", { value: document.value });
  } catch (error) {
    res.redirect(`/${id}`);
  }
});

app.listen(8000, function () {
  mongoose
    .connect(
      "mongodb+srv://wmunir232:wmunir232@task-manager.sf6auvh.mongodb.net/"
    )
    .then(() => {
      console.log("Connected to db");
    })
    .then(() => {
      console.log("Server is running at port 3000");
    });
});
