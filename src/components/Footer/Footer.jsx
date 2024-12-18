import React from 'react';
import { Link, NavLink } from 'react-router-dom';
function Footer() {
	return (
		<div className="bg-gray-700 px-20 py-4 text-center">
			<p className="text-md text-white">
				<span className="text-orange-500">All Rights Recieved</span> @{' '}
				<span className="text-orange-500">Sourav Samanta</span>
			</p>
			{/* <div
				className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
				id="mobile-menu-2"
			>
				<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								`block py-2 pr-4 pl-3 duration-200 ${
									isActive ? 'text-orange-500' : 'text-white'
								} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
							}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/about"
							className={({ isActive }) =>
								`block py-2 pr-4 pl-3 duration-200 ${
									isActive ? 'text-orange-500' : 'text-white'
								} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
							}
						>
							About
						</NavLink>
					</li>
				</ul>
			</div> */}
		</div>
	);
}

export default Footer;
