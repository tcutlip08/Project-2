var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/homeUser", function(req, res) {
    db.User.findOne({
      where: {
        email: req.query.email
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/allPosts/:subject", function(req, res) {
    db.Post.findAll({
      where: { Accepted: false, Subject: req.params.subject }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/allPosts/notAcc", function(req, res) {
    db.Post.findAll({ where: { Accepted: false } }).then(function(dbPost) {
      res.json(dbPost);
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

  app.get("/api/history/:id", function(req, res) {
    db.Post.findAll({
      where: {
        $or: [{ PosterID: req.params.id }, { AccepterID: req.params.id }]
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/signUp/new", function(req, res) {
    db.User.create({
      email: req.body.email,
      name: req.body.name
    })
      .on("success", function() {
        res.json({ UserCreated: true });
      })
      .on("failure", function() {
        res.json({ UserCreated: false });
      });
  });

  app.post("/post/new", function(req, res) {
    console.log("new post");
    console.log(req.body.subject);
    db.Post.create({
      PosterID: req.body.id,
      Subject: req.body.subject,
      Task: req.body.task
    }).then(function(data) {
      res.json({ id: data.id });
    });
  });

  app.get("/api/accept/:postID/:userID", function(req, res) {
    console.log("accept api");
    console.log(req.params);
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
      console.log(data);
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
};
