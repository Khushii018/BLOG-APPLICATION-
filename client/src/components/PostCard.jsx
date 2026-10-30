import {
    Badge,
    Button,
    Card,
    Group,
    Image,
    Text,
    Title,
} from "@mantine/core";

import {
    IconArrowUpRight,
    IconCalendar,
} from "@tabler/icons-react";

import {
    useNavigate,
} from "react-router-dom";


function PostCard({ post }) {

    const navigate = useNavigate();


    return (

        <Card
            padding={0}
            radius="xl"
            withBorder
            className="
                h-full
                overflow-hidden
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-indigo-200
                hover:shadow-xl
                hover:shadow-slate-200/70
            "
        >

            {/* ================================= */}
            {/* IMAGE */}
            {/* ================================= */}

            <div
                className="
                    relative
                    h-48
                    w-full
                    overflow-hidden
                    bg-slate-100
                "
            >

                <Image
                    src={
                        post.image ||
                        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80"
                    }
                    alt={post.title}
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
                />


                {/* IMAGE OVERLAY */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/20
                        via-transparent
                        to-transparent
                    "
                />

            </div>


            {/* ================================= */}
            {/* CONTENT */}
            {/* ================================= */}

            <div
                className="
                    flex
                    min-h-[270px]
                    flex-col
                    p-5
                "
            >

                {/* CATEGORY + DATE */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-2
                    "
                >

                    <Badge
                        variant="light"
                        color="indigo"
                        radius="sm"
                        className="
                            font-semibold
                        "
                    >
                        {post.category}
                    </Badge>


                    <div
                        className="
                            flex
                            items-center
                            gap-1
                            text-xs
                            text-slate-400
                        "
                    >

                        <IconCalendar
                            size={13}
                        />

                        <span>
                            {post.createdAt}
                        </span>

                    </div>

                </div>


                {/* TITLE */}

                <Title
                    order={3}
                    className="
                        mt-4
                        line-clamp-2
                        cursor-pointer
                        text-lg
                        font-bold
                        leading-6
                        tracking-tight
                        text-slate-900
                        transition-colors
                        duration-200
                        hover:text-indigo-600
                    "
                    onClick={() =>
                        navigate(
                            `/posts/${post.id}`
                        )
                    }
                >
                    {post.title}
                </Title>


                {/* EXCERPT */}

                <Text
                    size="sm"
                    c="dimmed"
                    className="
                        mt-2
                        line-clamp-3
                        leading-6
                    "
                >
                    {post.excerpt}
                </Text>


                {/* BOTTOM */}

                <div
                    className="
                        mt-auto
                        border-t
                        border-slate-100
                        pt-4
                    "
                >

                    <Group
                        justify="space-between"
                        align="center"
                    >

                        {/* AUTHOR */}

                        <div
                            className="
                                min-w-0
                            "
                        >

                            <Text
                                size="xs"
                                c="dimmed"
                            >
                                Written by
                            </Text>

                            <Text
                                size="sm"
                                fw={700}
                                className="
                                    max-w-[130px]
                                    truncate
                                    text-slate-700
                                "
                            >
                                {post.author}
                            </Text>

                        </div>


                        {/* READ */}

                        <Button
                            variant="light"
                            color="indigo"
                            size="sm"
                            radius="md"
                            rightSection={
                                <IconArrowUpRight
                                    size={15}
                                />
                            }
                            onClick={() =>
                                navigate(
                                    `/posts/${post.id}`
                                )
                            }
                            className="
                                shrink-0
                                font-semibold
                                transition-all
                                duration-200
                                hover:-translate-y-0.5
                                hover:shadow-md
                            "
                        >
                            Read
                        </Button>

                    </Group>

                </div>

            </div>

        </Card>

    );
}


export default PostCard;