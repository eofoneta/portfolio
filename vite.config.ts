import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // bundle animation libs into the prerender build; their Node entry points don't interop with ESM
  ssr: {
    noExternal: ['gsap', '@gsap/react', 'split-type', 'lenis'],
  },
})
