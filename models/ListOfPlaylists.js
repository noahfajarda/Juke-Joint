const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ListOfPlaylists extends Model {}
ListOfPlaylists.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: "ListOfPlaylists",
    }
);

module.exports = ListOfPlaylists;
