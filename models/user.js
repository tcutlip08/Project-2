module.exports = function(sequelize, DataTypes) {
  console.log("user");

  var User = sequelize.define("User", {
    FBID: {
      type: DataTypes.STRING
    },
    Name: {
      type: DataTypes.STRING
    }
  });

  User.associate = function(models) {
    User.belongsToMany(models.Post, {
      through: "UserPost",
      as: "Posts",
      foreignKey: "UserId",
      otherKey: "PostId"
    });
  };

  // User.associate = function (models) {
  //     User.hasMany(models.Post);
  //   };

  // User.associate = function(models) {
  //   User.hasMany(models.UserPA, {
  //     onDelete: "cascade"
  //   });
  // };

  User.seed = function() {
    console.log("called seed user");
    User.create({
      FBID: "F1R3B453",
      Name: "Nate"
    });
    User.create({
      FBID: "2F1R3B453",
      Name: "Jesse"
    });
  };

  return User;
};
