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
                noobshop: resolve(__dirname, '/areas/shops/noobshop.html'),
                blackbear: resolve(__dirname, '/npcs/blackbear.html'),
                motherbear: resolve(__dirname, '/npcs/motherbear.html'),
                pandabear: resolve(__dirname, '/npcs/pandabear.html'),
                dandelion: resolve(__dirname, '/fields/dandelion.html'),
                spider: resolve(__dirname, '/fields/spider.html'),
                bamboo: resolve(__dirname, '/fields/bamboo.html'),
                login: resolve(__dirname, 'login.html'),
                newuser: resolve(__dirname, 'new-user.html'),
            },
        },
    },
})