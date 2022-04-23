export const docRoutes = [
  {
    name: 'introduction',
    path: 'introduction',
    component: () => import('../../../docs/docs/introduction/index.md')
  }
];

export const componentRoutes = [
  {
    path: 'button',
    component: () => import('../../../docs/components/button/index.demo-entry.md')
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
    component: () => import('../components/Layout.vue'),
    children: docRoutes
  },
  {
    name: 'components',
    path: '/components',
    component: () => import('../components/Layout.vue'),
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
