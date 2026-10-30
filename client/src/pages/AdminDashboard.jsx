import { Container, Title, Text } from "@mantine/core";

function AdminDashboard() {

    return (

        <Container
            size="xl"
            py="xl"
        >

            <Title>
                Admin Dashboard
            </Title>

            <Text
                c="dimmed"
                mt="sm"
            >
                Welcome to the admin panel.
            </Text>

        </Container>

    );
}

export default AdminDashboard;