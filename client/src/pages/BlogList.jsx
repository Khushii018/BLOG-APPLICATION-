import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Badge,
    Container,
    SegmentedControl,
    Text,
    TextInput,
    Title,
} from "@mantine/core";

import {
    IconArrowUpRight,
    IconSearch,
    IconSparkles,
} from "@tabler/icons-react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    fetchPosts,
} from "../redux/posts/postSlice";

import {
    useNavigate,
} from "react-router-dom";

import PostCard from "../components/PostCard";


function BlogList() {

    const navigate =
        useNavigate();

    const dispatch =
        useDispatch();


    // GET POSTS FROM REDUX

    const {
        posts,
        loading,
        error,
    } = useSelector(
        (state) => state.posts
    );


    // SEARCH

    const [query, setQuery] =
        useState("");


    // CATEGORY

    const [category, setCategory] =
        useState("All");


    
    // FETCH POSTS FROM BACKEND

    useEffect(() => {

        dispatch(
            fetchPosts()
        );

    }, [dispatch]);


    // CATEGORIES

    const categories =
        useMemo(() => {

            const uniqueCategories =
                [
                    ...new Set(
                        posts
                            .map(
                                (post) =>
                                    post.category
                            )
                            .filter(Boolean)
                    ),
                ];

            return [
                "All",
                ...uniqueCategories,
            ];

        }, [posts]);


    // FILTER POSTS

    const filtered =
        useMemo(() => {

            return posts.filter(
                (post) => {

                    const searchText =
                        `
                            ${post.title || ""}
                            ${post.excerpt || ""}
                            ${post.author || ""}
                            ${post.User?.username || ""}
                        `
                            .toLowerCase();


                    const matchesSearch =
                        searchText.includes(
                            query.toLowerCase()
                        );


                    const matchesCategory =
                        category === "All" ||
                        post.category ===
                            category;


                    return (
                        matchesSearch &&
                        matchesCategory
                    );

                }
            );

        }, [
            posts,
            query,
            category,
        ]);


    // LOADING

    if (loading && posts.length === 0) {

        return (

            <main
                className="
                    min-h-screen
                    bg-slate-50
                "
            >

                <section
                    className="
                        flex
                        min-h-[70vh]
                        items-center
                        justify-center
                    "
                >

                    <div
                        className="
                            text-center
                        "
                    >

                        <div
                            className="
                                mx-auto
                                mb-5
                                h-12
                                w-12
                                animate-spin
                                rounded-full
                                border-4
                                border-slate-200
                                border-t-indigo-600
                            "
                        />

                        <Text
                            fw={600}
                            className="
                                text-slate-700
                            "
                        >
                            Loading articles...
                        </Text>

                        <Text
                            size="sm"
                            c="dimmed"
                            mt={4}
                        >
                            Getting the latest
                            posts for you.
                        </Text>

                    </div>

                </section>

            </main>

        );

    }


    // ERROR

    if (error && posts.length === 0) {

        return (

            <main
                className="
                    min-h-screen
                    bg-slate-50
                    px-4
                    py-20
                "
            >

                <div
                    className="
                        mx-auto
                        max-w-lg
                        rounded-2xl
                        border
                        border-red-100
                        bg-white
                        p-8
                        text-center
                        shadow-sm
                    "
                >

                    <div
                        className="
                            mx-auto
                            mb-5
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-full
                            bg-red-50
                            text-red-500
                        "
                    >
                        !
                    </div>


                    <Title
                        order={3}
                        className="
                            text-slate-900
                        "
                    >
                        Couldn't load articles
                    </Title>


                    <Text
                        size="sm"
                        c="dimmed"
                        mt="sm"
                    >
                        {error}
                    </Text>


                    <button
                        type="button"
                        onClick={() =>
                            dispatch(
                                fetchPosts()
                            )
                        }
                        className="
                            mt-6
                            rounded-xl
                            bg-slate-950
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-indigo-600
                        "
                    >
                        Try again
                    </button>

                </div>

            </main>

        );

    }


    return (

        <main
            className="
                min-h-screen
                bg-slate-50
            "
        >


            {/* HERO SECTION */}

            <section
                className="
                    relative
                    overflow-hidden
                    border-b
                    border-slate-200
                    bg-white
                "
            >

                {/* Background decoration */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-32
                        -top-32
                        h-80
                        w-80
                        rounded-full
                        bg-indigo-100/60
                        blur-3xl
                    "
                />


                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-40
                        -left-32
                        h-80
                        w-80
                        rounded-full
                        bg-violet-100/50
                        blur-3xl
                    "
                />


                <Container
                    size="lg"
                    className="
                        relative
                        py-16
                        sm:py-20
                        lg:py-24
                    "
                >

                    <div
                        className="
                            mx-auto
                            flex
                            max-w-4xl
                            flex-col
                            items-center
                            text-center
                        "
                    >


                        {/* BLOG BADGE */}

                        <div
                            className="
                                mb-6
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-indigo-100
                                bg-indigo-50
                                px-4
                                py-2
                                shadow-sm
                            "
                        >

                            <span
                                className="
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-indigo-600
                                    text-white
                                "
                            >

                                <IconSparkles
                                    size={11}
                                />

                            </span>


                            <span
                                className="
                                    text-xs
                                    font-bold
                                    tracking-wider
                                    text-indigo-600
                                "
                            >
                                INKSPACE BLOG
                            </span>

                        </div>


                        {/* MAIN HEADING */}

                        <Title
                            order={1}
                            className="
                                max-w-3xl
                                text-4xl
                                font-black
                                leading-tight
                                tracking-tight
                                text-slate-950
                                sm:text-5xl
                                lg:text-6xl
                            "
                        >

                            Ideas that help you

                            <span
                                className="
                                    block
                                    bg-gradient-to-r
                                    from-indigo-600
                                    via-violet-600
                                    to-purple-600
                                    bg-clip-text
                                    text-transparent
                                "
                            >
                                build better.
                            </span>

                        </Title>


                        {/* DESCRIPTION */}

                        <Text
                            size="lg"
                            c="dimmed"
                            className="
                                mt-5
                                max-w-2xl
                                text-base
                                leading-7
                                sm:text-lg
                            "
                        >
                            Practical articles, tutorials
                            and insights about development,
                            technology, design and the
                            journey of building software.
                        </Text>


                        {/* SEARCH */}

                        <div
                            className="
                                mt-8
                                w-full
                                max-w-2xl
                            "
                        >

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-2
                                    shadow-md
                                    transition-all
                                    duration-300
                                    focus-within:border-indigo-300
                                    focus-within:shadow-xl
                                    focus-within:shadow-indigo-100
                                "
                            >

                                <TextInput
                                    variant="unstyled"
                                    size="md"
                                    leftSection={
                                        <IconSearch
                                            size={21}
                                            className="
                                                text-slate-400
                                            "
                                        />
                                    }
                                    placeholder="
                                        Search articles, topics or authors...
                                    "
                                    value={query}
                                    onChange={(e) =>
                                        setQuery(
                                            e.currentTarget
                                                .value
                                        )
                                    }
                                    className="
                                        px-3
                                    "
                                />

                            </div>

                        </div>


                        {/* BLOG STATS */}

                        <div
                            className="
                                mt-6
                                flex
                                flex-wrap
                                items-center
                                justify-center
                                gap-x-5
                                gap-y-2
                                text-sm
                                text-slate-500
                            "
                        >

                            <span>

                                <strong
                                    className="
                                        font-bold
                                        text-slate-800
                                    "
                                >
                                    {posts.length}
                                </strong>

                                {" "}articles

                            </span>


                            <span
                                className="
                                    h-4
                                    w-px
                                    bg-slate-300
                                "
                            />


                            <span>

                                <strong
                                    className="
                                        font-bold
                                        text-slate-800
                                    "
                                >
                                    {categories.length - 1}
                                </strong>

                                {" "}categories

                            </span>


                            <span
                                className="
                                    h-4
                                    w-px
                                    bg-slate-300
                                "
                            />


                            <span>
                                Community driven
                            </span>

                        </div>

                    </div>

                </Container>

            </section>


            {/* ================================================= */}
            {/* EXPLORE / POSTS SECTION */}
            {/* ================================================= */}

            <Container
                size="lg"
                className="
                    py-10
                    sm:py-14
                "
            >


                {/* EXPLORE HEADER */}

                <div
                    className="
                        mb-7
                        flex
                        flex-col
                        gap-5
                        lg:flex-row
                        lg:items-end
                        lg:justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                mb-2
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-indigo-600
                            "
                        >
                            Explore
                        </p>


                        <Title
                            order={2}
                            className="
                                text-2xl
                                font-bold
                                tracking-tight
                                text-slate-950
                                sm:text-3xl
                            "
                        >
                            Latest articles
                        </Title>


                        <Text
                            size="sm"
                            c="dimmed"
                            className="
                                mt-1
                            "
                        >
                            Fresh ideas and practical
                            knowledge from the community.
                        </Text>

                    </div>


                    {/* CATEGORY FILTER */}

                    {categories.length > 1 && (

                        <div
                            className="
                                max-w-full
                                overflow-x-auto
                                pb-1
                            "
                        >

                            <SegmentedControl
                                value={category}
                                onChange={
                                    setCategory
                                }
                                data={categories}
                                radius="lg"
                                size="sm"
                                className="
                                    min-w-max
                                    border
                                    border-slate-200
                                    bg-white
                                    p-1
                                    shadow-sm
                                "
                            />

                        </div>

                    )}

                </div>


                {/* RESULT COUNT */}

                <div
                    className="
                        mb-6
                        flex
                        items-center
                        justify-between
                    "
                >

                    <Text
                        size="sm"
                        c="dimmed"
                    >

                        {filtered.length === 0
                            ? "No results"
                            : `Showing ${filtered.length} ${
                                filtered.length === 1
                                    ? "article"
                                    : "articles"
                            }`}

                    </Text>


                    {query && (

                        <button
                            type="button"
                            onClick={() =>
                                setQuery("")
                            }
                            className="
                                rounded-lg
                                px-2
                                py-1
                                text-sm
                                font-semibold
                                text-indigo-600
                                transition-all
                                duration-200
                                hover:bg-indigo-50
                                hover:text-indigo-700
                            "
                        >
                            Clear search
                        </button>

                    )}

                </div>


                {/* ================================================= */}
                {/* POSTS */}
                {/* ================================================= */}

                {filtered.length > 0 ? (

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-6
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "
                    >

                        {filtered.map(
                            (post) => {

                                // ==========================================
                                // IMAGE URL
                                // ==========================================

                                const imageUrl =
                                    post.image
                                        ? post.image.startsWith(
                                            "http"
                                        )
                                            ? post.image
                                            : `http://localhost:5000${post.image}`
                                        : null;


                                return (

                                    <div
                                        key={post.id}
                                        className="
                                            group
                                            h-full
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                        "
                                    >

                                        <PostCard
                                            post={{

                                                ...post,

                                                // Convert backend image
                                                // path into complete URL
                                                image:
                                                    imageUrl,

                                                // Sequelize returns
                                                // the author inside User
                                                author:
                                                    post.author ||
                                                    post.User?.username ||
                                                    "User",

                                            }}
                                        />

                                    </div>

                                );

                            }
                        )}

                    </div>

                ) : (

                    /* ================================================= */
                    /* EMPTY STATE */
                    /* ================================================= */

                    <div
                        className="
                            flex
                            min-h-[320px]
                            flex-col
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-300
                            bg-white
                            px-6
                            text-center
                            shadow-sm
                        "
                    >

                        <div
                            className="
                                mb-5
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                bg-indigo-50
                                text-indigo-600
                                shadow-sm
                            "
                        >

                            <IconSearch
                                size={26}
                            />

                        </div>


                        <Title
                            order={3}
                            className="
                                text-xl
                                font-bold
                                text-slate-900
                            "
                        >
                            No articles found
                        </Title>


                        <Text
                            size="sm"
                            c="dimmed"
                            className="
                                mt-2
                                max-w-sm
                                leading-6
                            "
                        >
                            We couldn't find any
                            articles matching your
                            search or category.
                        </Text>


                        <button
                            type="button"
                            onClick={() => {

                                setQuery("");

                                setCategory(
                                    "All"
                                );

                            }}
                            className="
                                mt-6
                                rounded-xl
                                bg-slate-900
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                shadow-sm
                                transition-all
                                duration-200
                                hover:-translate-y-0.5
                                hover:bg-indigo-600
                                hover:shadow-lg
                            "
                        >
                            View all articles
                        </button>

                    </div>

                )}


                {/* ================================================= */}
                {/* WRITER CTA */}
                {/* ================================================= */}

                {filtered.length > 0 && (

                    <section
                        className="
                            relative
                            mt-14
                            overflow-hidden
                            rounded-3xl
                            border
                            border-indigo-200
                            bg-gradient-to-br
                            from-indigo-50
                            via-white
                            to-violet-50
                        "
                    >

                        {/* Decorative background */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -right-16
                                -top-20
                                h-48
                                w-48
                                rounded-full
                                bg-indigo-200/40
                                blur-2xl
                            "
                        />


                        <div
                            className="
                                pointer-events-none
                                absolute
                                -bottom-20
                                -left-16
                                h-40
                                w-40
                                rounded-full
                                bg-violet-200/40
                                blur-2xl
                            "
                        />


                        <div
                            className="
                                relative
                                flex
                                flex-col
                                gap-6
                                px-6
                                py-8
                                sm:px-8
                                sm:py-10
                                md:flex-row
                                md:items-center
                                md:justify-between
                            "
                        >

                            <div>

                                <Badge
                                    variant="light"
                                    color="indigo"
                                    size="sm"
                                    radius="sm"
                                >
                                    For writers
                                </Badge>


                                <Title
                                    order={3}
                                    className="
                                        mt-3
                                        text-xl
                                        font-bold
                                        tracking-tight
                                        text-slate-950
                                        sm:text-2xl
                                    "
                                >
                                    Have something to share?
                                </Title>


                                <Text
                                    size="sm"
                                    c="dimmed"
                                    className="
                                        mt-2
                                        max-w-xl
                                        leading-6
                                    "
                                >
                                    Share your knowledge,
                                    experience and ideas
                                    with the InkSpace
                                    community.
                                </Text>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/create-post"
                                    )
                                }
                                className="
                                    flex
                                    shrink-0
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-slate-950
                                    px-6
                                    py-3
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-md
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:bg-indigo-600
                                    hover:shadow-xl
                                    hover:shadow-indigo-200
                                "
                            >

                                Start writing

                                <IconArrowUpRight
                                    size={17}
                                />

                            </button>

                        </div>

                    </section>

                )}

            </Container>

        </main>

    );
}


export default BlogList;