import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router.js';
import store from './store';
import './assets/tailwind.css';
import { apolloClient, apolloProvider } from './apollo';
import { provideApolloClient } from '@vue/apollo-composable';

const app = createApp(App);

provideApolloClient(apolloClient);

app.use(router);
app.use(store);
app.use(apolloProvider);

app.mount('#app');
