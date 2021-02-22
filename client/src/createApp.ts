import { createSSRApp } from 'vue'

import { createRouter } from './router';
import App from './App.vue';

function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();

  app.use(router);

  return { app, router };
}

export default createApp;
