// server.js
// where your node app starts

// init project
const express = require("express");
const sendMail = require("./public/mail");

const app = express();
const path = require("path");
const log = console.log;
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));



// Data Parsing

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/email", (req, res) => {
  // send mail here

  const { subject, email, text } = req.body;

  sendMail(email, subject, text, function(err, data) {
    if (err) {
      res.status(500).json({ message: "Internal Error" });
    } else {
      console.log("Server side : Email Sent");
      res.json({ message: "Email Sent" });
    }
  });
});

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));


app.get("/", function(req, res){
   res.render("landing");
});


app.get("/about", function(req, res){
   res.render("about");
});

app.get("/contact", function(req, res){
   res.render("contact");
});


// http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function(request, response) {
//   response.sendFile(__dirname + "/views/index.html");
// });

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
