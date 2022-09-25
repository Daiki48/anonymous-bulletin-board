import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.scss';

import { ItemManagement } from './components/ItemManagement';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<p>({import.meta.env.MODE})</p>
			<ItemManagement />
		</div>
	);
}

export default App;
