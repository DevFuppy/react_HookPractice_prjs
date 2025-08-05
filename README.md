- installing @emotion and @normalize
    - cmd: npm install --save normalize.css
    - App.jsx: import "normalize.css";
    - cmd: npm install @emotion/styled @emotion/react
    - App.jsx: import styled from "@emotion/styled";
    - import { ThemeProvider } from "@emotion/react";
        - `<ThemeProvider theme={theme}>` (only accept object)

- importing SVG as components needs to install plugin
    - SVGR: 
        - npm install -D vite-plugin-svgr
        - import svgr from 'vite-plugin-svgr' (vite.config.js);
        - plugins :[.....   ,svgr()...
        - when importing svg as a component, the url needs to add '?react' at the end
            -e.g. import DayCloudyIcon from "./images/day-cloudy.svg?react";

- Deploy:
  1. npm install -D gh-pages (installing pluggings for deploy)
  2. vite.config.js :
     -  export default defineConfig({
            base: '/<你的 repo 名稱>/',  // ❗️務必注意斜線，例如：'/react_HookPractice_prjs/'...
  3.  package.json -> scripts adding:
      -   "predeploy": "npm run build",
            "deploy": "gh-pages -d dist -b gh-pages" 
  4. npm run deploy
  5. Go to github->your repo-> branch: gh-pages -> setting on the up-right corner (cog icon) -> pages -> Folder : root
  6. url: https://<你的帳號>.github.io/<你的 repo 名稱>/
