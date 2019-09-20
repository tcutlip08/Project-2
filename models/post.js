module.exports = function(sequelize, DataTypes) {
  console.log("post");

  var Post = sequelize.define("Post", {
    PosterID: DataTypes.INTEGER,
    Subject: DataTypes.TEXT,
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
      PosterID: 2,
      Subject: "english",
      Task: "I can't spell naybohrhud",
      Accepted: true,
      AccepterID: 1,
      Completed: true
    });
    Post.create({
      PosterID: 1,
      Subject: "math",
      Task: "What is MMAAFF?!?!",
      Accepted: true,
      AccepterID: 3
    });
    Post.create({
      PosterID: 3,
      Subject: "science",
      Task:
        "I have my safety glasses, so atleast I look like i know what im doing"
    });
  };

  return Post;
};
