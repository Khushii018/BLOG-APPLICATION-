import {useState,} from "react";

import {
    Button,
    Container,
    Divider,
    FileInput,
    Group,
    Paper,
    Stack,
    Text,
    TextInput,
    Textarea,
    Title,
} from "@mantine/core";

import {
    RichTextEditor,
    Link,
} from "@mantine/tiptap";

import {
    useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import {
    IconArrowLeft,
    IconCheck,
    IconPhoto,
} from "@tabler/icons-react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    createPost,
} from "../redux/posts/postSlice";

import {
    useNavigate,
} from "react-router-dom";


function CreatePost() {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    // CURRENT USER

    const user =
        useSelector(
            (state) =>
                state.auth.user
        );

    // POST STATE

    const {
        loading,
        error,
    } = useSelector(
        (state) =>
            state.posts
    );


    // FORM STATE

    const [form, setForm] =
        useState({

            title: "",
            excerpt: "",
            content: "",
            category: "React",

        });


    // IMAGE FILE

    const [file, setFile] =
        useState(null);


    // RICH TEXT EDITOR

    const editor = useEditor({

        extensions: [

            StarterKit,

            Link.configure({
                openOnClick: false,
            }),

        ],

        content: "",

        onUpdate: ({ editor }) => {

            setForm(
                (previous) => ({

                    ...previous,

                    content:
                        editor.getHTML(),

                })
            );

        },

    });


    // SUBMIT

    const submit = async (e) => {

        e.preventDefault();


        // Check title
        if (!form.title.trim()) {
            return;
        }


        // Check actual text inside editor
        if (
            !editor ||
            !editor.getText().trim()
        ) {
            return;
        }


        try {

            // CREATE FORMDATA

            const formData =
                new FormData();


            
            // TEXT FIELDS
        

            formData.append(
                "title",
                form.title.trim()
            );


            formData.append(
                "excerpt",
                form.excerpt.trim()
            );


            formData.append(
                "content",
                form.content
            );


            formData.append(
                "category",
                form.category
            );


            // IMAGE

            if (file) {

                formData.append(
                    "image",
                    file
                );

            }


            // SEND TO BACKEND

            await dispatch(
                createPost(formData)
            ).unwrap();


            // GO BACK TO POSTS

            navigate("/posts");


        } catch (error) {

            console.error(
                "Create post failed:",
                error
            );

        }

    };


    // UPDATE FORM

    const updateField = (
        field,
        value
    ) => {

        setForm(
            (previous) => ({

                ...previous,

                [field]: value,

            })
        );

    };


    return (

        <main
            className="
                min-h-screen
                bg-[#f7f8fc]
            "
        >

            <Container
                size="xl"
                className="
                    py-6
                    sm:py-10
                "
            >

                {/* TOP BAR */}

                <div
                    className="
                        mb-8
                        flex
                        items-center
                        justify-between
                    "
                >

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/posts"
                            )
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-slate-500
                            transition
                            hover:text-slate-900
                        "
                    >

                        <IconArrowLeft
                            size={17}
                        />

                        Back to posts

                    </button>


                    <Text
                        size="sm"
                        c="dimmed"
                        className="
                            hidden
                            sm:block
                        "
                    >

                        Publishing as{" "}

                        <span
                            className="
                                font-semibold
                                text-slate-700
                            "
                        >

                            {user?.username ||
                                "User"}

                        </span>

                    </Text>

                </div>


                {/* PAGE TITLE */}

                <div
                    className="
                        mx-auto
                        mb-8
                        max-w-3xl
                        text-center
                    "
                >

                    <Title
                        order={1}
                        className="
                            text-4xl
                            font-black
                            leading-tight
                            tracking-tight
                            text-slate-950
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >

                        Write a new post

                    </Title>


                    <Text
                        c="dimmed"
                        className="
                            mt-3
                            w-full
                            text-center
                        "
                    >

                            Turn your ideas into an
                            article and share them
                            with the community.

                    </Text>

                </div>
                {/* <Divider 
                my="xl"
                color="gray.2"/> */}


                {/* ERROR */}

                {error && (

                    <div
                        className="
                            mx-auto
                            mb-6
                            max-w-4xl
                            rounded-xl
                            border
                            border-red-200
                            bg-red-50
                            px-4
                            py-3
                            text-sm
                            font-medium
                            text-red-600
                        "
                    >

                        {error}

                    </div>

                )}


                {/* FORM */}

                <form
                    onSubmit={submit}
                >

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-6
                            lg:grid-cols-[280px_minmax(0,1fr)]
                        "
                    >

                    
                        {/* LEFT SIDEBAR */}

                        <div>

                            <Paper
                                withBorder
                                radius="lg"
                                p="lg"
                                className="
                                    border-slate-200
                                    bg-white
                                    shadow-sm
                                "
                            >

                                <Text
                                    size="sm"
                                    fw={700}
                                    className="
                                        text-slate-900
                                    "
                                >

                                    Post details

                                </Text>


                                <Text
                                    size="xs"
                                    c="dimmed"
                                    className="
                                        mt-1
                                        leading-5
                                    "
                                >

                                    Add some basic
                                    information about
                                    your article.

                                </Text>


                                <Stack
                                    gap="lg"
                                    mt="lg"
                                >

                                    {/* CATEGORY */}

                                    <div>

                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-sm
                                                font-medium
                                                text-slate-700
                                            "
                                        >

                                            Category

                                        </label>


                                        <select
                                            value={
                                                form.category
                                            }
                                            onChange={(e) =>
                                                updateField(
                                                    "category",
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                w-full
                                                rounded-md
                                                border
                                                border-slate-200
                                                bg-white
                                                px-3
                                                py-2.5
                                                text-sm
                                                text-slate-700
                                                outline-none
                                                transition
                                                focus:border-indigo-500
                                                focus:ring-2
                                                focus:ring-indigo-100
                                            "
                                        >

                                            <option value="React">
                                                React
                                            </option>

                                            <option value="Backend">
                                                Backend
                                            </option>

                                            <option value="Design">
                                                Design
                                            </option>

                                            <option value="JavaScript">
                                                JavaScript
                                            </option>

                                            <option value="Career">
                                                Career
                                            </option>

                                        </select>

                                    </div>


                                    {/* EXCERPT */}

                                    <Textarea
                                        label="Short description"
                                        placeholder="Briefly describe your article..."
                                        minRows={5}
                                        autosize
                                        value={
                                            form.excerpt
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "excerpt",
                                                e.currentTarget.value
                                            )
                                        }
                                        classNames={{
                                            label:
                                                "mb-1 font-medium text-slate-700",

                                            input:
                                                "border-slate-200",
                                        }}
                                    />


                                    {/* IMAGE */}

                                    <FileInput
                                        label="Cover image"
                                        placeholder="Choose an image"
                                        clearable
                                        accept="
                                            image/png,
                                            image/jpeg,
                                            image/jpg,
                                            image/webp
                                        "
                                        value={file}
                                        onChange={setFile}
                                        leftSection={
                                            <IconPhoto
                                                size={17}
                                            />
                                        }
                                        classNames={{
                                            label:
                                                "mb-1 font-medium text-slate-700",

                                            input:
                                                "border-slate-200",
                                        }}
                                    />


                                    {/* SELECTED FILE */}

                                    {file && (

                                        <div
                                            className="
                                                rounded-lg
                                                border
                                                border-indigo-100
                                                bg-indigo-50
                                                p-3
                                            "
                                        >

                                            <Text
                                                size="xs"
                                                fw={600}
                                                className="
                                                    text-indigo-700
                                                "
                                            >

                                                Selected image

                                            </Text>


                                            <Text
                                                size="xs"
                                                c="dimmed"
                                                className="
                                                    mt-1
                                                    truncate
                                                "
                                            >

                                                {file.name}

                                            </Text>

                                        </div>

                                    )}

                                </Stack>


                                {/* TIP */}

                                <div
                                    className="
                                        mt-6
                                        rounded-lg
                                        bg-slate-50
                                        p-3
                                    "
                                >

                                    <Text
                                        size="xs"
                                        fw={600}
                                        className="
                                            text-slate-700
                                        "
                                    >

                                        Writing tip

                                    </Text>


                                    <Text
                                        size="xs"
                                        c="dimmed"
                                        className="
                                            mt-1
                                            leading-5
                                        "
                                    >

                                        Keep your title
                                        clear and make
                                        the introduction
                                        useful for readers.

                                    </Text>

                                </div>

                            </Paper>

                        </div>


                        {/* MAIN WRITING AREA */}

                        <Paper
                            withBorder
                            radius="lg"
                            className="
                                min-w-0
                                overflow-hidden
                                border-slate-200
                                bg-white
                                shadow-sm
                            "
                        >

                            {/* TITLE */}

                            <div
                                className="
                                    border-b
                                    border-slate-100
                                    px-5
                                    py-5
                                    sm:px-8
                                "
                            >

                                <TextInput
                                    variant="unstyled"
                                    placeholder="Post title..."
                                    required
                                    value={
                                        form.title
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "title",
                                            e.currentTarget.value
                                        )
                                    }
                                    className="
                                        w-full
                                    "
                                    styles={{
                                        input: {
                                            fontSize:
                                                "28px",

                                            fontWeight:
                                                700,

                                            color:
                                                "#0f172a",
                                        },
                                    }}
                                />

                            </div>


                            {/* RICH TEXT EDITOR */}

                            <div
                                className="
                                    w-full
                                    px-5
                                    py-6
                                    sm:px-8
                                    sm:py-8
                                "
                            >

                                <RichTextEditor
                                    editor={editor}
                                    className="
                                        w-full
                                        overflow-hidden
                                    "
                                >

                                    {/* TOOLBAR */}

                                    <RichTextEditor.Toolbar
                                        sticky
                                        stickyOffset={0}
                                    >

                                        <RichTextEditor.ControlsGroup>

                                            <RichTextEditor.Bold />

                                            <RichTextEditor.Italic />

                                            <RichTextEditor.Strikethrough />

                                            <RichTextEditor.ClearFormatting />

                                        </RichTextEditor.ControlsGroup>


                                        <RichTextEditor.ControlsGroup>

                                            <RichTextEditor.H1 />

                                            <RichTextEditor.H2 />

                                            <RichTextEditor.H3 />

                                        </RichTextEditor.ControlsGroup>


                                        <RichTextEditor.ControlsGroup>

                                            <RichTextEditor.BulletList />

                                            <RichTextEditor.OrderedList />

                                        </RichTextEditor.ControlsGroup>


                                        <RichTextEditor.ControlsGroup>

                                            <RichTextEditor.Blockquote />

                                            <RichTextEditor.Code />

                                            <RichTextEditor.CodeBlock />

                                        </RichTextEditor.ControlsGroup>


                                        <RichTextEditor.ControlsGroup>

                                            <RichTextEditor.Link />

                                            <RichTextEditor.Unlink />

                                        </RichTextEditor.ControlsGroup>


                                        <RichTextEditor.ControlsGroup>

                                            <RichTextEditor.Undo />

                                            <RichTextEditor.Redo />

                                        </RichTextEditor.ControlsGroup>

                                    </RichTextEditor.Toolbar>


                                    {/* WRITING AREA */}

                                    <RichTextEditor.Content
                                        className="
                                            w-full
                                            min-h-[500px]
                                        "
                                    />

                                </RichTextEditor>

                            </div>


                            {/* BOTTOM BAR */}

                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-4
                                    border-t
                                    border-slate-100
                                    px-5
                                    py-5
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                    sm:px-8
                                "
                            >

                                <Text
                                    size="xs"
                                    c="dimmed"
                                >

                                    Your post will be
                                    published immediately.

                                </Text>


                                <Group
                                    gap="md"
                                    justify="flex-end"
                                    className="
                                        w-full
                                        sm:w-auto
                                    "
                                >

                                    {/* CANCEL */}

                                    <Button
                                        type="button"
                                        variant="default"
                                        onClick={() =>
                                            navigate(
                                                "/posts"
                                            )
                                        }
                                        className="
                                            rounded-lg
                                            border
                                            border-slate-200
                                            bg-white
                                            px-5
                                            font-medium
                                            text-slate-600
                                            shadow-sm
                                            transition-all
                                            duration-200
                                            hover:border-slate-300
                                            hover:bg-slate-50
                                            hover:text-slate-900
                                            hover:shadow
                                        "
                                    >

                                        Cancel

                                    </Button>


                                    {/* PUBLISH */}

                                    <Button
                                        type="submit"
                                        color="indigo"
                                        loading={
                                            loading
                                        }
                                        leftSection={
                                            !loading && (
                                                <IconCheck
                                                    size={16}
                                                />
                                            )
                                        }
                                        className="
                                            rounded-lg
                                            bg-indigo-600
                                            px-6
                                            font-semibold
                                            text-white
                                            shadow-md
                                            shadow-indigo-200
                                            transition-all
                                            duration-200
                                            hover:-translate-y-0.5
                                            hover:bg-indigo-700
                                            hover:shadow-lg
                                            hover:shadow-indigo-300
                                            active:translate-y-0
                                        "
                                    >

                                        {loading
                                            ? "Publishing..."
                                            : "Publish post"}

                                    </Button>

                                </Group>

                            </div>

                        </Paper>

                    </div>

                </form>

            </Container>

        </main>

    );

}


export default CreatePost;