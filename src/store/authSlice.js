import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('empLogin:token');
const userInfo = JSON.parse(localStorage.getItem('empLogin:user'));

const initialState = {
	status: token ? true : false,
	userData: token ? userInfo : null,
};

const authSlice = createSlice({
	name: 'auth',
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
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
