<template>
  <div class="app-container flex flex-col min-h-screen">
    <!-- Navbar -->
    <header class="bg-blue-500 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Eye Care System Super Admin Page</h1>
        <div v-if="isLoggedIn">
          <span class="mr-4">{{ userRole}}</span>
          <button @click="logout" class="bg-white text-blue-900 px-3 py-1 rounded">
           <b> Logout</b>
          </button>
        </div>
      </div>
    </header>

    <!-- Main content area -->
    <main class="container mx-auto p-4 flex-grow bg-gray-50">
      <div class="main flex-grow-1 flex justify-center items-center">
        <div class="main-content max-w-6xl w-full p-4">
          <router-view></router-view>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-blue-500 text-white p-4">
      <div class="container mx-auto text-center">
        <p>&copy; 2024 All rights reserved. by <a href="https://eyuethiopia.org" class="text-white underline" target="blank">Eyu-Ethiopia</a></p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoggedIn', 'userName']),
  },
  methods: {
    ...mapActions(['logout']),
  },
  watch: {
    isLoggedIn(newValue) {
      if (!newValue) {
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  background-color: #f9fafb; /* Very light gray background */
}

.main-content-wrapper {
  height: calc(100vh - 9rem); /* 9rem is the combined height of header and footer */
  overflow-y: auto; /* Enable scroll if content exceeds viewport height */
}

.main-content {
  background-color: #ffffff; /* White background for main content */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.container {
  max-width: 1280px; /* Limit maximum width of content */
}

@media (max-width: 1024px) {
  .container {
    padding: 0 1rem; /* Add padding for smaller screens */
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem; /* Adjust padding for even smaller screens */
  }
}


.logout-button {
  background-color: ; /* Matching the header/footer color */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
