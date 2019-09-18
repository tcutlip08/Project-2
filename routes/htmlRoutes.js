var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home.html"));
    //below would connect to the new home.html
    // res.sendFile(path.join(__dirname, "../template/home.html"));
    //above would connect to the new home.html
  });

  app.get("/signIn", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signIn.html"));
  });

  app.get("/signUp", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signUp.html"));
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
};
