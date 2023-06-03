import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import terser from '@rollup/plugin-terser'
import Package from './package.json'

export default defineConfig(({ mode }) => {
   if (mode === 'app') {
      return {
         plugins: [react()]
      }
   }
   return {
      build: {
         minify: 'terser',
         lib: {
            name: Package.name,
            entry: 'src/index.tsx',
            formats: ['es', 'cjs'],
            fileName: 'index'
         },
         rollupOptions: {
            external: ['react', 'react/jsx-runtime'],
            output: {
               globals: {
                  react: 'React',
                  'react/jsx-runtime': 'React'
               }
            },
            plugins: [
               terser({
                  compress: {
                     defaults: true
                  }
               })
            ]
         }
      },
      plugins: [react()]
   }
})
