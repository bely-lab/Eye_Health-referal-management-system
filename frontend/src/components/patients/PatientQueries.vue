<template>
  <div>
    <h2 class="text-xl font-bold mb-6">Patient Queries</h2>

    <!-- Query Form -->
    <div>
      <h3 class="text-lg font-semibold mb-4">Query Patient Records</h3>
      <form @submit.prevent="queryPatients">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="query_name" class="block text-sm font-medium text-gray-700">Patient Name</label>
            <input id="query_name" v-model="query.patientName" type="text" class="input-field mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
          </div>
          <div>
            <label for="query_date" class="block text-sm font-medium text-gray-700">Date of Appointment</label>
            <input id="query_date" v-model="query.appointmentDate" type="date" class="input-field mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded-md">Search</button>
          <button type="button" class="ml-4 text-gray-600">Reset</button>
        </div>
      </form>
    </div>

    <!-- Query Results -->
    <div v-if="queryResults.length > 0" class="mt-6">
      <h3 class="text-lg font-semibold mb-4">Query Results</h3>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="result in queryResults" :key="result.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ result.patientName }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ result.dateTime }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ result.doctor }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ result.notes }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- No Results Message -->
    <div v-else-if="queryExecuted" class="mt-6">
      <p>No results found.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        patientName: '',
        appointmentDate: '',
      },
      queryResults: [], // Placeholder for query results
      queryExecuted: false,
    };
  },
  methods: {
    queryPatients() {
      // Placeholder logic to query patient records based on form inputs
      console.log('Querying patients with:', this.query);
      // Replace with actual API call or data processing logic
      // Example: fetch results from backend based on query parameters
      this.queryResults = [
        { id: '1', patientName: 'John Doe', dateTime: '2024-07-15 09:00 AM', doctor: 'Dr. Smith', notes: 'Routine check-up' },
        { id: '2', patientName: 'Jane Smith', dateTime: '2024-07-16 10:30 AM', doctor: 'Dr. Brown', notes: 'Follow-up consultation' },
        // Add more sample results as needed
      ];
      this.queryExecuted = true;
    },
  },
};
</script>

<style scoped>
.input-field {
  padding: 10px;
  font-size: 16px;
}
</style>
