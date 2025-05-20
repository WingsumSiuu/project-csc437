import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                egg: resolve(__dirname, 'eggs.html'),
                bee: resolve(__dirname, 'bees.html'),
                dandelion: resolve(__dirname, '/areas/fields/dandelion.html'),
                noobshop: resolve(__dirname, '/areas/shops/noobshop.html'),
                blackbear: resolve(__dirname, '/areas/npcs/blackbear.html'),
                motherbear: resolve(__dirname, '/areas/npcs/motherbear.html'),
                spider: resolve(__dirname, '/areas/fields/spider.html'),
                bamboo: resolve(__dirname, '/areas/fields/bamboo.html'),
                login: resolve(__dirname, 'login.html'),
                newuser: resolve(__dirname, 'new-user.html'),
            },
        },
    },
})