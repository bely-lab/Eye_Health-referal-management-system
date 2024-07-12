<template>
  <div class="healthcare-worker-dashboard min-h-screen bg-white">
    <nav class="bg--600 text- shadow mb-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold">Healthcare Worker Dashboard</h1>
          </div>
          <div class="hidden sm:flex sm:ml-6 sm:space-x-4">
            <button @click="activeTab = 'patients'" :class="{ 'border-b-2 border-indigo-600': activeTab === 'patients' }" class="inline-flex items-center px-2 pt-1 text-sm font-medium">
              Patients
            </button>
            <button @click="activeTab = 'appointments'" :class="{ 'border-b-2 border-indigo-600': activeTab === 'appointments' }" class="inline-flex items-center px-2 pt-1 text-sm font-medium">
              Appointments
            </button>
            <button @click="activeTab = 'records'" :class="{ 'border-b-2 border-indigo-600': activeTab === 'records' }" class="inline-flex items-center px-2 pt-1 text-sm font-medium">
              Medical Records
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="py-8 px-4 max-w-7xl mx-auto">
      <div v-if="activeTab === 'patients'">
        <h2 class="text-lg font-semibold mb-4">Patient List</h2>
        <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 border-b text-left">Card No</th>
              <th class="py-2 px-4 border-b text-left">Full Name</th>
              <th class="py-2 px-4 border-b text-left">Gender</th>
              <th class="py-2 px-4 border-b text-left">Contact Info</th>
              <th class="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in patients" :key="patient.id" class="hover:bg-gray-50 cursor-pointer" @click="selectPatient(patient)">
              <td class="py-2 px-4 border-b">{{ patient.card_no }}</td>
               <td class="py-2 px-4 border-b">{{ patient.first_name }} {{ patient.middle_name }} {{ patient.last_name }}</td>
              <td class="py-2 px-4 border-b">{{ patient.gender }}</td>
              <td class="py-2 px-4 border-b">{{ patient.phone_number }}</td>
              <div class="mt-4">
          <button @click="editPatient(selectedPatient)" class="bg-indigo-500 text-white px-4 py-2 rounded-md">Edit</button>
          <button @click="deletePatient(selectedPatient)" class="ml-4 bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
        </div>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="selectedPatient" class="mt-6">
        <div class="bg-white rounded-lg p-6 shadow-sm mb-6 border border-gray-200">
          <h3 class="text-lg font-semibold mb-4">Patient Details</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Card Number:</strong> {{ selectedPatient.card_no }}</p>
              <p><strong>First Name:</strong> {{ selectedPatient.first_name }}</p>
              <p><strong>Middle Name:</strong> {{ selectedPatient.middle_name }}</p>
              <p><strong>Last Name:</strong> {{ selectedPatient.last_name }}</p>
              <p><strong>Date of Birth:</strong> {{ selectedPatient.date_of_birth }}</p>
              <p><strong>Gender:</strong> {{ selectedPatient.gender }}</p>
              <p><strong>Contact Info:</strong> {{ selectedPatient.phone_number }}</p>
            </div>
            <div>
              <p><strong>Address:</strong> {{ selectedPatient.address }}, kebele{{ selectedPatient.kebele }}</p>
          
              <p><strong>Medical History:</strong> {{ selectedPatient.medical_history }}</p>
            </div>
          </div>
        </div>
        <RecordAssessment :patient="selectedPatient" />
      </div>

      <Appointments v-if="activeTab === 'appointments'" />
      <MedicalRecords v-if="activeTab === 'records'" />
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import RecordAssessment from './RecordAssesment.vue';
import Appointments from '../components/patients/Appointments.vue';
import MedicalRecords from '../components/patients/Appointments.vue';

export default {
  name: 'HealthcareWorkerDashboard',
  components: {
    RecordAssessment,
    Appointments,
    MedicalRecords,
  },
  data() {
    return {
      patients: [],
      activeTab: 'patients',
      selectedPatient: null,
    };
  },
  methods: {
    async fetchPatients() {
      try {
        const response = await axios.post('http://localhost:5000/api/patients');
        this.patients = response.data;
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    },
    selectPatient(patient) {
      this.selectedPatient = patient;
      this.activeTab = 'patients';  // Ensure the tab doesn't change when selecting a patient
    },
  },
  mounted() {
    this.fetchPatients();
  },
};
</script>

<style scoped>
.healthcare-worker-dashboard {
  background-color: #ffffff;
  color: #2d3748;
}

.min-h-screen {
  min-height: 100vh;
}

.bg-white {
  background-color: #ffffff;
}

.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.border {
  border-width: 1px;
}

.border-gray-200 {
  border-color: #e5e7eb;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.text-left {
  text-align: left;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.text-lg {
  font-size: 1.125rem;
}

.font-semibold {
  font-weight: 600;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-4 {
  gap: 1rem;
}

.border-b {
  border-bottom-width: 1px;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
