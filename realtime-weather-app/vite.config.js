import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(

   // 讓 jsx 的 css prop 作用於 @emotion/react
    // {     
    //   jsxImportSource: '@emotion/react',
    //   babel: {
    //     plugins: ['@emotion'] 
    //   }
    // }


  ),

      svgr()

],
})
