module.exports = function(sequelize, DataTypes) {
  console.log("userpost");
  var UserPost = sequelize.define("UserPost", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  });
  return UserPost;
};

// UserId: {
//   type: DataTypes.INTEGER,
//   allowNull: false,
//   references: {
//     model: "User",
//     key: "id"
//   }
// },
// PostId: {
//   type: DataTypes.INTEGER,
//   allowNull: false,
//   references: {
//     model: "Post",
//     key: "id"
//   }
// }

// Post.associate = function(models) {
//   Post.belongsTo(models.User, {
//     foreignKey: {
//       allowNull: false
//     }
//   });
// };
// Post.create({
//   PosterID: 1,
//   Task: "Blow me",
//   AccepterID: 2
// });
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
