import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout as authLogout } from '../../store/authSlice.js';
import axiosInstance from '../../axiosConfig.js';
import { buttonVariants } from '../index.js';

export default function Header() {
	const authStatus = useSelector((state) => state.auth.status);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initLogout = async function () {
		try {
			await axiosInstance.post(`/api/v1/users/logout`);
		} catch (error) {
			console.log(error.message);
		} finally {
			dispatch(authLogout());
			localStorage.removeItem('empLogin:token');
			localStorage.removeItem('empLogin:user');
			navigate('/login');
		}
	};

	return (
		<header className="shadow sticky z-50 top-0 bg-amber-300">
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
								className={buttonVariants({
									variant: 'default',
								})}
							>
								Log in
							</Link>
						)}
						{authStatus && (
							<Link
								to="#"
								onClick={initLogout}
								className={buttonVariants({
									variant: 'outline',
								})}
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
