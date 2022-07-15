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
            component: () => import('pages/BBSRegister.vue'),
          },
          { path: 'list', component: () => import('pages/BBSList.vue') },
          { path: 'view/:id?', component: () => import('pages/ViewList.vue') },
          { path: 'modify/:id?', component: () => import('pages/Modify.vue') },
        ],
      },
      {
        path: 'member',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {
            path: 'register',
            component: () => import('pages/MemberRegister.vue'),
          },
          { path: 'list', component: () => import('pages/MemberList.vue') },
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
