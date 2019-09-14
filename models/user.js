module.exports = function(sequelize, DataTypes) {
  console.log("user");

  var User = sequelize.define("User", {
    //This Guy wasn't in the first push Nate made
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
      //This Guy wasn't in the first push Nate made
    },
    FBID: {
      type: DataTypes.STRING
    },
    Name: {
      type: DataTypes.STRING
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
