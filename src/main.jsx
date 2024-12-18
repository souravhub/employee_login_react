import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import { ProtectedRoute } from './components/index.js';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';

import { Provider } from 'react-redux';
import store from './store/store.js';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
			},
			{
				path: '/about',
				element: (
					<ProtectedRoute>
						<About />
					</ProtectedRoute>
				),
			},
			{
				path: '/login',
				element: (
					<ProtectedRoute>
						<Login />
					</ProtectedRoute>
				),
			},
			{
				path: '/signup',
				element: (
					<ProtectedRoute>
						<SignUp />
					</ProtectedRoute>
				),
			},
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
