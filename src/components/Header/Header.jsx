import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout as authLogout } from '../../store/authSlice.js';
import axiosInstance from '../../axiosConfig.js';

export default function Header() {
	const authStatus = useSelector((state) => state.auth.status);
	const dispatch = useDispatch();

	const initLogout = async function () {
		try {
			const res = await axiosInstance.post(`/api/v1/users/logout`);
			console.log(res, 'logout');
			dispatch(authLogout());
			localStorage.removeItem('empLogin:token');
			localStorage.removeItem('empLogin:user');
			dispatch('/login');
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<header className="shadow sticky z-50 top-0 bg-amber-200">
			<nav className=" border-gray-200  py-2.5 px-20">
				<div className="flex flex-wrap justify-between items-center ">
					<Link to="/" className="flex items-center">
						<img
							src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
							className="mr-3 h-12"
							alt="Logo"
						/>
					</Link>
					<div className="flex items-center">
						{!authStatus && (
							<Link
								to="/login"
								className="text-gray-800 hover:bg-gray-900 hover:text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
							>
								Log in
							</Link>
						)}
						{authStatus && (
							<Link
								to="#"
								onClick={initLogout}
								className="text-gray-800 hover:bg-gray-900 hover:text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
							>
								Log Out
							</Link>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
}
