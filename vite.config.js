
////<reference types="vitest" />
////<reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
// import { defineConfig } from 'vitest/config'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  test: {
   globals:true,
   environment:"jsdom",
   css:true,
   setupFiles: './setupTest.js',
      coverage: {
         reporter: ['text', 'json', 'html'],
      }
  },
})





