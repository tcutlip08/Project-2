module.exports = function(sequelize, DataTypes) {
  console.log("post");

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

  return Post;
};
