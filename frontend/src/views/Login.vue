<!-- src/views/Login.vue -->
<template>
  <div class="login-container flex items-center justify-center  ">
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
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      const credentials = {
        username: this.username,
        password: this.password,
      };
      const success = await this.login(credentials);
      if (success) {
        const role = this.$store.getters.userRole;
        if (role === 'Reception') {
          this.$router.push('/reception-dashboard');
        } else if (role === 'healthcare-worker') {
          this.$router.push('/healthcare-worker-dashboard');
        } else if (role === 'doctor') {
          this.$router.push('/doctor-dashboard');
        } else if (role === 'Admin') {
          this.$router.push('/admin-dashboard');
        }
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    },
  },
};
</script>

<style scoped>
/* .login-container {
  background-color: // Light blue background for login page 
} */
.login-content {
  max-width: 400px;
}
.dynamic-height {
  height: 100vh;
}
</style>
