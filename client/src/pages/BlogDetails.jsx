import {
    useEffect,
} from "react";

import {
    Container,
    Image,
    Paper,
    Badge,
    Group,
    Title,
    Text,
    Button,
    Divider,
} from "@mantine/core";

import {
    IconArrowLeft,
} from "@tabler/icons-react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    fetchPost,
    clearSelectedPost,
} from "../redux/posts/postSlice";


function BlogDetails() {

    const {
        id,
    } = useParams();


    const navigate =
        useNavigate();


    const dispatch =
        useDispatch();


    // ==========================================
    // GET POST FROM REDUX
    // ==========================================

    const {
        selectedPost,
        loading,
        error,
    } = useSelector(
        (state) =>
            state.posts
    );


    // ==========================================
    // FETCH SINGLE POST
    // ==========================================

    useEffect(() => {

        dispatch(
            fetchPost(id)
        );


        return () => {

            dispatch(
                clearSelectedPost()
            );

        };

    }, [
        dispatch,
        id,
    ]);


    // ==========================================
    // LOADING
    // ==========================================

    if (
        loading ||
        !selectedPost
    ) {

        if (loading) {

            return (

                <Container
                    size="md"
                    py={80}
                >

                    <div
                        className="
                            flex
                            min-h-[400px]
                            flex-col
                            items-center
                            justify-center
                            text-center
                        "
                    >

                        <div
                            className="
                                mb-5
                                h-10
                                w-10
                                animate-spin
                                rounded-full
                                border-4
                                border-slate-200
                                border-t-indigo-600
                            "
                        />

                        <Text
                            fw={600}
                        >
                            Loading article...
                        </Text>

                    </div>

                </Container>

            );

        }


        // ======================================
        // ERROR / NOT FOUND
        // ======================================

        return (

            <Container
                size="md"
                py={80}
            >

                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-10
                        text-center
                        shadow-sm
                    "
                >

                    <Title
                        order={2}
                    >
                        Post not found
                    </Title>


                    <Text
                        c="dimmed"
                        mt="sm"
                    >
                        {error ||
                            "This article doesn't exist."}
                    </Text>


                    <Button
                        mt="xl"
                        onClick={() =>
                            navigate(
                                "/posts"
                            )
                        }
                    >
                        Back to blogs
                    </Button>

                </div>

            </Container>

        );

    }


    // ==========================================
    // AUTHOR
    // ==========================================

    const author =
        selectedPost.author ||
        selectedPost.User?.username ||
        "User";


    // ==========================================
    // DATE
    // ==========================================

    const date =
        selectedPost.createdAt
            ? new Date(
                selectedPost.createdAt
            ).toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }
            )
            : "";


    // ==========================================
    // IMAGE URL
    // ==========================================

    const imageUrl =
        selectedPost.image
            ? selectedPost.image.startsWith("http")
                ? selectedPost.image
                : `http://localhost:5000${selectedPost.image}`
            : null;


    return (

        <main
            className="
                min-h-screen
                bg-slate-50
            "
        >

            <Container
                size="md"
                className="
                    py-8
                    sm:py-12
                    lg:py-16
                "
            >


                {/* ===================================== */}
                {/* BACK BUTTON */}
                {/* ===================================== */}

                <Button
                    variant="subtle"
                    color="gray"
                    leftSection={
                        <IconArrowLeft
                            size={17}
                        />
                    }
                    onClick={() =>
                        navigate(
                            "/posts"
                        )
                    }
                    className="
                        mb-4
                    "
                >
                    Back to blogs
                </Button>


                {/* ===================================== */}
                {/* ARTICLE */}
                {/* ===================================== */}

                <Paper
                    radius="xl"
                    shadow="sm"
                    withBorder
                    className="
                        overflow-hidden
                        border-slate-200
                        bg-white
                    "
                >


                    {/* ================================= */}
                    {/* IMAGE */}
                    {/* ================================= */}

                    {imageUrl && (

                        <Image
                            src={imageUrl}
                            h={{
                                base: 230,
                                md: 380,
                            }}
                            fit="cover"
                            alt={
                                selectedPost.title
                            }
                        />

                    )}


                    <div
                        className="
                            p-5
                            sm:p-8
                            lg:p-10
                        "
                    >


                        {/* ================================= */}
                        {/* CATEGORY + DATE */}
                        {/* ================================= */}

                        <Group
                            justify="space-between"
                            align="center"
                        >

                            <Badge
                                color="indigo"
                                variant="light"
                                size="lg"
                            >
                                {selectedPost.category ||
                                    "General"}
                            </Badge>


                            <Text
                                size="sm"
                                c="dimmed"
                            >
                                {date}
                            </Text>

                        </Group>


                        {/* ================================= */}
                        {/* TITLE */}
                        {/* ================================= */}

                        <Title
                            order={1}
                            className="
                                mt-5
                                text-3xl
                                font-black
                                leading-tight
                                tracking-tight
                                text-slate-950
                                sm:text-4xl
                                lg:text-5xl
                            "
                        >
                            {selectedPost.title}
                        </Title>


                        {/* ================================= */}
                        {/* EXCERPT */}
                        {/* ================================= */}

                        {selectedPost.excerpt && (

                            <Text
                                size="lg"
                                c="dimmed"
                                className="
                                    mt-5
                                    max-w-3xl
                                    leading-8
                                "
                            >
                                {
                                    selectedPost.excerpt
                                }
                            </Text>

                        )}


                        {/* ================================= */}
                        {/* AUTHOR */}
                        {/* ================================= */}

                        <Text
                            mt="lg"
                            size="sm"
                            c="dimmed"
                        >

                            By{" "}

                            <span
                                className="
                                    font-semibold
                                    text-slate-800
                                "
                            >
                                {author}
                            </span>

                        </Text>


                        <Divider
                            my="xl"
                        />


                        {/* ================================= */}
                        {/* CONTENT */}
                        {/* ================================= */}

                        <Text
                            size="lg"
                            lh={1.8}
                            className="
                                whitespace-pre-line
                                text-slate-700
                            "
                        >
                            {
                                selectedPost.content
                            }
                        </Text>


                    </div>

                </Paper>

            </Container>

        </main>

    );

}


export default BlogDetails;