import {
    useEffect,
    useState,
} from "react";

import {
    Button,
    Container,
    Paper,
    Select,
    Stack,
    TextInput,
    Textarea,
    Title,
    Group,
} from "@mantine/core";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    updatePost,
} from "../redux/posts/postSlice";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

function EditPost() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const dispatch =
        useDispatch();

    const post =
        useSelector(
            (state) =>
                state.posts.posts.find(
                    (post) =>
                        post.id ===
                        Number(id)
                )
        );

    const [form, setForm] =
        useState({

            title: "",
            excerpt: "",
            content: "",
            category: "React",
            image: "",

        });

    useEffect(() => {

        if (post) {

            setForm({

                title:
                    post.title,

                excerpt:
                    post.excerpt ||
                    "",

                content:
                    post.content,

                category:
                    post.category,

                image:
                    post.image ||
                    "",

            });

        }

    }, [post]);

    if (!post) {

        return (

            <Container py={80}>

                <Title order={2}>
                    Post not found
                </Title>

            </Container>

        );

    }

    const submit = (e) => {

        e.preventDefault();

        dispatch(
            updatePost({
                id,
                ...form,
            })
        );

        navigate("/admin");

    };

    return (

        <Container
            size="md"
            py={60}
        >

            <Paper
                withBorder
                radius="xl"
                p="xl"
                shadow="sm"
            >

                <Title
                    order={1}
                    mb="xl"
                >
                    Edit post
                </Title>

                <form
                    onSubmit={submit}
                >

                    <Stack>

                        <TextInput
                            label="Title"
                            required
                            value={
                                form.title
                            }
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    title:
                                        e.currentTarget
                                            .value,
                                })
                            }
                        />

                        <Select
                            label="Category"
                            data={[
                                "React",
                                "Backend",
                                "Design",
                                "JavaScript",
                                "Career",
                            ]}
                            value={
                                form.category
                            }
                            onChange={(value) =>
                                setForm({
                                    ...form,
                                    category:
                                        value ||
                                        "React",
                                })
                            }
                        />

                        <TextInput
                            label="Short description"
                            value={
                                form.excerpt
                            }
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    excerpt:
                                        e.currentTarget
                                            .value,
                                })
                            }
                        />

                        <TextInput
                            label="Image URL"
                            value={
                                form.image
                            }
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    image:
                                        e.currentTarget
                                            .value,
                                })
                            }
                        />

                        <Textarea
                            label="Content"
                            minRows={12}
                            required
                            value={
                                form.content
                            }
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    content:
                                        e.currentTarget
                                            .value,
                                })
                            }
                        />

                        <Group
                            justify="flex-end"
                        >

                            <Button
                                variant="default"
                                onClick={() =>
                                    navigate(
                                        "/admin"
                                    )
                                }
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                            >
                                Save changes
                            </Button>

                        </Group>

                    </Stack>

                </form>

            </Paper>

        </Container>

    );
}

export default EditPost;