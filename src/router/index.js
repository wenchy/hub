import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'
import FileExplorer from '@/components/FileExplorer.vue'
import About from '@/components/About.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
         {
            path: '/',
            component: Layout,
        },
        {
            path: '/file-explorer',
            component: FileExplorer,
        },
        {
            path: '/about',
            component: About,
        },
    ],
})