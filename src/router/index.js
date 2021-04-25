import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'
import FileExplorer from '@/components/FileExplorer'
import About from '@/components/About'
import NotFound from '@/components/NotFound'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Layout,
            redirect: '/about',
            children: [
                {
                    path: '/file-explorer',
                    component: FileExplorer,
                },
                {
                    path: '/about',
                    component: About,
                },
                {
                    path: '/:pathMatch(.*)',
                    component: NotFound,
                }
            ],
        },
    ],
})