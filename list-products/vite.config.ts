import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    federation({
      filename: 'remoteEntry.js',
      name: 'remote',
      exposes: {
        './remote-products': './src/App.tsx',
      },
      remotes: {},
      shared: {
        react: {
          requiredVersion: pkg.dependencies.react,
          singleton: true,

        },
      },
    }),
    react()],
  build: {
    target: 'chrome89',
  },
})
