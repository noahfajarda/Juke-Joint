const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
    {
        title: DataTypes.STRING,
        body: DataTypes.STRING,
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: "post",
    }
);

module.exports = Post;
