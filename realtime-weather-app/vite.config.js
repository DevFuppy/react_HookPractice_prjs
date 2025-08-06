import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/react_HookPractice_prjs/",
  plugins: [
    react(),
    svgr(),
    VitePWA({manifest: {
      short_name: "臺灣好天氣",
      name: "臺灣好天氣-即時縣市天氣",
      icons: [
        {
          src: "icon@192.png",
          type: "image/png",
          sizes: "192x192",
        },
        {
          src: "icon@512.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
      start_url: ".",
      display: "standalone",
      orientation: "portrait-primary",
      theme_color: "#1f2022",
      background_color: "#1f2022",
    }}),
  ],
});
