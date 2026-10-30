import {
    Navigate,
} from "react-router-dom";

import {
    useSelector,
} from "react-redux";

function AdminRoute({
    children,
}) {

    const user =
        useSelector(
            (state) =>
                state.auth.user
        );

    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    if (
        user.role !==
        "admin"
    ) {

        return (
            <Navigate
                to="/posts"
                replace
            />
        );

    }

    return children;
}

export default AdminRoute;