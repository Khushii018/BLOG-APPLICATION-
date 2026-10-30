const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();


// ==========================================
// MODELS
// ==========================================

const User = require("./models/User");
const Post = require("./models/Post");
require("./models");


// ==========================================
// DATABASE
// ==========================================

const {
    sequelize,
    createdDatabase,
} = require("./config/database");


// ==========================================
// ROUTES
// ==========================================

const authRoutes =
    require("./routes/authRoutes");

const adminRoutes =
    require("./routes/adminRoutes");

const postRoutes =
    require("./routes/postRoutes");


// ==========================================
// APP
// ==========================================

const app = express();


// ==========================================
// CORS
// ==========================================

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);


// ==========================================
// JSON BODY
// ==========================================

app.use(
    express.json()
);


// ==========================================
// UPLOADED IMAGES
// ==========================================

app.use(
    "/uploads",
    express.static(
        path.join(
            __dirname,
            "uploads"
        )
    )
);


// ==========================================
// START SERVER
// ==========================================

const startServer = async () => {

    try {

        // Create database if it doesn't exist
        await createdDatabase();


        // Connect database
        await sequelize.authenticate();

        console.log(
            "Database connected"
        );


        // Create/update tables
        await sequelize.sync({
            alter: true,
        });

        console.log(
            "Tables synchronized"
        );


        // ======================================
        // AUTH ROUTES
        // ======================================

        app.use(
            "/auth",
            authRoutes(User)
        );


        // ======================================
        // POST ROUTES
        // ======================================

        app.use(
            "/posts",
            postRoutes(
                Post,
                User
            )
        );


        // ======================================
        // ADMIN ROUTES
        // ======================================

        app.use(
            "/admin",
            adminRoutes(
                Post,
                User
            )
        );


        // ======================================
        // START
        // ======================================

        app.listen(
            5000,
            () => {

                console.log(
                    "Server running on port 5000"
                );

            }
        );


    } catch (error) {

        console.error(
            "Server startup error:",
            error
        );

    }

};


startServer();