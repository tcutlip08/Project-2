module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    FBID: DataTypes.STRING,
    Name: DataTypes.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  //   User.create({
  //     FBID: "F1R3B453",
  //     Name: "Nate"
  //   });
  //   User.create({
  //     FBID: "2F1R3B453",
  //     Name: "Jesse"
  //   });

  return User;
};
