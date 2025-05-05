import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        port: 5173 // Changed to match the port in the URL
    },
    build: {
        outDir: 'dist'
    }
});