import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      // Parse VITE_PORT from environment variables or default to 4000
      port: parseInt(env.VITE_PORT) || 4000,
    },
  }
});
