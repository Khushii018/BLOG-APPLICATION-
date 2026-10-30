import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/AdminDashboard";
import EditPost from "./pages/EditPost";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    return (
        <div className="min-h-screen bg-slate-50">

            <Header />

            <Routes>

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/posts"
                            replace
                        />
                    }
                />

                <Route
                    path="/posts"
                    element={<BlogList />}
                />

                <Route
                    path="/posts/:id"
                    element={<BlogDetails />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/create-post"
                    element={
                        <ProtectedRoute>
                            <CreatePost />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/edit/:id"
                    element={
                        <AdminRoute>
                            <EditPost />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <AdminRoute>
                            <Users />
                        </AdminRoute>
                    }
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </div>
    );
}

export default App;