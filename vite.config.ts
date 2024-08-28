import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: '0.0.0.0',  
    host: true,
    // strictPort: true,
    cors: true,
    port: 8080,
    hmr: {
      protocol: 'ws',
      host: 'viblo.clone',  // Make sure this matches your server_name in Nginx
      port: 5173,  // Match this to your Nginx SSL port
    },
  },
});
