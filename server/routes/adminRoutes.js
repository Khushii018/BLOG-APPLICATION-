const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

module.exports = (Post, User) => {

    // All routes below require ADMIN
    router.use(authenticate);
    router.use(isAdmin);


    // GET ALL POSTS
    router.get("/posts", async (req, res) => {
        try {
            const posts = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["id", "username", "email"],
                    },
                ],
                order: [["createdAt", "DESC"]],
            });

            res.json(posts);

        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch posts",
                error: error.message,
            });
        }
    });


    // CREATE POST
    router.post("/posts", async (req, res) => {
        try {
            const { title, content, image } = req.body;

            const post = await Post.create({
                title,
                content,
                image,
                userId: req.user.id,
            });

            res.status(201).json({
                message: "Post created",
                post,
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to create post",
                error: error.message,
            });
        }
    });


    // UPDATE POST
    router.put("/posts/:id", async (req, res) => {
        try {
            const post = await Post.findByPk(
                req.params.id
            );

            if (!post) {
                return res.status(404).json({
                    message: "Post not found",
                });
            }

            const { title, content, image } = req.body;

            await post.update({
                title,
                content,
                image,
            });

            res.json({
                message: "Post updated successfully",
                post,
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to update post",
                error: error.message,
            });
        }
    });


    // DELETE POST
    router.delete("/posts/:id", async (req, res) => {
        try {
            const post = await Post.findByPk(
                req.params.id
            );

            if (!post) {
                return res.status(404).json({
                    message: "Post not found",
                });
            }

            await post.destroy();

            res.json({
                message: "Post deleted successfully",
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to delete post",
                error: error.message,
            });
        }
    });


    // GET ALL USERS
    router.get("/users", async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ["password"],
                },
            });

            res.json(users);

        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch users",
                error: error.message,
            });
        }
    });


    // DELETE USER
    router.delete("/users/:id", async (req, res) => {
        try {
            const user = await User.findByPk(
                req.params.id
            );

            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            await user.destroy();

            res.json({
                message: "User deleted successfully",
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to delete user",
                error: error.message,
            });
        }
    });


    return router;
};