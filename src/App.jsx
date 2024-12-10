import { useState } from 'react';
import { Header, Footer, Home } from './components';

import './App.css';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			{/* <Header /> */}
			<Home />
			<Footer />
		</>
	);
}

export default App;
