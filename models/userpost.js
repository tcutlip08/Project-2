module.exports = function(sequelize) {
  var UserP = sequelize.define("UserPost", {});

  // Post.associate = function (models) {
  //     Post.belongsTo(models.User, {
  //         foreignKey: {
  //             allowNull: false
  //         }
  //     });
  // };

  // Post.create({
  //     PosterID: 1,
  //     Task: "Blow me",
  //     AccepterID: 2
  // });

  return UserP;
};
