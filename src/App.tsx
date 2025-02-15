import { BrowserRouter, Route, Routes } from 'react-router';
import Page from './app/dashboard/page';
import { Pomodoro } from './app/pomodoro/page';
import MainTask from './app/taskManager/MainTask';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* le dashboard englobe toutes les pages */}
				<Route element={<Page />}>
					<Route index element={<Pomodoro />} />
					<Route path="task" element={<MainTask />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
