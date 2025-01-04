import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todayInfo: null,
    allInfo: [],
};

const loginInfoSlice = createSlice({
    name: "loginInfo",
    initialState,
    reducers: {
        setTodayInfo: (state, action) => {
            state.todayInfo = action.payload;
        },
        setAllInfo: (state, action) => {
            state.allInfo = action.payload;
        },
    },
});

export const { setTodayInfo, setAllInfo } = loginInfoSlice.actions;

export default loginInfoSlice.reducer;
