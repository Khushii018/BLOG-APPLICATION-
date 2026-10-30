import {
    useState,
} from "react";

import {
    Button,
    Container,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
    Divider,
} from "@mantine/core";

import {
    IconMail,
    IconLock,
    IconArrowRight,
    IconSparkles,
    IconBrandGoogle,
} from "@tabler/icons-react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    loginUser,
} from "../redux/auth/authSlice";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";


function Login() {

    const dispatch =
        useDispatch();


    

    const {
        loading,
        error,
    } = useSelector(
        (state) => state.auth
    );


    const navigate =
        useNavigate();

    const location =
        useLocation();


    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");


    
    const submit = async (e) => {

        e.preventDefault();

        try {

            const result =
                await dispatch(
                    loginUser({
                        email,
                        password,
                    })
                ).unwrap();


            // Backend decides whether
            // the user is admin or normal user

            if (
                result.user.role ===
                "admin"
            ) {

                navigate(
                    "/admin",
                    {
                        replace: true,
                    }
                );

            } else {

                navigate(
                    location.state?.from ||
                    "/posts",
                    {
                        replace: true,
                    }
                );

            }

        } catch (error) {

            console.log(
                "Login failed:",
                error
            );

        }

    };


    return (

        <main
            className="
                relative
                min-h-[calc(100vh-72px)]
                overflow-hidden
                bg-slate-50
            "
        >

            {/* BACKGROUND DECORATION */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    -top-40
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-indigo-200/40
                    blur-3xl
                "
            />


            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-40
                    -left-40
                    h-[450px]
                    w-[450px]
                    rounded-full
                    bg-violet-200/40
                    blur-3xl
                "
            />


            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-64
                    w-64
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-indigo-100/30
                    blur-3xl
                "
            />


            {/* MAIN CONTAINER */}

            <Container
                size="sm"
                className="
                    relative
                    flex
                    min-h-[calc(100vh-72px)]
                    items-center
                    justify-center
                    py-12
                "
            >

                <div
                    className="
                        w-full
                        max-w-md
                    "
                >


                    {/* BRAND */}

                    <div
                        className="
                            mb-8
                            flex
                            flex-col
                            items-center
                            text-center
                        "
                    >

                        <div
                            className="
                                mb-4
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-gradient-to-br
                                from-indigo-600
                                to-violet-600
                                shadow-xl
                                shadow-indigo-200
                            "
                        >

                            <IconSparkles
                                size={27}
                                className="
                                    text-white
                                "
                            />

                        </div>


                        <Title
                            order={1}
                            className="
                                text-3xl
                                font-extrabold
                                tracking-tight
                                text-slate-900
                            "
                        >
                            Welcome back
                        </Title>


                        <Text
                            c="dimmed"
                            size="sm"
                            className="
                                mt-2
                                max-w-sm
                            "
                        >
                            Sign in to continue
                            exploring ideas on{" "}

                            <span
                                className="
                                    font-semibold
                                    text-indigo-600
                                "
                            >
                                InkSpace
                            </span>
                            .
                        </Text>

                    </div>


                    {/* ================================= */}
                    {/* LOGIN CARD */}
                    {/* ================================= */}

                    <Paper
                        withBorder
                        radius="2xl"
                        p={{
                            base: "lg",
                            sm: "xl",
                        }}
                        className="
                            border-slate-200/80
                            bg-white/95
                            shadow-2xl
                            shadow-slate-200/60
                            backdrop-blur
                        "
                    >

                        <form
                            onSubmit={submit}
                        >

                            <Stack gap="lg">


                                {/* ================================= */}
                                {/* EMAIL */}
                                {/* ================================= */}

                                <TextInput
                                    label="Email address"
                                    placeholder="you@example.com"
                                    type="email"
                                    required
                                    size="md"
                                    radius="md"
                                    leftSection={
                                        <IconMail
                                            size={18}
                                        />
                                    }
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.currentTarget
                                                .value
                                        )
                                    }
                                    classNames={{
                                        label:
                                            "font-semibold text-slate-700 mb-1",

                                        input:
                                            "border-slate-200 focus:border-indigo-500",
                                    }}
                                />


                                {/* ================================= */}
                                {/* PASSWORD */}
                                {/* ================================= */}

                                <div>

                                    <PasswordInput
                                        label="Password"
                                        placeholder="Enter your password"
                                        required
                                        size="md"
                                        radius="md"
                                        leftSection={
                                            <IconLock
                                                size={18}
                                            />
                                        }
                                        value={
                                            password
                                        }
                                        onChange={(e) =>
                                            setPassword(
                                                e.currentTarget
                                                    .value
                                            )
                                        }
                                        classNames={{
                                            label:
                                                "font-semibold text-slate-700 mb-1",

                                            input:
                                                "border-slate-200 focus:border-indigo-500",
                                        }}
                                    />


                                    <div
                                        className="
                                            mt-2
                                            flex
                                            justify-end
                                        "
                                    >

                                        <button
                                            type="button"
                                            className="
                                                text-xs
                                                font-semibold
                                                text-indigo-600
                                                transition
                                                hover:text-indigo-800
                                            "
                                        >
                                            Forgot password?
                                        </button>

                                    </div>

                                </div>


                                {/* ================================= */}
                                {/* ERROR MESSAGE */}
                                {/* ================================= */}

                                {error && (

                                    <Text
                                        size="sm"
                                        className="
                                            rounded-lg
                                            border
                                            border-red-100
                                            bg-red-50
                                            px-3
                                            py-2
                                            font-medium
                                            text-red-600
                                        "
                                    >
                                        {error}
                                    </Text>

                                )}


                                {/* ================================= */}
                                {/* LOGIN BUTTON */}
                                {/* ================================= */}

                                <Button
                                    type="submit"
                                    fullWidth
                                    size="md"
                                    radius="md"
                                    loading={loading}
                                    rightSection={
                                        !loading && (
                                            <IconArrowRight
                                                size={18}
                                            />
                                        )
                                    }
                                    className="
                                        mt-1
                                        h-12
                                        bg-gradient-to-r
                                        from-indigo-600
                                        to-violet-600
                                        font-bold
                                        shadow-lg
                                        shadow-indigo-200
                                        transition
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:from-indigo-700
                                        hover:to-violet-700
                                        hover:shadow-xl
                                    "
                                >
                                    Sign in
                                </Button>


                            </Stack>

                        </form>


                        {/* ================================= */}
                        {/* DIVIDER */}
                        {/* ================================= */}

                        <div
                            className="
                                my-6
                                flex
                                items-center
                                gap-4
                            "
                        >

                            <Divider
                                className="flex-1"
                            />


                            <Text
                                size="xs"
                                c="dimmed"
                                className="
                                    whitespace-nowrap
                                "
                            >
                                OR
                            </Text>


                            <Divider
                                className="flex-1"
                            />

                        </div>


                        {/* ================================= */}
                        {/* GOOGLE BUTTON */}
                        {/* ================================= */}

                        <button
                            type="button"
                            className="
                                flex
                                h-11
                                w-full
                                items-center
                                justify-center
                                gap-3
                                rounded-lg
                                border
                                border-slate-200
                                bg-white
                                text-sm
                                font-semibold
                                text-slate-700
                                transition
                                duration-200
                                hover:bg-slate-50
                                hover:shadow-sm
                            "
                        >

                            <IconBrandGoogle
                                size={18}
                            />

                            Continue with Google

                        </button>


                        {/* ================================= */}
                        {/* REGISTER */}
                        {/* ================================= */}

                        <div
                            className="
                                mt-7
                                text-center
                            "
                        >

                            <Text
                                size="sm"
                                c="dimmed"
                            >

                                Don't have an account?

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/register"
                                        )
                                    }
                                    className="
                                        ml-1
                                        font-bold
                                        text-indigo-600
                                        transition
                                        hover:text-indigo-800
                                    "
                                >
                                    Create one
                                </button>

                            </Text>

                        </div>

                    </Paper>


                    {/* ================================= */}
                    {/* FOOTER */}
                    {/* ================================= */}

                    <Text
                        size="xs"
                        c="dimmed"
                        ta="center"
                        mt="xl"
                    >
                        © 2026 InkSpace. All
                        rights reserved.
                    </Text>

                </div>

            </Container>

        </main>

    );
}


export default Login;