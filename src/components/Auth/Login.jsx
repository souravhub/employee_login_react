import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
	return (
		<div className="flex h-64 items-center">
			<Link
				to="/signup"
				className="bg-blue-700 p-2 text-yellow-300 rounded-md"
			>
				Go to Sign Up Page
			</Link>
		</div>
	);
}

export default Login;
