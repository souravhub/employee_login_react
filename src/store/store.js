import { configureStore } from "@reduxjs/toolkit";
import authReducer, { login } from "../store/authSlice";
import loginInfoReducer from "../store/loginInfoSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        loginInfo: loginInfoReducer,
    },
});

export default store;
