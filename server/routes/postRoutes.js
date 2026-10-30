const express = require("express");

const authenticate =
    require("../middleware/authMiddleware");

const upload =
    require("../middleware/uploadMiddlware");

const router = express.Router();


module.exports = (Post, User) => {


    // ==========================================
    // GET ALL POSTS
    // ==========================================

    router.get("/", async (req, res) => {

        console.log("GET /posts reached");

        try {

            const posts =
                await Post.findAll({

                    include: [
                        {
                            model: User,

                            attributes: [
                                "id",
                                "username",
                            ],
                        },
                    ],

                    order: [
                        ["createdAt", "DESC"],
                    ],

                });


            console.log(
                "Posts fetched:",
                posts.length
            );


            res.status(200).json(posts);


        } catch (error) {

            console.error(
                "GET /posts ERROR:",
                error
            );


            res.status(500).json({

                message:
                    "Failed to fetch posts",

                error:
                    error.message,

            });

        }

    });


    // ==========================================
    // GET SINGLE POST
    // ==========================================

    router.get(
        "/:id",
        async (req, res) => {

            try {

                const post =
                    await Post.findByPk(
                        req.params.id,
                        {

                            include: [
                                {
                                    model: User,

                                    attributes: [
                                        "id",
                                        "username",
                                    ],
                                },
                            ],

                        }
                    );


                if (!post) {

                    return res.status(404).json({

                        message:
                            "Post not found",

                    });

                }


                res.status(200).json(post);


            } catch (error) {

                console.error(
                    "GET SINGLE POST ERROR:",
                    error
                );


                res.status(500).json({

                    message:
                        "Failed to fetch post",

                    error:
                        error.message,

                });

            }

        }
    );


    // ==========================================
    // CREATE POST + IMAGE
    // ==========================================

    router.post(
        "/",

        authenticate,

        upload.single("image"),

        async (req, res) => {

            try {

                console.log(
                    "POST /posts reached"
                );

                console.log(
                    "Body:",
                    req.body
                );

                console.log(
                    "File:",
                    req.file
                );


                const {
                    title,
                    excerpt,
                    content,
                    category,
                } = req.body;


                // ------------------------------
                // VALIDATION
                // ------------------------------

                if (
                    !title ||
                    !content
                ) {

                    return res.status(400).json({

                        message:
                            "Title and content are required",

                    });

                }


                // ------------------------------
                // IMAGE PATH
                // ------------------------------

                let image = null;


                if (req.file) {

                    image =
                        `/uploads/${req.file.filename}`;

                }


                // ------------------------------
                // CREATE POST
                // ------------------------------

                const post =
                    await Post.create({

                        title:
                            title.trim(),

                        excerpt:
                            excerpt
                                ? excerpt.trim()
                                : null,

                        content:
                            content.trim(),

                        category:
                            category || "React",

                        image,

                        userId:
                            req.user.id,

                    });


                // ------------------------------
                // RESPONSE
                // ------------------------------

                res.status(201).json({

                    message:
                        "Post created successfully",

                    post,

                });


            } catch (error) {

                console.error(
                    "CREATE POST ERROR:",
                    error
                );


                res.status(500).json({

                    message:
                        "Failed to create post",

                    error:
                        error.message,

                });

            }

        }
    );


    return router;

};