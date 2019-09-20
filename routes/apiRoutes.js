var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/homeUser", function(req, res) {
    // console.log("One User");

    db.User.findOne({
      where: {
        email: req.query.email
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/allPosts", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/allUsers", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/history", function(req, res) {
    console.log("default");
    // db.User.findOne({ where: { email: req.body.email } }).then(function(
    db.User.findOne({ where: { email: "tcutlip08@gmail.com" } }).then(function(
      dbUser
    ) {
      console.log(dbUser.dataValues);
      db.Post.findAll({
        where: {
          $or: [
            { PosterID: dbUser.dataValues.id },
            { AccepterID: dbUser.dataValues.id }
          ]
        }
      }).then(function(dbPost) {
        console.log(dbPost);
        res.json(dbPost);
      });
    });
  });

  app.get("/api/home", function(req, res) {
    console.log("default");
    // db.User.findOne({ where: { email: req.params.email } }).then(function(
    db.User.findOne({ where: { email: "tcutlip08@gmail.com" } }).then(function(
      dbUser
    ) {
      // console.log(dbUser.dataValues.id);
      db.Post.findAll({
        where: {
          $or: [
            { PosterID: { $ne: dbUser.dataValues.id } },
            { AccepterID: { $ne: dbUser.dataValues.id } }
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

  app.post("/post/new", function(req, res) {
    console.log("new post");
    db.Post.create({
      // PosterID: req.body.id,
      PosterID: 3,
      Subject: req.body.subject,
      Task: req.body.task
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/accept/:postID/:userID", function(req, res) {
    console.log("accept api");
    // console.log(res);
    db.Post.update(
      {
        AccepterID: req.params.userID,
        Accepted: true
      },
      {
        where: {
          id: req.params.postID
        }
      }
    ).then(function(data) {
      res.json(data);
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
  // app.delete("/api/posts/:id", function(req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });
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
