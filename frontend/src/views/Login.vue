<template>
  <div class="login-container flex items-center justify-center">
    <div class="login-content w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            v-model="username"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            v-model="password"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { LOGIN_QUERY } from '../graphql/loginQuery';

export default {
  name: 'Login',
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();
    const store = useStore();

    const handleLogin = async () => {
      const { result, loading, error } = useQuery(LOGIN_QUERY, {
        username: username.value,
        password: password.value,
      });

      if (loading.value) return;

      if (error.value) {
        alert('An error occurred during login. Please try again.');
        console.error('Login error:', error.value);
        return;
      }

      const user = result.value.users[0];
      if (user) {
        store.commit('setUser', user); //  Vuex store to manage user state
        const role = user.role;
        if (role === 'Receptionist') {
          router.push('/reception-dashboard');
        } else if (role === 'healthcare-worker') {
          router.push('/healthcare-worker-dashboard');
        } else if (role === 'Doctor') {
          router.push('/doctor-dashboard');
        } else if (role === 'Admin') {
          router.push('/admin-dashboard');
        }
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    };

    return {
      username,
      password,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login-content {
  max-width: 400px;
}
.dynamic-height {
  height: 100vh;
}
</style>
