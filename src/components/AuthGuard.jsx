import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthGuard({ children }) {
	const navigate = useNavigate();
	const [loader, setLoader] = useState(true);
	const authStatus = useSelector((state) => state.auth.status);

	useEffect(() => {
		if (authStatus) {
			navigate('/');
		}
		setLoader(false);
	}, [authStatus, navigate]);

	return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthGuard;
