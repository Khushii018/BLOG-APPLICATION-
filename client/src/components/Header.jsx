import { useState } from "react";

import {
    Button,
    Drawer,
    Group,
    Stack,
    Text,
    Avatar,
    Menu,
    ActionIcon,
    Divider,
} from "@mantine/core";

import {
    IconMenu2,
    IconLogout,
    IconLayoutDashboard,
    IconPlus,
    IconArticle,
    IconChevronDown,
    IconUser,
    IconSparkles,
} from "@tabler/icons-react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    useNavigate,
} from "react-router-dom";

import {
    logout,
} from "../redux/auth/authSlice";


function Header() {

    const [opened, setOpened] =
        useState(false);

    const navigate =
        useNavigate();

    const dispatch =
        useDispatch();

    const user =
        useSelector(
            (state) =>
                state.auth.user
        );


    // NAVIGATION

    const go = (path) => {

        setOpened(false);

        navigate(path);

    };


    // LOGOUT

    const signOut = () => {

        dispatch(logout());

        go("/login");

    };


    return (

        <>

            {/* NAVBAR */}

            <header
                className="
                    sticky
                    top-0
                    z-50
                    border-b
                    border-slate-200/70
                    bg-white/80
                    backdrop-blur-xl
                "
            >

                <div
                    className="
                        mx-auto
                        flex
                        h-[72px]
                        max-w-7xl
                        items-center
                        justify-between
                        px-4
                        sm:px-6
                        lg:px-8
                    "
                >


                    {/* LOGO */}

                    <button
                        onClick={() =>
                            go("/posts")
                        }
                        className="
                            group
                            flex
                            items-center
                            gap-2
                            outline-none
                        "
                    >

                        {/* Logo icon */}

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                bg-gradient-to-br
                                from-indigo-600
                                to-violet-600
                                shadow-md
                                shadow-indigo-200
                                transition
                                duration-300
                                group-hover:rotate-[-5deg]
                                group-hover:scale-105
                            "
                        >

                            <IconSparkles
                                size={19}
                                className="text-white"
                            />

                        </div>


                        {/* Logo text */}

                        <div className="flex items-center">

                            <span
                                className="
                                    text-xl
                                    font-extrabold
                                    tracking-tight
                                    text-slate-900
                                "
                            >
                                Ink
                            </span>

                            <span
                                className="
                                    text-xl
                                    font-extrabold
                                    tracking-tight
                                    text-indigo-600
                                "
                            >
                                Space
                            </span>

                        </div>

                    </button>


                    {/* DESKTOP NAVIGATION */}

                    <div
                        className="
                            hidden
                            items-center
                            gap-1
                            md:flex
                        "
                    >


                        {/* BLOGS */}

                        <button
                            onClick={() =>
                                go("/posts")
                            }
                            className="
                                group
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-slate-600
                                transition
                                duration-200
                                hover:bg-indigo-50
                                hover:text-indigo-600
                            "
                        >

                            <IconArticle
                                size={17}
                                className="
                                    transition
                                    group-hover:scale-110
                                "
                            />

                            Blogs

                        </button>


                        {/* WRITE */}

                        {user && (

                            <button
                                onClick={() =>
                                    go(
                                        "/create-post"
                                    )
                                }
                                className="
                                    group
                                    ml-1
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-slate-600
                                    transition
                                    duration-200
                                    hover:bg-indigo-50
                                    hover:text-indigo-600
                                "
                            >

                                <IconPlus
                                    size={17}
                                    className="
                                        transition
                                        group-hover:rotate-90
                                    "
                                />

                                Write

                            </button>

                        )}


                        {/* ADMIN */}

                        {user?.role ===
                            "admin" && (

                            <button
                                onClick={() =>
                                    go("/admin")
                                }
                                className="
                                    ml-1
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-violet-50
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-violet-700
                                    transition
                                    duration-200
                                    hover:bg-violet-100
                                    hover:shadow-sm
                                "
                            >

                                <IconLayoutDashboard
                                    size={17}
                                />

                                Admin

                            </button>

                        )}


                        {/* DIVIDER */}

                        <div
                            className="
                                mx-3
                                h-7
                                w-px
                                bg-slate-200
                            "
                        />


                        {/* LOGGED OUT */}

                        {!user ? (

                            <>

                                <button
                                    onClick={() =>
                                        go(
                                            "/login"
                                        )
                                    }
                                    className="
                                        rounded-xl
                                        px-4
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        text-slate-600
                                        transition
                                        hover:bg-slate-100
                                        hover:text-slate-900
                                    "
                                >
                                    Login
                                </button>


                                <button
                                    onClick={() =>
                                        go(
                                            "/register"
                                        )
                                    }
                                    className="
                                        ml-1
                                        rounded-xl
                                        bg-gradient-to-r
                                        from-indigo-600
                                        to-violet-600
                                        px-5
                                        py-2.5
                                        text-sm
                                        font-bold
                                        text-white
                                        shadow-md
                                        shadow-indigo-200
                                        transition
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:shadow-lg
                                        hover:shadow-indigo-200
                                    "
                                >
                                    Get started
                                </button>

                            </>

                        ) : (


                            /* USER MENU */

                            <Menu
                                shadow="lg"
                                width={240}
                                position="bottom-end"
                                offset={8}
                            >

                                <Menu.Target>

                                    <button
                                        className="
                                            ml-1
                                            flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            border
                                            border-slate-200
                                            bg-white
                                            py-1.5
                                            pl-1.5
                                            pr-3
                                            shadow-sm
                                            transition
                                            duration-200
                                            hover:border-indigo-200
                                            hover:shadow-md
                                        "
                                    >

                                        <Avatar
                                            size={34}
                                            radius="xl"
                                            color="indigo"
                                            className="
                                                font-bold
                                            "
                                        >

                                            {user.username
                                                ?.charAt(
                                                    0
                                                )
                                                .toUpperCase()}

                                        </Avatar>


                                        <div
                                            className="
                                                hidden
                                                text-left
                                                lg:block
                                            "
                                        >

                                            <p
                                                className="
                                                    max-w-24
                                                    truncate
                                                    text-xs
                                                    font-bold
                                                    text-slate-800
                                                "
                                            >
                                                {
                                                    user.username
                                                }
                                            </p>

                                            <p
                                                className="
                                                    text-[10px]
                                                    capitalize
                                                    text-slate-400
                                                "
                                            >
                                                {
                                                    user.role
                                                }
                                            </p>

                                        </div>


                                        <IconChevronDown
                                            size={15}
                                            className="
                                                text-slate-400
                                            "
                                        />

                                    </button>

                                </Menu.Target>


                                <Menu.Dropdown
                                    className="rounded-xl p-2"
                                >


                                    {/* USER INFO */}

                                    <div
                                        className="
                                            mb-2
                                            rounded-lg
                                            bg-gradient-to-r
                                            from-indigo-50
                                            to-violet-50
                                            p-3
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            <Avatar
                                                size="md"
                                                radius="xl"
                                                color="indigo"
                                            >
                                                {user.username
                                                    ?.charAt(
                                                        0
                                                    )
                                                    .toUpperCase()}
                                            </Avatar>

                                            <div>

                                                <Text
                                                    size="sm"
                                                    fw={700}
                                                >
                                                    {
                                                        user.username
                                                    }
                                                </Text>

                                                <Text
                                                    size="xs"
                                                    c="dimmed"
                                                >
                                                    {
                                                        user.email
                                                    }
                                                </Text>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ADMIN */}

                                    {user.role ===
                                        "admin" && (

                                        <Menu.Item
                                            leftSection={
                                                <IconLayoutDashboard
                                                    size={
                                                        17
                                                    }
                                                />
                                            }
                                            onClick={() =>
                                                go(
                                                    "/admin"
                                                )
                                            }
                                        >
                                            Dashboard
                                        </Menu.Item>

                                    )}


                                    {/* CREATE */}

                                    <Menu.Item
                                        leftSection={
                                            <IconPlus
                                                size={
                                                    17
                                                }
                                            />
                                        }
                                        onClick={() =>
                                            go(
                                                "/create-post"
                                            )
                                        }
                                    >
                                        Create post
                                    </Menu.Item>


                                    {/* PROFILE - optional */}

                                    <Menu.Item
                                        leftSection={
                                            <IconUser
                                                size={
                                                    17
                                                }
                                            />
                                        }
                                    >
                                        My profile
                                    </Menu.Item>


                                    <Menu.Divider />


                                    {/* LOGOUT */}

                                    <Menu.Item
                                        color="red"
                                        leftSection={
                                            <IconLogout
                                                size={
                                                    17
                                                }
                                            />
                                        }
                                        onClick={
                                            signOut
                                        }
                                    >
                                        Logout
                                    </Menu.Item>

                                </Menu.Dropdown>

                            </Menu>

                        )}

                    </div>


                    {/* MOBILE MENU BUTTON */}

                    <ActionIcon
                        className="
                            md:hidden
                            rounded-xl
                        "
                        variant="light"
                        color="indigo"
                        size="lg"
                        onClick={() =>
                            setOpened(true)
                        }
                    >

                        <IconMenu2
                            size={22}
                        />

                    </ActionIcon>

                </div>

            </header>


            {/* MOBILE DRAWER */}

            <Drawer
                opened={opened}
                onClose={() =>
                    setOpened(false)
                }
                position="right"
                size="85%"
                title={
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <div
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-gradient-to-br
                                from-indigo-600
                                to-violet-600
                            "
                        >

                            <IconSparkles
                                size={16}
                                className="text-white"
                            />

                        </div>

                        <span
                            className="
                                text-lg
                                font-extrabold
                                text-slate-900
                            "
                        >
                            Ink
                            <span className="text-indigo-600">
                                Space
                            </span>
                        </span>

                    </div>
                }
            >

                <div className="mt-2">

                    {/* USER */}

                    {user && (

                        <div
                            className="
                                mb-6
                                rounded-2xl
                                bg-gradient-to-br
                                from-indigo-50
                                to-violet-50
                                p-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <Avatar
                                    size="lg"
                                    radius="xl"
                                    color="indigo"
                                >
                                    {user.username
                                        ?.charAt(
                                            0
                                        )
                                        .toUpperCase()}
                                </Avatar>

                                <div>

                                    <Text
                                        fw={700}
                                    >
                                        {
                                            user.username
                                        }
                                    </Text>

                                    <Text
                                        size="xs"
                                        c="dimmed"
                                    >
                                        {
                                            user.email
                                        }
                                    </Text>

                                </div>

                            </div>

                        </div>

                    )}


                    {/* NAVIGATION */}

                    <Stack
                        gap="xs"
                    >

                        <button
                            onClick={() =>
                                go("/posts")
                            }
                            className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-4
                                py-3
                                text-left
                                text-sm
                                font-semibold
                                text-slate-700
                                transition
                                hover:bg-indigo-50
                                hover:text-indigo-600
                            "
                        >

                            <IconArticle
                                size={19}
                            />

                            Blogs

                        </button>


                        {user && (

                            <button
                                onClick={() =>
                                    go(
                                        "/create-post"
                                    )
                                }
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-left
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    transition
                                    hover:bg-indigo-50
                                    hover:text-indigo-600
                                "
                            >

                                <IconPlus
                                    size={19}
                                />

                                Write a post

                            </button>

                        )}


                        {user?.role ===
                            "admin" && (

                            <button
                                onClick={() =>
                                    go("/admin")
                                }
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    bg-violet-50
                                    px-4
                                    py-3
                                    text-left
                                    text-sm
                                    font-semibold
                                    text-violet-700
                                    transition
                                    hover:bg-violet-100
                                "
                            >

                                <IconLayoutDashboard
                                    size={19}
                                />

                                Admin dashboard

                            </button>

                        )}

                    </Stack>


                    <Divider my="xl" />


                    {/* AUTH BUTTONS */}

                    {!user ? (

                        <Stack>

                            <Button
                                variant="light"
                                size="md"
                                radius="xl"
                                onClick={() =>
                                    go(
                                        "/login"
                                    )
                                }
                            >
                                Login
                            </Button>

                            <Button
                                size="md"
                                radius="xl"
                                onClick={() =>
                                    go(
                                        "/register"
                                    )
                                }
                            >
                                Get started
                            </Button>

                        </Stack>

                    ) : (

                        <Button
                            color="red"
                            variant="light"
                            size="md"
                            radius="xl"
                            fullWidth
                            leftSection={
                                <IconLogout
                                    size={18}
                                />
                            }
                            onClick={
                                signOut
                            }
                        >
                            Logout
                        </Button>

                    )}

                </div>

            </Drawer>

        </>

    );
}

export default Header;