import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("empLogin:token");
const userInfo = JSON.parse(localStorage.getItem("empLogin:user"));

const initialState = {
    status: token ? true : false,
    userData: token ? userInfo : null,
    userList: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        setUserList: (state, action) => {
            state.userList = action.payload.map((el) => {
                return {
                    _id: el._id,
                    name: `${el.name.firstName} ${el.name.lastName}`,
                };
            });
        },
    },
});

export const { login, logout, setUserList } = authSlice.actions;

export default authSlice.reducer;
