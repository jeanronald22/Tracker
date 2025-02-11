import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/providers/ThemeProviders.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider storageKey="vite-ui-theme" defaulTheme="dark">
			<App />
		</ThemeProvider>
	</StrictMode>
);
