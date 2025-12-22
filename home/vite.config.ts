import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    federation({
			name: 'host',
			remotes: {
				remote: {
					type: 'module',
					name: 'remote',
					entry: 'http://localhost:4173/remoteEntry.js',
					entryGlobalName: 'remote',
					shareScope: 'default',
				},
			},
			exposes: {},
			filename: 'remoteEntry.js',
			shared: {
				react: {
					requiredVersion: pkg.dependencies.react,
					singleton: true,
				},
			},
		}),
    react()
  ],
  build: {
    target: 'chrome89',
  },
})
