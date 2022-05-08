import { createApp } from 'vue';
import naive from 'naive-ui';
import { initial } from './setup';
import SiteRoot from './SiteRoot.vue';
import { routes } from './routes/routes';
import createDemoRouter from './routes/router';

const app = createApp(SiteRoot);

const router = createDemoRouter(app, routes);

app.use(router);
app.use(naive);
initial(app);

router.isReady().then(() => {
  app.mount('#app');
});
