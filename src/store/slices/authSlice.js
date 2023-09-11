import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", JSON.stringify(action.payload));
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});

export const {setToken, setIsLoggedIn} = authSlice.actions;
export default authSlice.reducer;