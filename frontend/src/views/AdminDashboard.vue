<template>
    <div class="admin-dashboard flex flex-col min-h-screen">
      <!-- Header -->
      <header class=" text-white p-4">
        <div class="container mx-auto">
          <h1 class="text-xl font-bold">Admin Dashboard</h1>
        </div>
      </header>
  
      <!-- Tabs for navigation -->
      <div class="bg p-4 shadow-md">
        <div class="container mx-auto flex space-x-4">
          <button @click="selectedTab = 'newUser'" :class="tabClass('newUser')">New User</button>
          <button @click="selectedTab = 'allUsers'" :class="tabClass('allUsers')">All Users</button>
          <button @click="selectedTab = 'settings'" :class="tabClass('settings')">Settings</button>
        </div>
      </div>
  
      <!-- Main content area -->
      <main class="container mx-auto p-4 flex-grow">
        <div v-if="selectedTab === 'newUser'">
          <NewUserForm />
        </div>
        <div v-else-if="selectedTab === 'allUsers'">
          <AllUsers />
        </div>
        <div v-else-if="selectedTab === 'settings'">
          <Settings />
        </div>
      </main>
  
      <!-- Footer -->
      
    </div>
  </template>
  
  <script>
  import NewUserForm from './NewUserForm.vue';
  import AllUsers from './AllUsers.vue';
  import Settings from './Settings.vue';
  
  export default {
    name: 'AdminDashboard',
    components: {
      NewUserForm,
      AllUsers,
      Settings,
    },
    data() {
      return {
        selectedTab: 'newUser',
      };
    },
    methods: {
      tabClass(tab) {
        return this.selectedTab === tab
          ? 'text-blue-700 border-b-2 border-blue-700'
          : 'text-gray-600 hover:text-blue-700';
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  