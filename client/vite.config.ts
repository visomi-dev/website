import { UserConfig } from 'vite'
import VuePlugin from '@vitejs/plugin-vue'

const config: UserConfig = {
  plugins: [
    VuePlugin(),
  ],
  build: {
    minify: false,
  },
}

export default config
