import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CPU.vue') }],
  },

  {
    path: '/decoder',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DecoderPage.vue') }],
  },

  {
    path: '/about',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AboutPage.vue') }],
  },

  {
    path: '/tutorial',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TutorialPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
