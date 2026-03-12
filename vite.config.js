import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Thêm dòng base này vào, tên phải khớp chính xác với tên repository
  base: '/KNLVN-danhgiacheo/',
})
