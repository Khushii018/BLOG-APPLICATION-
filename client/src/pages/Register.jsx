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
    Progress,
} from "@mantine/core";

import {
    IconUser,
    IconMail,
    IconLock,
    IconArrowRight,
    IconSparkles,
    IconCheck,
    IconX,
} from "@tabler/icons-react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    registerUser,
} from "../redux/auth/authSlice";

import {
    useNavigate,
} from "react-router-dom";


function Register() {

    const navigate =
        useNavigate();

    const dispatch =
        useDispatch();


    // =========================================
    // AUTH STATE
    // =========================================

    const {
        loading,
        error,
    } = useSelector(
        (state) => state.auth
    );


    // =========================================
    // FORM STATE
    // =========================================

    const [form, setForm] =
        useState({

            username: "",
            email: "",
            password: "",
            confirmPassword: "",

        });


    // =========================================
    // PASSWORD STRENGTH
    // =========================================

    const passwordStrength =
        Math.min(

            100,

            (
                form.password.length >= 8
                    ? 25
                    : 0
            ) +

            (
                /[A-Z]/.test(
                    form.password
                )
                    ? 25
                    : 0
            ) +

            (
                /[0-9]/.test(
                    form.password
                )
                    ? 25
                    : 0
            ) +

            (
                /[^A-Za-z0-9]/.test(
                    form.password
                )
                    ? 25
                    : 0
            )

        );


    // =========================================
    // PASSWORD MATCH
    // =========================================

    const passwordsMatch =
        form.confirmPassword.length > 0 &&
        form.password ===
            form.confirmPassword;


    // =========================================
    // INPUT HANDLER
    // =========================================

    const handleChange = (
        field,
        value
    ) => {

        setForm({
            ...form,
            [field]: value,
        });

    };


    // =========================================
    // SUBMIT
    // =========================================

    const submit = async (e) => {

        e.preventDefault();


        // Check passwords

        if (
            form.password !==
            form.confirmPassword
        ) {

            return;

        }


        try {

            await dispatch(
                registerUser({

                    username:
                        form.username,

                    email:
                        form.email,

                    password:
                        form.password,

                })
            ).unwrap();


            // Registration successful

            alert(
                "Account created successfully!"
            );


            navigate(
                "/login"
            );


        } catch (error) {

            console.log(
                "Registration failed:",
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

            {/* ================================= */}
            {/* BACKGROUND DECORATION */}
            {/* ================================= */}

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
                    h-72
                    w-72
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-indigo-100/30
                    blur-3xl
                "
            />


            {/* ================================= */}
            {/* CONTAINER */}
            {/* ================================= */}

            <Container
                size="sm"
                className="
                    relative
                    flex
                    min-h-[calc(100vh-72px)]
                    items-center
                    justify-center
                    py-10
                "
            >

                <div
                    className="
                        w-full
                        max-w-md
                    "
                >


                    {/* ================================= */}
                    {/* BRAND / HEADING */}
                    {/* ================================= */}

                    <div
                        className="
                            mb-7
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
                            Create your account
                        </Title>


                        <Text
                            c="dimmed"
                            size="sm"
                            className="mt-2"
                        >
                            Join the{" "}

                            <span
                                className="
                                    font-semibold
                                    text-indigo-600
                                "
                            >
                                InkSpace
                            </span>

                            {" "}community and
                            start sharing your ideas.
                        </Text>

                    </div>


                    {/* ================================= */}
                    {/* REGISTER CARD */}
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

                            <Stack gap="md">


                                {/* ================================= */}
                                {/* USERNAME */}
                                {/* ================================= */}

                                <TextInput
                                    label="Username"
                                    placeholder="Choose a username"
                                    required
                                    size="md"
                                    radius="md"
                                    leftSection={
                                        <IconUser
                                            size={18}
                                        />
                                    }
                                    value={
                                        form.username
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "username",
                                            e.currentTarget
                                                .value
                                        )
                                    }
                                    classNames={{
                                        label:
                                            "mb-1 font-semibold text-slate-700",

                                        input:
                                            "border-slate-200 focus:border-indigo-500",
                                    }}
                                />


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
                                    value={
                                        form.email
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "email",
                                            e.currentTarget
                                                .value
                                        )
                                    }
                                    classNames={{
                                        label:
                                            "mb-1 font-semibold text-slate-700",

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
                                        placeholder="Create a strong password"
                                        required
                                        size="md"
                                        radius="md"
                                        leftSection={
                                            <IconLock
                                                size={18}
                                            />
                                        }
                                        value={
                                            form.password
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                "password",
                                                e.currentTarget
                                                    .value
                                            )
                                        }
                                        classNames={{
                                            label:
                                                "mb-1 font-semibold text-slate-700",

                                            input:
                                                "border-slate-200 focus:border-indigo-500",
                                        }}
                                    />


                                    {/* PASSWORD STRENGTH */}

                                    {form.password.length >
                                        0 && (

                                        <div
                                            className="
                                                mt-3
                                            "
                                        >

                                            <Progress
                                                value={
                                                    passwordStrength
                                                }
                                                size="xs"
                                                radius="xl"
                                                color={
                                                    passwordStrength <
                                                    50
                                                        ? "red"
                                                        : passwordStrength <
                                                            75
                                                        ? "yellow"
                                                        : "green"
                                                }
                                            />


                                            <Text
                                                size="xs"
                                                c="dimmed"
                                                mt={5}
                                            >

                                                {passwordStrength <
                                                50
                                                    ? "Weak password"
                                                    : passwordStrength <
                                                        75
                                                    ? "Good password"
                                                    : "Strong password"}

                                            </Text>

                                        </div>

                                    )}

                                </div>


                                {/* ================================= */}
                                {/* CONFIRM PASSWORD */}
                                {/* ================================= */}

                                <div>

                                    <PasswordInput
                                        label="Confirm password"
                                        placeholder="Re-enter your password"
                                        required
                                        size="md"
                                        radius="md"
                                        leftSection={
                                            <IconLock
                                                size={18}
                                            />
                                        }
                                        value={
                                            form.confirmPassword
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                "confirmPassword",
                                                e.currentTarget
                                                    .value
                                            )
                                        }
                                        error={
                                            form.confirmPassword
                                                .length > 0 &&
                                            !passwordsMatch
                                                ? "Passwords do not match"
                                                : false
                                        }
                                        classNames={{
                                            label:
                                                "mb-1 font-semibold text-slate-700",

                                            input:
                                                "border-slate-200 focus:border-indigo-500",
                                        }}
                                    />


                                    {/* MATCH MESSAGE */}

                                    {passwordsMatch && (

                                        <div
                                            className="
                                                mt-2
                                                flex
                                                items-center
                                                gap-1.5
                                                text-xs
                                                font-medium
                                                text-green-600
                                            "
                                        >

                                            <IconCheck
                                                size={15}
                                            />

                                            Passwords match

                                        </div>

                                    )}

                                </div>


                                {/* ================================= */}
                                {/* PASSWORD REQUIREMENTS */}
                                {/* ================================= */}

                                <div
                                    className="
                                        rounded-xl
                                        border
                                        border-slate-100
                                        bg-slate-50
                                        p-4
                                    "
                                >

                                    <p
                                        className="
                                            mb-3
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-slate-500
                                        "
                                    >
                                        Password requirements
                                    </p>


                                    <div
                                        className="
                                            grid
                                            grid-cols-2
                                            gap-2
                                        "
                                    >

                                        <Requirement
                                            met={
                                                form.password
                                                    .length >=
                                                8
                                            }
                                        >
                                            8+ characters
                                        </Requirement>


                                        <Requirement
                                            met={
                                                /[A-Z]/.test(
                                                    form.password
                                                )
                                            }
                                        >
                                            Uppercase
                                        </Requirement>


                                        <Requirement
                                            met={
                                                /[0-9]/.test(
                                                    form.password
                                                )
                                            }
                                        >
                                            Number
                                        </Requirement>


                                        <Requirement
                                            met={
                                                /[^A-Za-z0-9]/.test(
                                                    form.password
                                                )
                                            }
                                        >
                                            Special character
                                        </Requirement>

                                    </div>

                                </div>


                                {/* ================================= */}
                                {/* BACKEND ERROR */}
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
                                {/* SUBMIT */}
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
                                    disabled={
                                        !passwordsMatch
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
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                >
                                    Create account
                                </Button>

                            </Stack>

                        </form>


                        {/* ================================= */}
                        {/* LOGIN LINK */}
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

                                Already have an account?

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/login"
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
                                    Sign in
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
                        By creating an account,
                        you agree to our terms
                        and privacy policy.
                    </Text>

                </div>

            </Container>

        </main>

    );
}


// =====================================
// PASSWORD REQUIREMENT COMPONENT
// =====================================

function Requirement({
    met,
    children,
}) {

    return (

        <div
            className={`
                flex
                items-center
                gap-1.5
                text-xs
                ${
                    met
                        ? "text-green-600"
                        : "text-slate-400"
                }
            `}
        >

            {met ? (

                <IconCheck
                    size={14}
                />

            ) : (

                <IconX
                    size={14}
                />

            )}

            {children}

        </div>

    );
}


export default Register;