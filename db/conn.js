const mongoose = require("mongoose");

const db =process.env.MONGODB_URI||
  "mongodb+srv://admin:admin@cluster0.rdt0m.mongodb.net/NoteAPI?retryWrites=true&w=majority";

const connDB = async () => {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("Connected");
};

module.exports = connDB;
