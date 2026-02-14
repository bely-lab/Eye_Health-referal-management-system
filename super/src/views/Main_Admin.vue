<template>
  <div class="flex flex-col h-screen">
    <!-- Navigation Tabs -->
    <div class="bg-gray-800 text-white flex">
      <button @click="activeTab = 'dashboard'" class="p-4 flex-1 text-center rounded hover:bg-gray-700" :class="{ 'bg-gray-700': activeTab === 'dashboard' }">Dashboard</button>
      <button @click="activeTab = 'addOrganization'" class="p-4 flex-1 text-center rounded hover:bg-gray-700" :class="{ 'bg-gray-700': activeTab === 'addOrganization' }">Add Organization</button>
      <button @click="activeTab = 'manageOrganizations'" class="p-4 flex-1 text-center rounded hover:bg-gray-700" :class="{ 'bg-gray-700': activeTab === 'manageOrganizations' }">Manage Organizations</button>
      <button @click="activeTab = 'settings'" class="p-4 flex-1 text-center rounded hover:bg-gray-700" :class="{ 'bg-gray-700': activeTab === 'settings' }">Settings</button>
      <button @click="activeTab = 'reports'" class="p-4 flex-1 text-center rounded hover:bg-gray-700" :class="{ 'bg-gray-700': activeTab === 'reports' }">Reports</button>
    </div>

    <!-- Main Content -->
    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div v-if="activeTab === 'dashboard'" class="bg-white p-8 rounded shadow-lg max-w-4xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6">Dashboard</h2>
        <!-- Dashboard content goes here -->
        <p>Welcome to the dashboard!</p>
      </div>

      <div v-if="activeTab === 'addOrganization'" class="bg-white p-8 rounded shadow-lg max-w-4xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6">Add Organization</h2>
        <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="mb-4">
            <label class="block mb-1 font-semibold" for="name">Name</label>
            <input v-model="form.name" id="name" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-semibold" for="type">Type</label>
            <select v-model="form.type" id="type" class="w-full p-2 border rounded">
              <option value="Primary Care">Primary Care</option>
              <option value="Secondary Care">Secondary Care</option>
              <option value="Tertiary Care">Tertiary Care</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-semibold" for="location">Location</label>
            <input v-model="form.location" id="location" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-semibold" for="contact_number">Contact Number</label>
            <input v-model="form.contact_number" id="contact_number" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-semibold" for="email">Email</label>
            <input v-model="form.email" id="email" type="email" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-semibold" for="specializations">Specializations</label>
            <input v-model="form.specializations" id="specializations" class="w-full p-2 border rounded" />
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Organization</button>
        </form>
        <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
        <p v-if="success" class="text-green-500 mt-4">{{ success }}</p>
      </div>

      <div v-if="activeTab === 'manageOrganizations'" class="bg-white p-8 rounded shadow-lg max-w-4xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6">Manage Organizations</h2>
        <table class="w-full table-auto border-collapse">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-2 border">Name</th>
              <th class="p-2 border">Type</th>
              <th class="p-2 border">Location</th>
              <th class="p-2 border">Contact Number</th>
              <th class="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="organization in organizations" :key="organization.id">
              <td class="p-2 border">{{ organization.name }}</td>
              <td class="p-2 border">{{ organization.type }}</td>
              <td class="p-2 border">{{ organization.location }}</td>
              <td class="p-2 border">{{ organization.contact_number }}</td>
              <td class="p-2 border flex space-x-2">
                <button @click="viewDetails(organization)" class="text-blue-500 hover:underline">Details</button>
                <button @click="editOrganization(organization)" class="text-yellow-500 hover:underline">Edit</button>
                <button @click="deleteOrganization(organization.id)" class="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="activeTab === 'settings'" class="bg-white p-8 rounded shadow-lg max-w-4xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6">Settings</h2>
        <!-- Settings form or content goes here -->
        <p>Settings content goes here...</p>
      </div>

      <div v-if="activeTab === 'reports'" class="bg-white p-8 rounded shadow-lg max-w-4xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6">Reports</h2>
        <!-- Reports form or content goes here -->
        <p>Reports content goes here...</p>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@vue/apollo-composable';
import axios from 'axios';

const INSERT_ORGANIZATION = gql`
  mutation InsertOrganization($object: organizations_insert_input!) {
    insert_organizations(objects: [$object]) {
      returning {
        id
        name
      }
    }
  }
`;

const INSERT_USER = gql`
  mutation InsertUser($object: users_insert_input!) {
    insert_users(objects: [$object]) {
      returning {
        id
        username
      }
    }
  }
`;

const GET_ORGANIZATIONS = gql`
  query GetOrganizations {
    organizations {
      id
      name
      type
      location
      contact_number
      email
      specializations
    }
  }
`;

export default {
  setup() {
    const activeTab = ref('dashboard');
    const form = ref({
      name: '',
      type: 'Primary Care',
      location: '',
      contact_number: '',
      email: '',
      specializations: ''
    });

    const error = ref(null);
    const success = ref(null);
    const organizations = ref([]);
    const { result } = useQuery(GET_ORGANIZATIONS);
    const { mutate: insertOrganization } = useMutation(INSERT_ORGANIZATION);
    const { mutate: insertUser } = useMutation(INSERT_USER);

    onMounted(() => {
      if (result.value) {
        organizations.value = result.value.organizations;
      }
    });

    const generateCredentials = (name) => {
      const username = name.replace(/\s+/g, '').toLowerCase() + '_admin';
      const password = Math.random().toString(36).slice(-8);
      return { username, password };
    };

    const sendEmail = async (email, username, password) => {
      try {
        await axios.post('http://localhost:5000/send-email', {
          to: email,
          subject: 'Your Credentials at EEye care',
          text: `Username: ${username}\nPassword: ${password}`
        });
      } catch (err) {
        console.error('Failed to send email:', err);
      }
    };

    const submitForm = async () => {
      const { username, password } = generateCredentials(form.value.name);
      const organizationInput = {
        name: form.value.name,
        type: form.value.type,
        location: form.value.location,
        contact_number: form.value.contact_number,
        email: form.value.email,
        specializations: form.value.specializations
      };

      try {
        // Insert organization
        const { data: organizationData } = await insertOrganization({ object: organizationInput });
        console.log('Organization added:', organizationData);
        const organizationId = organizationData.insert_organizations.returning[0].id;

        // Insert user with the organization ID
        const userInput = {
          username,
          password,
          role: 'Admin',
          organization_id: organizationId
        };
        const { data: userData } = await insertUser({ object: userInput });
        console.log('User added:', userData);

        // Send email
        await sendEmail(form.value.email, username, password);

        success.value = 'Organization added and email sent successfully';
        error.value = null;

        organizations.value.push({
          id: organizationId,
          name: form.value.name,
          type: form.value.type,
          location: form.value.location,
          contact_number: form.value.contact_number,
          email: form.value.email,
          specializations: form.value.specializations
        });

        form.value.name = '';
        form.value.type = 'Primary Care';
        form.value.location = '';
        form.value.contact_number = '';
        form.value.email = '';
        form.value.specializations = '';
      } catch (err) {
        console.error('Error details:', err);
        error.value = 'Failed to add organization and send email';
        success.value = null;
      }
    };

    return {
      activeTab,
      form,
      error,
      success,
      organizations,
      submitForm,
      generateCredentials,
      sendEmail
    };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
