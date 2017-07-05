const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const models = require("./models");

const port = process.envPORT || 7000;
const app = express();
const expressValidator = require("express-validator");
const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(expressValidator());

// ROUTES

app.use("/", express.static(__dirname + "/public"));

// var todos = [];
// var complete = [];

app.get("/", function(req, res) {
  //   res.send(todoContent);
  models.sqltodo.findAll().then(function(tasks) {
    res.render("index", { todos: tasks });
  });
});

app.post("/", function(req, res) {
  var todo = req.body.Landi;
  console.log(req.body);
  var newTodo = models.sqltodo.build({ name: todo });
  // res.send(newTodo);

  newTodo
    .save()
    .then(function(savedTodo) {
      // res.send(savedTodo);
      res.redirect("/");
    })
    .catch(function() {
      res.status(500).send(err);
    });

  // todos.push(req.body.todos);
  // // console.log(todos);
  // res.render("index", { todos: todos, complete: complete });
});

app.post("/complete", function(req, res) {
  console.log(req.body.something);
  models.sqltodo
    .update(
      {
        completed: true
      },
      {
        where: {
          name: req.body.something
        }
      }
    )
    .then(function(completedTask) {
      res.redirect("/");
    });
});

app.post("/delete", function(req, res) {
  models.sqltodo
    .destroy({ where: { name: req.body.something } })
    .then(function(deletedTask) {
      res.redirect("/");
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

//   User.update({
//   email: 'awesomewinter@email.com',
//   age: 34
// }, {
//   where: {
//     user_name: 'winter',
//   }
// }).then(function (user){
//   // Code here.
//   // Do something after updating instance.
// })

// complete.push(req.body.name);
// console.log(complete);
// console.log(todos);
// for (var i = 0; i < complete.length; i++) {
//   if (todos.indexOf(complete[i]) > -1) {
//     console.log(todos[todos.indexOf(complete[i])]);
//     todos.splice(todos[todos.indexOf(complete[i])], 1);
//   }
// }
// res.render("index", { todos: todos, complete: complete });

app.listen(port, function() {
  console.log("server is running on", port);
});
