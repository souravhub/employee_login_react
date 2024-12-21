import React from 'react';
import { Link, NavLink } from 'react-router-dom';
function Footer() {
	return (
		<div className="bg-gray-700 px-20 h-[3rem] flex items-center justify-center">
			<p className="text-md text-white">
				<span className="text-orange-500">All Rights Recieved</span> @{' '}
				<span className="text-orange-500">Sourav Samanta</span>
			</p>
		</div>
	);
}

export default Footer;
