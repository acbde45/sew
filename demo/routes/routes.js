export const docRoutes = [
  {
    name: 'introduction',
    path: 'introduction',
    component: () => import('../pages/docs/introduction/index.md')
  }
];

export const componentRoutes = [
  {
    path: 'button',
    component: () => import('../../src/button/demos/index.demo-entry.md')
  }
];

export const routes = [
  {
    name: 'home',
    path: '/',
    redirect: {
      name: 'introduction'
    }
  },
  {
    name: 'docs',
    path: '/docs',
    component: () => import('../pages/Layout.vue'),
    children: docRoutes
  },
  {
    name: 'components',
    path: '/components',
    component: () => import('../pages/Layout.vue'),
    children: componentRoutes
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home'
    }
  }
];
