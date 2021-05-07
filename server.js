const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const connDB = require("./db/conn.js");
connDB();
const path = require("path");
const staticpath = path.join(__dirname, "./uploads");
app.use(express.json())
app.use(express.static(staticpath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use("/", require("./api/user"));
if(process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"))
}
app.listen(port, () => {
  console.log(`listening at port : ${port}`);
});
