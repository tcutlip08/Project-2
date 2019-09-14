module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
=======
  console.log("post");

>>>>>>> 3f3425f142211831b4c3fd6be545f95ade1ecbfe
  var Post = sequelize.define("Post", {
    PosterID: DataTypes.INTEGER,
    Task: DataTypes.TEXT,
    Accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    AccepterID: DataTypes.INTEGER,
    Completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

<<<<<<< HEAD
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  //   Post.create({
  //     PosterID: 1,
  //     Task: "Try me",
  //     AccepterID: 2
  //   });
=======
  Post.associate = models = function(models) {
    Post.belongsToMany(models.User, {
      through: "UserPost",
      as: "Users",
      foreignKey: "PostId",
      otherKey: "UserId"
    });
  };

  Post.seed = function() {
    console.log("called posts");
    Post.create({
      PosterID: 1,
      Task: "Blow me"
    });
  };
>>>>>>> 3f3425f142211831b4c3fd6be545f95ade1ecbfe

  return Post;
};
