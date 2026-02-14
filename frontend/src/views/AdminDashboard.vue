<template>
  <div class="admin-dashboard h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
    </header>

    <!-- Tabs -->
    <div class="tabs-container border-b border-gray-300">
      <div class="tabs flex">
        <button
          :class="['tab', { 'tab-active': activeTab === 'dashboard' }]"
          @click="activeTab = 'dashboard'"
        >
          Dashboard
        </button>
        <button
          :class="['tab', { 'tab-active': activeTab === 'add-user' }]"
          @click="activeTab = 'add-user'"
        >
          Add User
        </button>
        <button
          :class="['tab', { 'tab-active': activeTab === 'manage-users' }]"
          @click="activeTab = 'manage-users'"
        >
          Manage Users
        </button>
        <button
          :class="['tab', { 'tab-active': activeTab === 'reports' }]"
          @click="activeTab = 'reports'"
        >
          Reports
        </button>
        <button
          :class="['tab', { 'tab-active': activeTab === 'settings' }]"
          @click="activeTab = 'settings'"
        >
          Settings
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="tab-content p-6">
      <!-- Dashboard Tab -->
      <div v-if="activeTab === 'dashboard'" class="bg-white rounded shadow-md p-6">
        <h2 class="text-3xl font-bold mb-4">Dashboard</h2>
        <p class="text-gray-700">Welcome to the Admin Dashboard. Use the tabs to navigate through the admin functionalities.</p>
        <!-- Add your dashboard content here -->
      </div>

      <!-- Add User Tab -->
      <div v-if="activeTab === 'add-user'" class="bg-white rounded shadow-md p-6 max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold mb-4">Add User</h2>
        <form @submit.prevent="createUser">
          <div class="mb-4">
            <label for="username" class="block text-gray-700">Username</label>
            <input
              id="username"
              v-model="newUser.username"
              class="w-full border-gray-300 rounded-md shadow-sm p-2"
              type="text"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-700">Password</label>
            <input
              id="password"
              v-model="newUser.password"
              class="w-full border-gray-300 rounded-md shadow-sm p-2"
              type="password"
              required
            />
          </div>
          <div class="mb-4">
            <label for="name" class="block text-gray-700">Name</label>
            <input
              id="name"
              v-model="newUser.name"
              class="w-full border-gray-300 rounded-md shadow-sm p-2"
              type="text"
            />
          </div>
          <div class="mb-4">
            <label for="role" class="block text-gray-700">Role</label>
            <select
              id="role"
              v-model="newUser.role"
              class="w-full border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add User
          </button>
        </form>
        <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
      </div>

      <!-- Manage Users Tab -->
      <div v-if="activeTab === 'manage-users'" class="bg-white rounded shadow-md p-6">
        <h2 class="text-3xl font-bold mb-4">Manage Users</h2>
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="px-6 py-2 text-gray-600">Name</th>
              <th class="px-6 py-2 text-gray-600">Username</th>
              <th class="px-6 py-2 text-gray-600">Role</th>
              <th class="px-6 py-2 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="whitespace-nowrap">
              <td class="px-6 py-4">{{ user.name }}</td>
              <td class="px-6 py-4">{{ user.username }}</td>
              <td class="px-6 py-4">{{ user.role }}</td>
              <td class="px-6 py-4 flex space-x-2">
                <button @click="viewUser(user)" class="text-blue-500 hover:text-blue-700">
                  <i class="fas fa-eye"></i>
                </button>
                <button @click="editUser(user)" class="text-yellow-500 hover:text-yellow-700">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deleteUser(user.id)" class="text-red-500 hover:text-red-700">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Reports Tab -->
      <div v-if="activeTab === 'reports'" class="bg-white rounded shadow-md p-6">
        <h2 class="text-3xl font-bold mb-4">Reports</h2>
        <p class="text-gray-700">Reports content goes here.</p>
        <!-- Add your reports content here -->
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'" class="bg-white rounded shadow-md p-6">
        <h2 class="text-3xl font-bold mb-4">Settings</h2>
        <p class="text-gray-700">Settings content goes here.</p>
        <!-- Add your settings content here -->
      </div>
    </div>

    <!-- View User Dialog -->
    <div v-if="showViewDialog" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white rounded shadow-md p-6 max-w-sm w-full">
        <h2 class="text-2xl font-bold mb-4">User Details</h2>
        <p><strong>Name:</strong> {{ selectedUser.name }}</p>
        <p><strong>Username:</strong> {{ selectedUser.username }}</p>
        <p><strong>Role:</strong> {{ selectedUser.role }}</p>
        <button @click="closeViewDialog" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  setup() {
    const activeTab = ref('dashboard');
    const newUser = ref({
      username: '',
      password: '',
      name: '',
      role: '',
      organization_id: null,
    });
    const users = ref([]);
    const organizationId = ref(null);
    const successMessage = ref('');
    const showViewDialog = ref(false);
    const selectedUser = ref({});

    const fetchUsers = async () => {
      try {
        const response = await axios.post('http://localhost:8080/v1/graphql', {
          query: `
            query {
              users {
                id
                username
                name
                role
              }
            }
          `,
        });
        users.value = response.data.data.users;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchOrganizationId = async () => {
      try {
        const response = await axios.post('http://localhost:8080/v1/graphql', {
          query: `
            query {
              organizations {
                id
              }
            }
          `,
        });
        organizationId.value = response.data.data.organizations[0].id;
        newUser.value.organization_id = organizationId.value;
      } catch (error) {
        console.error('Error fetching organization ID:', error);
      }
    };

    const createUser = async () => {
      try {
        await axios.post('http://localhost:8080/v1/graphql', {
          query: `
            mutation addUser($username: String!, $password: String!, $name: String, $role: String!, $organization_id: Int!) {
              insert_users(objects: {
                username: $username,
                password: $password,
                name: $name,
                role: $role,
                organization_id: $organization_id
              }) {
                affected_rows
              }
            }
          `,
          variables: newUser.value,
        });
        successMessage.value = 'User added successfully!';
        fetchUsers(); // Refresh the users list
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };

    const viewUser = (user) => {
      selectedUser.value = user;
      showViewDialog.value = true;
    };

    const closeViewDialog = () => {
      showViewDialog.value = false;
    };

    const editUser = (user) => {
      // Add edit user functionality here
    };

    const deleteUser = async (id) => {
      try {
        await axios.post('http://localhost:8080/v1/graphql', {
          query: `
            mutation deleteUser($id: Int!) {
              delete_users(where: {id: {_eq: $id}}) {
                affected_rows
              }
            }
          `,
          variables: { id },
        });
        fetchUsers(); // Refresh the users list
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

    onMounted(() => {
      fetchUsers();
      fetchOrganizationId();
    });

    return {
      activeTab,
      newUser,
      users,
      successMessage,
      showViewDialog,
      selectedUser,
      createUser,
      viewUser,
      closeViewDialog,
      editUser,
      deleteUser,
    };
  },
};
</script>

<style scoped>
.admin-dashboard {
  font-family: Arial, sans-serif;
}

.tabs-container {
  background-color: #f8f9fa;
}

.tabs {
  display: flex;
  justify-content: flex-start;
}

.tab {
  padding: 1rem 2rem;
  cursor: pointer;
}

.tab-active {
  border-bottom: 2px solid #3490dc;
  color: #3490dc;
  font-weight: bold;
}

.tab-content {
  flex-grow: 1;
  padding: 1rem;
}

input[type='text'],
input[type='password'],
select {
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
