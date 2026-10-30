import {
    NavLink,
    Stack,
    Text,
} from "@mantine/core";

import {
    IconDashboard,
    IconArticle,
    IconUsers,
    IconPlus,
    IconArrowLeft,
} from "@tabler/icons-react";

import {
    useNavigate,
    useLocation,
} from "react-router-dom";

function Sidebar({
    onNavigate,
}) {

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const go = (path) => {

        navigate(path);

        if (onNavigate) {
            onNavigate();
        }

    };

    return (

        <Stack gap={4}>

            <Text
                size="xs"
                fw={700}
                c="dimmed"
                tt="uppercase"
                className="px-3 pb-2"
            >
                Admin menu
            </Text>

            <NavLink
                active={
                    location.pathname ===
                    "/admin"
                }
                label="Dashboard"
                leftSection={
                    <IconDashboard
                        size={18}
                    />
                }
                onClick={() =>
                    go("/admin")
                }
            />

            <NavLink
                active={
                    location.pathname ===
                    "/create-post"
                }
                label="Create post"
                leftSection={
                    <IconPlus
                        size={18}
                    />
                }
                onClick={() =>
                    go(
                        "/create-post"
                    )
                }
            />

            <NavLink
                active={
                    location.pathname ===
                    "/admin/users"
                }
                label="Users"
                leftSection={
                    <IconUsers
                        size={18}
                    />
                }
                onClick={() =>
                    go(
                        "/admin/users"
                    )
                }
            />

            <NavLink
                label="View blog"
                leftSection={
                    <IconArticle
                        size={18}
                    />
                }
                onClick={() =>
                    go("/posts")
                }
            />

            <NavLink
                label="Back to site"
                leftSection={
                    <IconArrowLeft
                        size={18}
                    />
                }
                onClick={() =>
                    go("/posts")
                }
            />

        </Stack>

    );
}

export default Sidebar;