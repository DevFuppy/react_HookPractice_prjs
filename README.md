- installing @emotion and @normalize
    - cmd: npm install --save normalize.css
    - App.jsx: import "normalize.css";
    - cmd: npm install @emotion/styled @emotion/react
    - App.jsx: import styled from "@emotion/styled";
    - import { ThemeProvider } from "@emotion/react";
        - `<ThemeProvider theme={theme}>` (only accept object)

- Fontawesome
    - install :
        ```
         $ npm i --save @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons
        ```

    - Top-layer-module :     
       ```js    
       // App.js
       import { library } from '@fortawesome/fontawesome-svg-core';
       import { fab } from '@fortawesome/free-brands-svg-icons';
       import { fas } from '@fortawesome/free-solid-svg-icons';
       import { far } from '@fortawesome/free-regular-svg-icons';
       
       library.add(fab, fas, far);   
       ```
    - When using in component layers: 
       ```js
       import React from 'react';
        // STEP 1：在想要使用圖示的地方匯入 React FontAwesome
        import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

        export const Gadget = () => (
          <div>
            {/* STEP 2：套用 FontAwesome 提供的 microsoft 圖示} */}
            <FontAwesomeIcon icon={['fab', 'microsoft']} />
          </div>
        );
       ```    
 



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

- Basic PWA (only for dowloading)
  1. npm i -D vite-plugin-pwa 
  2. vite.config.js -> plugins: -> VitePWA -> ({manifest:...
  3. deply