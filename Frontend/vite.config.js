import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // Tự động cập nhật khi có nội dung mới
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "SmartDine - Food Ordering App",
        short_name: "SmartDine",
        description:
          "Ứng dụng đặt món ăn nhanh chóng bằng QR, xem menu, gọi món và theo dõi trạng thái đơn hàng trực tiếp tại bàn.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "logo-app.png", // Bạn phải chuẩn bị icon này trong thư mục public
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo-app.png", // Bạn phải chuẩn bị icon này trong thư mục public
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 3000,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
