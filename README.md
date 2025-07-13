- importing SVG as components needs to install plugin
    - SVGR: 
        - npm install -D vite-plugin-svgr
        - import svgr from 'vite-plugin-svgr' (vite.config.js);
        -  pligins :[.....   ,svgr({
      // 啟用 ?component 查詢字串機制
      exportAsDefault: false
    })