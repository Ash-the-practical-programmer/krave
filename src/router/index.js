// src/router/index.js - TEMPORARY SIMPLIFIED VERSION
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue'; // Ensure this path is correct and LandingPage.vue is error-free

const routes = [
    {
        path: '/',
        name: 'Landing',
        component: LandingPage,
    },
    // Comment out other routes for now
    // {
    //     path: '/app',
    //     name: 'App',
    //     component: MainAppLayout, // This line could cause issues if MainAppLayout.vue has errors or path is wrong
    // },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;