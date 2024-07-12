import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router.js';
import store from './store';
import './assets/tailwind.css';
import { provideApolloClient } from '@vue/apollo-composable';
import apolloClient from './apollo';

const app = createApp(App);

provideApolloClient(apolloClient);

app.use(router);
app.use(store);

app.mount('#app');
