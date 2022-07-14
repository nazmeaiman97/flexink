import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'bbs',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          { path: 'register', component: () => import('pages/Register.vue') },
          { path: 'list', component: () => import('pages/List.vue') },
          { path: 'view/:id?', component: () => import('pages/ViewList.vue') },
          { path: 'modify/:id?', component: () => import('pages/Modify.vue') },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
