import React from 'react';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function Layout() {
	return (
		<>
			<Header />
			<div className="mx-16 p-2">
				<Outlet />
			</div>
			<Footer />
		</>
	);
}

export default Layout;
