import js from '@eslint/js';
import globals from 'globals';
import reactRecommended from 'eslint-plugin-react/configs/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
	{ ignores: ['dist', 'node_modules', 'build', 'public'] }, // Dossiers à ignorer
	{
		extends: [
			js.configs.recommended, // Règles recommandées par ESLint
			...tseslint.configs.recommended, // Règles recommandées pour TypeScript
			reactRecommended, // Règles recommandées pour React
			'plugin:jsx-a11y/recommended', // Accessibilité JSX
			'plugin:prettier/recommended', // Intégration Prettier
		],
		files: ['**/*.{ts,tsx, js, jsx}'], // Appliquer uniquement aux fichiers TypeScript et TSX
		languageOptions: {
			ecmaVersion: 2022, // Utiliser ECMAScript 2022
			sourceType: 'module', // Utiliser les modules ES
			globals: {
				...globals.browser, // Variables globales du navigateur
				...globals.node, // Variables globales de Node.js (si nécessaire)
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true, // Activer JSX
				},
				project: './tsconfig.json', // Chemin vers tsconfig.json
			},
		},
		plugins: {
			react: reactRecommended, // Plugin React
			'react-hooks': reactHooks, // Plugin React Hooks
			'react-refresh': reactRefresh, // Plugin React Refresh
			prettier, // Plugin Prettier
			import: importPlugin, // Plugin pour l'ordre des imports
			'unused-imports': unusedImports, // Plugin pour détecter les imports inutilisés
			'jsx-a11y': jsxA11y, // Plugin pour l'accessibilité JSX
		},
		rules: {
			// Règles de base
			'no-console': 'warn', // Avertir en cas de console.log
			'no-unused-vars': 'off', // Désactiver la règle ESLint par défaut
		},
	}
);
