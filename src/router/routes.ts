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
          {
            path: 'register',
            component: () => import('pages/bbs/Register.vue'),
          },
          { path: 'list', component: () => import('pages/bbs/List.vue') },
          {
            path: 'view/:id?',
            component: () => import('src/pages/bbs/View.vue'),
          },
          {
            path: 'modify/:id?',
            component: () => import('src/pages/bbs/Modify.vue'),
          },
        ],
      },
      {
        path: 'member',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {
            path: 'register',
            component: () => import('pages/register/Register.vue'),
          },
          { path: 'list', component: () => import('pages/register/List.vue') },
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
