const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbName = process.env.DB_NAME;

// Connection without selecting a database
const databaseConnection = new Sequelize(
    "",
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
);

// Normal Sequelize connection
const sequelize = new Sequelize(
    dbName,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
);

const createdDatabase = async () => {
    try {
        await databaseConnection.query(
            `CREATE DATABASE IF NOT EXISTS \`${dbName}\``
        );

        console.log(`Database "${dbName}" is ready`);

        await databaseConnection.close();

    } catch (error) {
        console.error("Database creation error:", error);
        process.exit(1);
    }
};

module.exports = {
    sequelize,
    createdDatabase,
};