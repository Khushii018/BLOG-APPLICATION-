import {
    Button,
    Container,
    Text,
    Title,
} from "@mantine/core";

import {
    useNavigate,
} from "react-router-dom";

function NotFound() {

    const navigate =
        useNavigate();

    return (

        <Container
            py={100}
            className="text-center"
        >

            <Title order={1}>
                404
            </Title>

            <Text
                c="dimmed"
                mt="sm"
            >
                The page you are looking
                for does not exist.
            </Text>

            <Button
                mt="xl"
                onClick={() =>
                    navigate("/posts")
                }
            >
                Back to blogs
            </Button>

        </Container>

    );
}

export default NotFound;