import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  { ignores: ['dist/', 'coverage/'] },

  js.configs.recommended,

  // React Hooks flat config
  reactHooksPlugin.configs.flat.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      semi: 'off',
      'react/react-in-jsx-scope': 'off',  // not needed with React 17+ JSX transform
      'react/prop-types': 'off',           // TypeScript handles this
    },
    settings: {
      // Use a literal version to avoid eslint-plugin-react calling the removed
      // ESLint 10 context.getFilename() API during version auto-detection
      react: { version: '19' },
    },
  },

  // Vitest globals for test files
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.vitest,
    },
  },

  // Must be last: disables ESLint rules that conflict with Prettier
  prettierConfig,
];
