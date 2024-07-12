<template>
  <div class="min-h-screen ">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold">Receptionist Dashboard</h1>
          </div>
          <div class="hidden sm:flex sm:ml-6 sm:space-x-4">
            <!-- Navigation Links -->
            <button @click="activeTab = 'patients'" :class="{ 'text-indigo-600 border-b-2 border-indigo-600': activeTab === 'patients', 'text-gray-600': activeTab !== 'patients' }" class="inline-flex items-center px-2 pt-1 text-sm font-medium">
              Patients
            </button>
            <button @click="activeTab = 'appointments'" :class="{ 'text-indigo-600 border-b-2 border-indigo-600': activeTab === 'appointments', 'text-gray-600': activeTab !== 'appointments' }" class="inline-flex items-center px-2 pt-1 text-sm font-medium">
              Appointments
            </button>
            <button @click="activeTab = 'billing'" :class="{ 'text-indigo-600 border-b-2 border-indigo-600': activeTab === 'billing', 'text-gray-600': activeTab !== 'billing' }" class="inline-flex items-center px-2 pt-1 text-sm font-medium">
              Billing
            </button>
            <button @click="activeTab = 'queries'" :class="{ 'text-indigo-600 border-b-2 border-indigo-600': activeTab === 'queries', 'text-gray-600': activeTab !== 'queries' }" class="inline-flex items-center px-2 pt-1 text-sm font-medium">
              Patient Queries
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="py-8 px-4">
      <!-- Conditional Rendering based on activeTab -->
      <div v-if="activeTab === 'patients'">
        <!-- Patients Management Content -->
        <PatientsList />
      </div>

      <Appointments v-if="activeTab === 'appointments'" />
      <Billing v-if="activeTab === 'billing'" />
      <PatientQueries v-if="activeTab === 'queries'" />
    </main>
  </div>
</template>

<script>
// Import necessary components
import PatientsList from '../components/patients/PatientList.vue';
import Appointments from '../components/patients/Appointments.vue';
import Billing from '../components/patients/Billing.vue';
import PatientQueries from '../components/patients/PatientQueries.vue';

export default {
  name: 'ReceptionistDashboard',
  components: {
    PatientsList,
    Appointments,
    Billing,
    PatientQueries,
  },
  data() {
    return {
      activeTab: 'patients', // Default active tab
    };
  },
};
</script>

<style scoped>
/* Add scoped styles here */
button {
  transition: all 0.3s ease; /* Smooth transition for hover and active states */
}

button:hover {
  color: #4a5568; /* Dark gray on hover */
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.bg-white {
  background-color: #ffffff;
}

.text-gray-600 {
  color: #4a5568;
}

.text-indigo-600 {
  color: #5a67d8;
}

.border-indigo-600 {
  border-color: #5a67d8;
}
</style>
