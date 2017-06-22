const express = require("express");
const bodyParser = require("body-parser");
const port = process.envPORT || 7000;
const app = express();
const expressValidator = require("express-validator");
const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

// Middleware
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// ROUTES

app.use("/", express.static(__dirname + "/public"));

var todos = [];

app.get("/", function(req, res) {
  //   res.send(todoContent);
  res.render("index", { todos: todos });
});

app.post("/", function(req, res) {
  todos.push(req.body.todos);
  res.redirect("/");
});

app.listen(port, function() {
  console.log("server is running on", port);
});
