const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var fs = require("fs");
var path = require("path");
const route = express.Router();
const Note = require("../db/schema");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
route.post("/notes", upload.single("image"), async (req, res, next) => {
  var now = new Date().valueOf();
  let note = {
    title: req.body.title,
    content: req.body.content,
    image: req.file.originalname,
    addr: now,
  };
  try{
    
  let noteModel = new Note(note);
  const createdNote = await noteModel.save();
  res.send(createdNote);
  }catch(e){
     res.status(500)
  }
});
route.get("/notes", async (req, res) => {
  const query = req.query;
  const data = await Note.find(query);
  res.send(data)
});

route.patch("/notes", async (req, res) => {
  const myquery = {addr:req.body.addr}
  const newval = { $set: { title: req.body.newTitle,content:req.body.newContent } };
  await Note.updateOne(myquery, newval);
  
});
route.delete("/notes", async (req, res) => {
  const query = req.body
  const data = await Note.deleteOne(query);
  res.send(data);
});
module.exports = route;
