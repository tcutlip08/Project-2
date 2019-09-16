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
    //This Guy wasn't in the first push Nate made///////////////////////
    // createdAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    // },
    // timestamps: true
    //This Guy wasn't in the first push Nate made///////////////////////
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
