<!-- src/components/Login.vue -->
<template>
  <div class="login-container flex items-center justify-center min-h-screen bg-gray-100">
    <form @submit.prevent="login" class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <div class="input-group mb-4">
        <input v-model="username" type="text" placeholder="Username" required class="w-full p-2 border border-gray-300 rounded" />
      </div>
      <div class="input-group mb-4">
        <input v-model="password" type="password" placeholder="Password" required class="w-full p-2 border border-gray-300 rounded" />
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
      <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const LOGIN_QUERY = gql`
  query loginSuperAdmin($username: String!, $password: String!) {
    superadmins(where: { username: { _eq: $username }, password: { _eq: $password } }) {
      id
      username
      name
    }
  }
`;

export default {
  name: 'Login',
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();
    const store = useStore();

    const login = async () => {
      try {
        const { onResult, onError } = useQuery(LOGIN_QUERY, {
          username: username.value,
          password: password.value,
        });

        onResult((result) => {
          if (result.data.superadmins.length > 0) {
            handleLoginSuccess(result.data.superadmins[0]);
          } else {
            handleLoginFailure();
          }
        });

        onError((err) => {
          throw new Error(err.message);
        });
      } catch (err) {
        error.value = `An error occurred: ${err.message}`;
        console.error(err);
      }
    };

    const handleLoginSuccess = (superadmin) => {
      console.log('Login successful', superadmin);
      store.dispatch('login', 'superadmin'); // Store the user role in Vuex
      router.push('/aadmin'); // Redirect to superadmin dashboard
    };

    const handleLoginFailure = () => {
      error.value = 'Invalid username or password';
    };

    return {
      username,
      password,
      login,
      error,
    };
  },
};
</script>

<style scoped>
.login-container {
  background-color: #f9fafb;
}

.input-group input {
  padding: 12px;
}

button {
  background-color: #3490dc;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2779bd;
}
</style>
