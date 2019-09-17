// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/allPosts", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/history", function(req, res) {
    console.log("default");
    // db.User.findOne({ where: { email: req.params.email } }).then(function(
    db.User.findOne({ where: { email: "tcutlip08@gmail.com" } }).then(function(
      dbUser
    ) {
      console.log(dbUser.dataValues);
      db.Post.findAll({
        where: {
          $or: [
            { PosterId: dbUser.dataValues.id },
            { AccepterId: dbUser.dataValues.id }
          ]
        }
      }).then(function(dbPost) {
        console.log(dbPost[0].dataValues);
        res.json(dbPost[0].dataValues);
      });
    });
  });

  app.get("/api/home", function(req, res) {
    console.log("default");
    // db.User.findOne({ where: { email: req.params.email } }).then(function(
    db.User.findOne({ where: { email: "tcutlip08@gmail.com" } }).then(function(
      dbUser
    ) {
      db.Post.findAll({
        where: {
          $or: [
            { $ne: { PosterId: dbUser.dataValues.id } },
            { $ne: { AccepterId: dbUser.dataValues.id } }
          ]
        }
      }).then(function(dbPost) {
        res.json(dbPost);
      });
    });
  });

  // POST route for saving a new post
  app.post("/signUp/new", function(req, res) {
    console.log("new user");
    console.log(res);
    db.User.create({
      email: req.body.email,
      name: req.body.name
    });
  });

  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
