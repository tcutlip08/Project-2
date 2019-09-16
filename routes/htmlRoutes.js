var db = require("../models");
// var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendfile("./public/html/index.html");
  });

  app.get("/home", function(req, res) {
    console.log("default");
    db.User.findOne({ where: { email: req.params.email } }).then(function() {
      res.sendfile("./public/html/home.html");
    });
  });

  app.get("/signIn", function(req, res) {
    console.log("sign in");
    res.sendfile("./public/html/signIn.html");
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
  app.get("/*", function(req, res) {
    res.render("404");
  });
};
