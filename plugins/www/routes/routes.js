import { useMenuOptions } from '../store';

function parseOptionsToRoutes() {
  const options = useMenuOptions().value;

  const routes = Object.entries(options).map(([docName, docOptions]) => {
    const children = [];
    docOptions.forEach((option) => {
      if (option.type === 'group') {
        option.children.forEach((item) => {
          children.push({
            name: item.name,
            path: item.name,
            component: () => import(/* @vite-ignore */ item.filerRlativePath)
          });
        });
      } else {
        children.push({
          name: option.name,
          path: option.name,
          component: () => import(/* @vite-ignore */ option.filerRlativePath)
        });
      }
    });
    return {
      name: docName,
      path: '/' + docName,
      component: () => import('../components/Layout.vue'),
      children
    };
  });

  return routes;
}

export const routes = [
  {
    name: 'home',
    path: '/',
    redirect: {
      name: 'introduction'
    }
  },
  ...parseOptionsToRoutes(),
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home'
    }
  }
];
