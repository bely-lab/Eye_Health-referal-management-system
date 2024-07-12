<template>
  <div>
    <h2 class="text-xl font-bold mb-6">Billing</h2>

    <!-- Billing Summary -->
    <div class="mb-8">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full md:w-1/2 px-4 mb-4 md:mb-0">
          <div class="bg-white p-4 rounded-lg shadow">
            <p class="text-lg font-semibold mb-2">Billing Summary</p>
            <div class="grid grid-cols-2 gap-4">
              <p><strong>Total Patients:</strong> {{ patients.length }}</p>
              <p><strong>Total Appointments:</strong> {{ appointments.length }}</p>
              <p><strong>Total Billing Amount:</strong> {{ totalBillingAmount }}ETB</p>
              <!-- Additional summary details if needed -->
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-4">
          <!-- Add any other relevant summary or statistics -->
        </div>
      </div>
    </div>

    <!-- Billing Form -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4">Create Manual Billing</h3>
      <div class="bg-white p-4 rounded-lg shadow">
        <form @submit.prevent="submitBilling">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="patientName" class="block text-sm font-medium text-gray-700">Patient Name</label>
              <input type="text" id="patientName" v-model="newBilling.patientName" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            </div>
            <div>
              <label for="dateTime" class="block text-sm font-medium text-gray-700">Date & Time</label>
              <input type="datetime-local" id="dateTime" v-model="newBilling.dateTime" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            </div>
            <div>
              <label for="doctor" class="block text-sm font-medium text-gray-700">Doctor</label>
              <input type="text" id="doctor" v-model="newBilling.doctor" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            </div>
            <div>
              <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
              <input type="number" id="amount" v-model="newBilling.amount" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            </div>
          </div>
          <div class="mt-4">
            <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Record Billing
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Billing Details -->
    <div>
      <h3 class="text-lg font-semibold mb-4">Billing Details</h3>
      <div class="bg-white rounded-lg shadow">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="billing in billings" :key="billing.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ billing.patientName }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ billing.dateTime }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ billing.doctor }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ billing.amount.toFixed(2) }}</td>
            </tr>
            <!-- Show a message if there are no billings -->
            <tr v-if="billings.length === 0">
              <td class="px-6 py-4 whitespace-nowrap" colspan="4">No billing details available.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      patients: [], // Placeholder for patients list
      appointments: [], // Placeholder for appointments list
      billings: [], // Placeholder for billings list
      newBilling: { // Object to hold new billing form data
        patientName: '',
        dateTime: '',
        doctor: '',
        amount: ''
      }
    };
  },
  computed: {
    totalBillingAmount() {
      return this.appointments.reduce((total, appointment) => total + parseFloat(appointment.amount), 0).toFixed(2);
    },
  },
  methods: {
    submitBilling() {
      // Simulate adding new billing to the list
      this.billings.push({
        id: this.billings.length + 1,
        patientName: this.newBilling.patientName,
        dateTime: this.newBilling.dateTime,
        doctor: this.newBilling.doctor,
        amount: parseFloat(this.newBilling.amount).toFixed(2)
      });

      // Reset form fields after submission
      this.newBilling.patientName = '';
      this.newBilling.dateTime = '';
      this.newBilling.doctor = '';
      this.newBilling.amount = '';
    }
  }
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
