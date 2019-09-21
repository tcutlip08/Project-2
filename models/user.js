module.exports = function(sequelize, DataTypes) {
  console.log("user");

  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING
    },
    name: {
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

  User.seed = function() {
    console.log("called seed user");
    User.create({
      email: "tcutlip08@gmail.com",
      name: "Nate Cutlip"
    });
    User.create({
      email: "jessman51386@gmail.com",
      name: "Jesse McKinney"
    });
    User.create({
      email: "saeedaltaf@gmail.com",
      name: "Saeed Altaf"
    });
    User.create({
      email: "rpatel209@student.gsu.edu",
      name: "Roopa Patel"
    });
  };

  return User;
};
