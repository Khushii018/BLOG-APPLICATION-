import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../api/axios";


// ==================================================
// LOGIN USER
// ==================================================

export const loginUser = createAsyncThunk(

    "auth/loginUser",

    async (credentials, thunkAPI) => {

        try {

            const response =
                await api.post(
                    "/auth/login",
                    credentials
                );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Login failed"
            );

        }

    }

);


// ==================================================
// REGISTER USER
// ==================================================

export const registerUser = createAsyncThunk(

    "auth/registerUser",

    async (userData, thunkAPI) => {

        try {

            const response =
                await api.post(
                    "/auth/register",
                    userData
                );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    }

);


// ==================================================
// LOCAL STORAGE
// ==================================================

const savedUser =
    localStorage.getItem(
        "blog_user"
    );

const savedToken =
    localStorage.getItem(
        "blog_token"
    );


// ==================================================
// INITIAL STATE
// ==================================================

const initialState = {

    user: savedUser
        ? JSON.parse(savedUser)
        : null,

    token:
        savedToken || null,

    loading: false,

    error: null,

};


// ==================================================
// AUTH SLICE
// ==================================================

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {


        // ==========================================
        // LOGOUT
        // ==========================================

        logout: (state) => {

            state.user = null;

            state.token = null;

            state.loading = false;

            state.error = null;

            localStorage.removeItem(
                "blog_user"
            );

            localStorage.removeItem(
                "blog_token"
            );

        },

    },


    // ==================================================
    // ASYNC THUNKS
    // ==================================================

    extraReducers: (builder) => {


        // ==========================================
        // LOGIN - PENDING
        // ==========================================

        builder.addCase(
            loginUser.pending,
            (state) => {

                state.loading = true;

                state.error = null;

            }
        );


        // ==========================================
        // LOGIN - SUCCESS
        // ==========================================

        builder.addCase(
            loginUser.fulfilled,
            (state, action) => {

                state.loading = false;

                state.error = null;

                state.user =
                    action.payload.user;

                state.token =
                    action.payload.token;


                localStorage.setItem(
                    "blog_user",
                    JSON.stringify(
                        action.payload.user
                    )
                );

                localStorage.setItem(
                    "blog_token",
                    action.payload.token
                );

            }
        );


        // ==========================================
        // LOGIN - FAILED
        // ==========================================

        builder.addCase(
            loginUser.rejected,
            (state, action) => {

                state.loading = false;

                state.error =
                    action.payload ||
                    "Login failed";

            }
        );


        // ==========================================
        // REGISTER - PENDING
        // ==========================================

        builder.addCase(
            registerUser.pending,
            (state) => {

                state.loading = true;

                state.error = null;

            }
        );


        // ==========================================
        // REGISTER - SUCCESS
        // ==========================================

        builder.addCase(
            registerUser.fulfilled,
            (state) => {

                state.loading = false;

                state.error = null;

            }
        );


        // ==========================================
        // REGISTER - FAILED
        // ==========================================

        builder.addCase(
            registerUser.rejected,
            (state, action) => {

                state.loading = false;

                state.error =
                    action.payload ||
                    "Registration failed";

            }
        );

    },

});


// ==================================================
// EXPORT NORMAL ACTIONS
// ==================================================

export const {
    logout,
} = authSlice.actions;


// ==================================================
// EXPORT REDUCER
// ==================================================

export default authSlice.reducer;