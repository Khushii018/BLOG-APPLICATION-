const { DataTypes } = require("sequelize");

const {
    sequelize
} = require("../config/database");


const Post = sequelize.define(
    "Post",
    {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        excerpt: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }
);


module.exports = Post;