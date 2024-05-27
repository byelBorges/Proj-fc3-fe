import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import FormAdm from './components/FormAdm.vue';
import FormCidadao from './components/FormCidadao.vue';
import FormLogin from './components/FormLogin.vue';
import FormCadastroCidadao from './components/FormCadastroCidadao.vue';

const router = createRouter({
   history: createWebHistory(),
   routes: [
      { path: '/adm', component: FormAdm },
      { path: '/cidadao', component: FormCidadao },
      { path: '/login', component: FormLogin },
      { path: '/', redirect: '/login' },
      { path: '/cadastro', component: FormCadastroCidadao},
   ]
});

const app = createApp(App);
app.use(router);
app.mount('#app');