module.exports = function(sequelize, DataTypes) {
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

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

//   Post.create({
//     PosterID: 1,
//     Task: "Blow me",
//     AccepterID: 2
//   });

  return Post;
};
