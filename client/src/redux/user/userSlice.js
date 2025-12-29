import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : {},
    isLoading : false
};

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        signInStart : (state) => {
            state.isLoading = true;
        },
        signInSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.error = {};
            state.isLoading = false;
        }, 
        signInFailure : (state, action) => {
            state.error = action.payload || {};
            state.isLoading = false
        },
        updateUserStart : (state) => {
            state.isLoading = true
        },
        updateUserSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = {};
        },
        updateUserFailure : (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        },
        signOutStart : (state) => {
            state.isLoading = true;
        },
        signOutSuccess : (state) => {
            state.currentUser = null;
            state.error = {};
            state.isLoading = false;
        },
        signOutFailure : (state, action) => {
            state.error = action.payload;
            state.isLoading = false
        },
        deleteUserStart : (state) => {
            state.isLoading = true;
        },
        deleteUserSuccess : (state, action) => {
            state.currentUser = null;
            state.isLoading = false;
            state.error = {}
        },
        deleteUserFailure : (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
});

export const {

    signInStart, 
    signInSuccess, 
    signInFailure, 
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    signOutStart,
    signOutSuccess,
    signOutFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure

} = userSlice.actions;

export default userSlice.reducer;