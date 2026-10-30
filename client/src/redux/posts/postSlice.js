import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../api/axios";


// ==================================================
// GET ALL POSTS
// ==================================================

export const fetchPosts =
    createAsyncThunk(

        "posts/fetchPosts",

        async (_, thunkAPI) => {

            try {

                const response =
                    await api.get(
                        "/posts"
                    );

                return response.data;

            } catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||
                    "Failed to fetch posts"

                );

            }

        }

    );


// ==================================================
// GET SINGLE POST
// ==================================================

export const fetchPost =
    createAsyncThunk(

        "posts/fetchPost",

        async (id, thunkAPI) => {

            try {

                const response =
                    await api.get(
                        `/posts/${id}`
                    );

                return response.data;

            } catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||
                    "Failed to fetch post"

                );

            }

        }

    );


// ==================================================
// CREATE POST - NORMAL USER
// ==================================================

export const createPost =
    createAsyncThunk(

        "posts/createPost",

        async (postData, thunkAPI) => {

            try {

                const response =
                    await api.post(
                        "/posts",
                        postData
                    );

                /*
                    Your backend returns:

                    {
                        message: "...",
                        post: {...}
                    }

                    So we return only post.
                */

                return response.data.post;

            } catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||
                    "Failed to create post"

                );

            }

        }

    );


// ==================================================
// ADMIN - GET ALL POSTS
// ==================================================

export const fetchAdminPosts =
    createAsyncThunk(

        "posts/fetchAdminPosts",

        async (_, thunkAPI) => {

            try {

                const response =
                    await api.get(
                        "/admin/posts"
                    );

                return response.data;

            } catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||
                    "Failed to fetch admin posts"

                );

            }

        }

    );


// ==================================================
// ADMIN - CREATE POST
// ==================================================

export const adminCreatePost =
    createAsyncThunk(

        "posts/adminCreatePost",

        async (postData, thunkAPI) => {

            try {

                const response =
                    await api.post(
                        "/admin/posts",
                        postData
                    );

                return response.data.post;

            } catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||
                    "Failed to create post"

                );

            }

        }

    );


// ==================================================
// ADMIN - UPDATE POST
// ==================================================

export const updatePost =
    createAsyncThunk(

        "posts/updatePost",

        async (
            {
                id,
                postData,
            },
            thunkAPI
        ) => {

            try {

                const response =
                    await api.put(
                        `/admin/posts/${id}`,
                        postData
                    );

                return response.data.post;

            } catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||
                    "Failed to update post"

                );

            }

        }

    );


// ==================================================
// ADMIN - DELETE POST
// ==================================================

export const deletePost =
    createAsyncThunk(

        "posts/deletePost",

        async (id, thunkAPI) => {

            try {

                await api.delete(
                    `/admin/posts/${id}`
                );

                return id;

            } catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||
                    "Failed to delete post"

                );

            }

        }

    );


// ==================================================
// INITIAL STATE
// ==================================================

const initialState = {

    posts: [],

    selectedPost: null,

    loading: false,

    error: null,

};


// ==================================================
// SLICE
// ==================================================

const postSlice = createSlice({

    name: "posts",

    initialState,


    reducers: {

        clearSelectedPost: (state) => {

            state.selectedPost = null;

        },

        clearPostError: (state) => {

            state.error = null;

        },

    },


    extraReducers: (builder) => {


        // ==================================================
        // FETCH POSTS
        // ==================================================

        builder

            .addCase(
                fetchPosts.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchPosts.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.posts =
                        action.payload;

                }
            )

            .addCase(
                fetchPosts.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // ==================================================
        // FETCH SINGLE POST
        // ==================================================

        builder

            .addCase(
                fetchPost.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchPost.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.selectedPost =
                        action.payload;

                }
            )

            .addCase(
                fetchPost.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // ==================================================
        // CREATE POST
        // ==================================================

        builder

            .addCase(
                createPost.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                createPost.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.posts.unshift(
                        action.payload
                    );

                }
            )

            .addCase(
                createPost.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // ==================================================
        // ADMIN - FETCH POSTS
        // ==================================================

        builder

            .addCase(
                fetchAdminPosts.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchAdminPosts.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.posts =
                        action.payload;

                }
            )

            .addCase(
                fetchAdminPosts.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // ==================================================
        // ADMIN - CREATE POST
        // ==================================================

        builder

            .addCase(
                adminCreatePost.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.posts.unshift(
                        action.payload
                    );

                }
            )

            .addCase(
                adminCreatePost.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                adminCreatePost.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // ==================================================
        // ADMIN - UPDATE POST
        // ==================================================

        builder

            .addCase(
                updatePost.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                updatePost.fulfilled,
                (state, action) => {

                    state.loading = false;


                    const updatedPost =
                        action.payload;


                    const index =
                        state.posts.findIndex(
                            (post) =>
                                post.id ===
                                updatedPost.id
                        );


                    if (index !== -1) {

                        state.posts[index] =
                            updatedPost;

                    }

                }
            )

            .addCase(
                updatePost.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // ==================================================
        // ADMIN - DELETE POST
        // ==================================================

        builder

            .addCase(
                deletePost.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                deletePost.fulfilled,
                (state, action) => {

                    state.loading = false;


                    state.posts =
                        state.posts.filter(
                            (post) =>
                                post.id !==
                                Number(
                                    action.payload
                                )
                        );

                }
            )

            .addCase(
                deletePost.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

    },

});


// ==================================================
// EXPORT NORMAL REDUX ACTIONS
// ==================================================

export const {
    clearSelectedPost,
    clearPostError,
} = postSlice.actions;


// ==================================================
// EXPORT REDUCER
// ==================================================

export default postSlice.reducer;