import {
    useState,
} from "react";

import {
    AppShell,
    Badge,
    Button,
    Card,
    Group,
    Modal,
    Table,
    Text,
    Title,
} from "@mantine/core";

import {
    useDisclosure,
} from "@mantine/hooks";

import {
    IconTrash,
} from "@tabler/icons-react";

import {
    useNavigate,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";

const demoUsers = [

    {
        id: 1,
        username: "Khushi",
        email: "khushi@example.com",
        role: "admin",
    },

    {
        id: 2,
        username: "Aarav",
        email: "aarav@example.com",
        role: "user",
    },

    {
        id: 3,
        username: "Riya",
        email: "riya@example.com",
        role: "user",
    },

];

function Users() {

    const [
        users,
        setUsers,
    ] = useState(
        demoUsers
    );

    const [
        opened,
        {
            open,
            close,
        },
    ] = useDisclosure();

    const [
        selected,
        setSelected,
    ] = useState(null);

    const navigate =
        useNavigate();

    const remove = () => {

        setUsers(
            (items) =>
                items.filter(
                    (user) =>
                        user.id !==
                        selected
                )
        );

        close();

    };

    return (

        <>

            <Modal
                opened={opened}
                onClose={close}
                title="Delete user"
                centered
            >

                <Text size="sm">
                    Delete this user
                    from the admin
                    panel?
                </Text>

                <Group
                    justify="flex-end"
                    mt="xl"
                >

                    <Button
                        variant="default"
                        onClick={close}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="red"
                        onClick={remove}
                    >
                        Delete
                    </Button>

                </Group>

            </Modal>

            <AppShell
                header={{
                    height: 60,
                }}
                navbar={{
                    width: 250,
                    breakpoint: "md",
                }}
                padding="md"
            >

                <AppShell.Header>

                    <Group
                        h="100%"
                        px="md"
                    >

                        <Title order={3}>
                            Admin dashboard
                        </Title>

                    </Group>

                </AppShell.Header>

                <AppShell.Navbar p="md">

                    <Sidebar />

                </AppShell.Navbar>

                <AppShell.Main>

                    <Group
                        justify="space-between"
                        mb="xl"
                    >

                        <div>

                            <Title order={2}>
                                Users
                            </Title>

                            <Text
                                c="dimmed"
                                size="sm"
                            >
                                Manage registered
                                users.
                            </Text>

                        </div>

                        <Button
                            variant="light"
                            onClick={() =>
                                navigate(
                                    "/admin"
                                )
                            }
                        >
                            Back to dashboard
                        </Button>

                    </Group>

                    <Card
                        withBorder
                        radius="lg"
                        p="md"
                    >

                        <Table
                            striped
                            highlightOnHover
                        >

                            <Table.Thead>

                                <Table.Tr>

                                    <Table.Th>
                                        ID
                                    </Table.Th>

                                    <Table.Th>
                                        User
                                    </Table.Th>

                                    <Table.Th>
                                        Email
                                    </Table.Th>

                                    <Table.Th>
                                        Role
                                    </Table.Th>

                                    <Table.Th>
                                        Action
                                    </Table.Th>

                                </Table.Tr>

                            </Table.Thead>

                            <Table.Tbody>

                                {users.map(
                                    (user) => (

                                        <Table.Tr
                                            key={
                                                user.id
                                            }
                                        >

                                            <Table.Td>
                                                {
                                                    user.id
                                                }
                                            </Table.Td>

                                            <Table.Td
                                                fw={600}
                                            >
                                                {
                                                    user.username
                                                }
                                            </Table.Td>

                                            <Table.Td>
                                                {
                                                    user.email
                                                }
                                            </Table.Td>

                                            <Table.Td>

                                                <Badge
                                                    color={
                                                        user.role ===
                                                        "admin"
                                                            ? "violet"
                                                            : "gray"
                                                    }
                                                >
                                                    {
                                                        user.role
                                                    }
                                                </Badge>

                                            </Table.Td>

                                            <Table.Td>

                                                <Button
                                                    size="xs"
                                                    color="red"
                                                    variant="light"
                                                    leftSection={
                                                        <IconTrash
                                                            size={
                                                                14
                                                            }
                                                        />
                                                    }
                                                    disabled={
                                                        user.role ===
                                                        "admin"
                                                    }
                                                    onClick={() => {

                                                        setSelected(
                                                            user.id
                                                        );

                                                        open();

                                                    }}
                                                >
                                                    Delete
                                                </Button>

                                            </Table.Td>

                                        </Table.Tr>

                                    )
                                )}

                            </Table.Tbody>

                        </Table>

                    </Card>

                </AppShell.Main>

            </AppShell>

        </>

    );
}

export default Users;