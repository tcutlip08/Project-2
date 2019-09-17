var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  app.get("/signIn", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signIn.html"));
  });

  app.get("/signUp", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signUp.html"));
  });

  app.get("/home", function(req, res) {
    console.log("default");
    // db.User.findOne({ where: { email: req.params.email } }).then(function(
    db.User.findOne({ where: { email: "tcutlip08@gmail.com" } }).then(function(
      dbUser
    ) {
      console.log(dbUser.dataValues);
      db.Post.findAll({ where: { PosterId: dbUser.dataValues.id } }).then(
        function(dbPost) {
          console.log(dbPost[0].dataValues);
          res.json(dbPost[0].dataValues);
        }
      );
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};
