<template>
  <main class="py-8 px-4 max-w-7xl mx-auto">
    <!-- Dashboard Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold">Doctor Dashboard</h2>
      <!-- Notification Bell for Referrals -->
      <div class="notification-bell">
      <router-link to="/referral-response">
        <i class="fas fa-bell"></i>
        <!-- Add a badge or count for new referrals if needed -->
      </router-link
      <div class="relative">
        <router-link to="/referral-response">  <button @click="showReferralList = !showReferralList" class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19c1.657 0 3-1.343 3-3H9c0 1.657 1.343 3 3 3zm7-9v5a7 7 0 1 1-14 0v-5m2-2h6M7 13h10a4 4 0 1 1-8 0z" />
          </svg>Referals
          <!-- Notification Count -->
          <div v-if="newReferralsCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
            {{ newReferralsCount }}
          </div>
        </button> </router-link
        <!-- Referral List Dropdown -->
        <div v-if="showReferralList" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
          <div v-if="referrals.length === 0" class="px-4 py-2">No new referrals</div>
          <ul v-else class="divide-y divide-gray-200">
            <li v-for="referral in referrals" :key="referral.id" class="px-4 py-2 cursor-pointer hover:bg-gray-100">
              <div>{{ referral.patient_name }}</div>
              <div class="text-xs text-gray-500">{{ referral.referral_date }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Patient List -->
    <div>
      <h2 class="text-lg font-semibold mb-4">Patient List</h2>
      <!-- Notification for new referrals -->
      <!-- <div class="mb-4" v-if="newReferralsCount > 0">
       <p class="bg-blue-100 text-blue-900 px-4 py-2 rounded-md">
          New Referrals: {{ newReferralsCount }}
        </p>
      </div> -->
      <!-- Patient Table -->
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-2 px-4 border-b text-left">Card No</th>
            <th class="py-2 px-4 border-b text-left">Full Name</th>
            
            <th class="py-2 px-4 border-b text-left">Gender</th>
            <th class="py-2 px-4 border-b text-left">Contact Info</th>
            <th class="py-2 px-4 border-b text-left">Initial Assessment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id" class="hover:bg-gray-50 cursor-pointer">
            <td class="py-2 px-4 border-b">{{ patient.card_no }}</td>
            <td class="py-2 px-4 border-b">{{ patient.first_name }} {{ patient.middle_name }} {{ patient.last_name }}</td>
      
            <td class="py-2 px-4 border-b">{{ patient.gender }}</td>
            <td class="py-2 px-4 border-b">{{ patient.phone_number}}</td>
            <td class="py-2 px-4 border-b">By Abeba</td>
            <!-- <td class="py-2 px-4 border-b">
              <span v-if="patient.receptionist_assessment">Receptionist</span>
              <span v-if="patient.nurse_assessment">Nurse</span>
            </td> -->
            <td class="py-2 px-4 border-b">
              <button @click="selectPatient(patient)">View Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Selected Patient Details and Tabs -->
    <div v-if="selectedPatient">
      <div class="bg-white rounded-lg p-6 shadow-sm mb-6 border border-gray-200">
        <h3 class="text-lg font-semibold mb-4">Patient Details</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Carf Number:</strong> {{ selectedPatient.card_no }}</p>
            <p><strong>First Name:</strong> {{ selectedPatient.first_name }} {{ selectedPatient.middle_name }} {{ selectedPatient.last_name }}</p>
        
            <p><strong>Date of Birth:</strong> {{ selectedPatient.date_of_birth }}</p>
            <p><strong>Gender:</strong> {{ selectedPatient.gender }}</p>
            <p><strong>Contact Info:</strong> {{ selectedPatient.contact_info }}</p>
            <p><strong>Address:</strong> {{ selectedPatient.address }}, kebele{{ selectedPatient.kebele }}</p>
          
          </div>
          <div v-for="ast in assesment" :key="ast.id" class="hover:bg-gray-50 cursor-pointer">
            <p><strong>Chief compliant:</strong> {{ ast.cc }}</p>
            <p><strong>Medical History:</strong> {{ ast.sh }}</p>
            <p><strong>VA OD:</strong> {{ ast.vaod }}</p>
            <p><strong>VA OS:</strong> {{ ast.vaos }}</p>
            <p><strong>Treatment:</strong> {{ ast.treatmnet }}</p>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <nav class="tabs-navigation mb-6">
        <ul>
          <li @click="activeTab = 'ros'" :class="{ 'active': activeTab === 'ros' }">ROS</li>
          <li @click="activeTab = 'history'" :class="{ 'active': activeTab === 'history' }">History</li>
          <li @click="activeTab = 'exam'" :class="{ 'active': activeTab === 'exam' }">PExamination</li>
          <li @click="activeTab = 'invest'" :class="{ 'active': activeTab === 'invest' }">Investigation</li>
          <li @click="activeTab = 'assessment'" :class="{ 'active': activeTab === 'assessment' }">Assessment</li>
          <li @click="activeTab = 'plan'" :class="{ 'active': activeTab === 'plan' }">Treatment Plan</li>
           <li @click="activeTab = 'followup'" :class="{ 'active': activeTab === 'followup' }">Follow-Up</li>
          <li @click="activeTab = 'docs'" :class="{ 'active': activeTab === 'docs' }">Docs</li>
          <li @click="activeTab = 'referral'" :class="{ 'active': activeTab === 'referral' }">Refer</li>
        </ul>
      </nav>

      <!-- Tab Contents -->
      <div class="tab-content">
        <div v-if="activeTab === 'ros'">
          <h2>Review of Systems (ROS)</h2>
          <form>
          <div class="form-group">
            <label for="cardiovascular">Cardiovascular</label>
            <textarea id="cardiovascular" v-model="ros.cardiovascular" class="input"></textarea>
          </div>
          <div class="form-group">
            <label for="respiratory">Respiratory</label>
            <textarea id="respiratory" v-model="ros.respiratory" class="input"></textarea>
          </div>
          <div class="form-group">
            <label for="gastrointestinal">Gastrointestinal</label>
            <textarea id="gastrointestinal" v-model="ros.gastrointestinal" class="input"></textarea>
          </div>
          <!-- Add more ROS fields as needed -->
        </form>
          <!-- ROS form here -->
          <form @submit.prevent="submitROS">
            <div class="form-group">
              <label for="rosDetails">ROS Details</label>
              <textarea id="rosDetails" v-model="ros.details" class="input" required></textarea>
            </div>
            <button type="submit" class="button">Submit ROS</button>
          </form>
        </div>
        <div v-if="activeTab === 'history'">
          <h2>Detailed History</h2>
          <!-- History form here -->
          <form>
          <div class="form-group">
            <label for="pmh">Past Medical History (PMH)</label>
            <textarea id="pmh" v-model="history.pmh" class="input"></textarea>
          </div>
          <div class="form-group">
            <label for="fh">Family History (FH)</label>
            <textarea id="fh" v-model="history.fh" class="input"></textarea>
          </div>
          <div class="form-group">
            <label for="sh">Social History (SH)</label>
            <textarea id="sh" v-model="history.sh" class="input"></textarea>
          </div>
          <!-- Add more history fields as needed -->
          <button type="submit" class="button">Submit History</button>
        </form>
        </div>
        <div v-if="activeTab === 'exam'">
          <h2>Physical Examination</h2>
          <!-- Exam form here -->
          <form>
          <div class="form-group">
            <label for="visualAcuity">Visual Acuity (VA)</label>
            <input id="visualAcuity" type="text" v-model="exam.visualAcuity" class="input">
          </div>
          <div class="form-group">
            <label for="slitLamp">Slit Lamp Examination</label>
            <input id="slitLamp" type="text" v-model="exam.slitLamp" class="input">
          </div>
          <div class="form-group">
            <label for="fundusExam">Fundus Examination</label>
            <input id="fundusExam" type="text" v-model="exam.fundusExam" class="input">
          </div>
          <button type="submit" class="button">Submit Examination</button>
          <!-- Add more exam fields as needed -->
        </form>
        </div>
        <div v-if="activeTab === 'invest'">
          <h2>Investigations</h2>
          <!-- Invest form here -->
          <form>
          <div class="form-group">
            <label for="octScan">OCT Scan</label>
            <input id="octScan" type="text" v-model="invest.octScan" class="input">
          </div>
          <div class="form-group">
            <label for="fundusPhoto">Fundus Photography</label>
            <input id="fundusPhoto" type="text" v-model="invest.fundusPhoto" class="input">
          </div>
          <div class="form-group">
            <label for="visualField">Visual Field Testing</label>
            <input id="visualField" type="text" v-model="invest.visualField" class="input">
          </div>

          <button type="submit" class="button">Submit Investigation</button>
        
          <!-- Add more investigation fields as needed -->
        </form>
         
        </div>
        <div v-if="activeTab === 'assessment'">
          <h2>Assessment</h2>
          <!-- Assessment form here -->
          <form>
          <div class="form-group">
            <label for="diagnosis">Diagnosis</label>
            <textarea id="diagnosis" v-model="assessment.diagnosis" class="input"></textarea>
          </div>
          <div class="form-group">
            <label for="clinicalFindings">Clinical Findings</label>
            <textarea id="clinicalFindings" v-model="assessment.clinicalFindings" class="input"></textarea>
          </div>
          <div class="form-group">
            <label for="prognosis">Prognosis</label>
            <textarea id="prognosis" v-model="assessment.prognosis" class="input"></textarea>
          </div>
          <!-- Add more assessment fields as needed -->
            <button type="submit" class="button">Submit Assessment</button>
          </form>
        </div>
        <div v-if="activeTab === 'plan'">
          <h2>Management Plan</h2>
          <!-- Plan form here -->
          <form>
          <div class="form-group">
            <label for="medication">Medication</label>
            <textarea id="medication" v-model="plan.medication" class="input"></textarea>
          </div>
          <div class="form-group">
            <label for="surgery">Surgical Intervention</label>
            <textarea id="surgery" v-model="plan.surgery" class="input"></textarea>
          </div>
          <div class="form-group">
            <label for="therapy">Therapeutic Procedures</label>
            <textarea id="therapy" v-model="plan.therapy" class="input"></textarea>
          </div>
          <!-- Add more plan fields as needed -->
    
            <button type="submit" class="button">Submit Plan</button>
          </form>
        </div>
        <div v-if="activeTab === 'education'">
          <h2>Patient Education</h2>
          <!-- Education form here -->
          <form @submit.prevent="submitEducation">
            <div class="form-group">
              <label for="educationDetails">Education Details</label>
              <textarea id="educationDetails" v-model="education.details" class="input" required></textarea>
            </div>
            <button type="submit" class="button">Submit Education</button>
          </form>
        </div>
        <div v-if="activeTab === 'followup'">
          <h2>Follow-Up Plan</h2>
          <!-- Follow-Up form here -->
          <form @submit.prevent="submitFollowUp">
            
            <div class="form-group">
              <label for="followupDetails">Follow-Up Appointment Schedule</label>
              <textarea id="followupDetails" v-model="followup.details" class="input" required></textarea>
            </div>
            <div class="form-group">
              <label for="followupDetails">Monitoring Programs</label>
              <textarea id="followupDetails" v-model="followup.details" class="input" required></textarea>
            </div>
            <div class="form-group">
              <label for="followupDetails">Test Scheduling</label>
              <textarea id="followupDetails" v-model="followup.details" class="input" required></textarea>
            </div>
            <div class="form-group">
              <label for="followupDetails">Follow-Up Details</label>
              <textarea id="followupDetails" v-model="followup.details" class="input" required></textarea>
            </div>
            <!-- <div class="form-group">
            <label for="followUpSchedule">Follow-Up Appointment Schedule</label>
            <textarea id="followUpSchedule" v-model="followUp.followUpSchedule" class="input"></textarea>
          </div> -->
            <button type="submit" class="button">Submit Follow-Up</button>
          </form>
        </div>
        <div v-if="activeTab === 'docs'">
          <h2>Documentation</h2>
          <!-- Docs form here -->
          <form>
          <div class="form-group">
            <label for="medicalHistory">Medical History Documentation</label>
            <textarea id="medicalHistory" v-model="docs.medicalHistory" class="input"></textarea>
          </div>
          <div class="form-group">
            <label for="assessmentNotes">Assessment Notes</label>
            <textarea id="assessmentNotes" v-model="docs.assessmentNotes" class="input"></textarea>
          </div>
          <div class="form-group">
            <label for="planOfCare">Plan of Care Documentation</label>
            <textarea id="planOfCare" v-model="docs.planOfCare" class="input"></textarea>
          </div>
          <!-- Add more documentation fields as needed -->
        
            <button type="submit" class="button">Submit Docs</button>
          </form>
        </div>
        <div v-if="activeTab === 'referral'">
          <h2>Referral Management</h2>
          <!-- Referral form here -->
          <form @submit.prevent="submitReferral">
            <div class="form-group">
              <label for="referralTo">Refer To:</label>
              <select id="referralTo" v-model="referral.to" class="input" required>
              <option value="male">FelegeHiwot</option>
              <option value="female">Tibebeghion</option>
              <option value="other">Alert Specialized Hospital</option>
              <option value="other">Amen Specialized Hospital</option>
              <option value="other">Dr. Abdu eye clinic</option>
            </select>
                </div>
            <div class="form-group">
              <label for="referralDetails">Reason for Referral</label>
              <input type="text" id="referralreason" v-model="referral.reason" class="input" required>
          
                 </div>
            <div class="form-group">
              <label for="referralDetails">Referral Details:</label>
              <textarea id="referralDetails" v-model="referral.details" class="input" required></textarea>
            </div>
            <button type="submit" class="button">Submit Referral</button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      patients: [], // Array of patients
      assesment: [], // Array of patients
      selectedPatient: null, // Currently selected patient details
      newReferralsCount: 3, // Example: Number of new referrals
      showReferralList: false, // Controls the display of referral list dropdown
      referrals: [], // Array of referral objects
      activeTab: 'ros', // Active tab identifier

      // Data for forms
      ros: {
        details: ''
      },
      history: {
        details: ''
      },
      exam: {
        details: ''
      },
      invest: {
        details: ''
      },
      assessment: {
        details: ''
      },
      plan: {
        details: ''
      },
      education: {
        details: ''
      },
      followup: {
        details: ''
      },
      docs: {
        details: ''
      },
      referral: {
        to: '',
        details: ''
      }
    };
  },
  methods: {
    // Fetch patient data from backend (replace with actual API call)
    async fetchPatients() {
      try {
        const response = await axios.post('http://localhost:5000/api/patients');
        this.patients = response.data;
       
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    },
    async fetchAssess() {
      try {
        const res = await axios.post('http://localhost:5000/api/get-assessment');
        this.assesment = res.data;
       
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    },
    // Select a patient from the list
    selectPatient(patient) {
      this.selectedPatient = patient;
    },
    // Submit Review of Systems form
    submitROS() {
      // Handle ROS form submission logic here
      console.log('ROS Details:', this.ros.details);
    },
    // Submit History form
    submitHistory() {
      // Handle History form submission logic here
      console.log('History Details:', this.history.details);
    },
    // Submit Physical Exam form
    submitExam() {
      // Handle Exam form submission logic here
      console.log('Exam Details:', this.exam.details);
    },
    // Submit Investigations form
    submitInvest() {
      // Handle Invest form submission logic here
      console.log('Investigation Details:', this.invest.details);
    },
    // Submit Assessment form
    submitAssessment() {
      // Handle Assessment form submission logic here
      console.log('Assessment Details:', this.assessment.details);
    },
    // Submit Management Plan form
    submitPlan() {
      // Handle Plan form submission logic here
      console.log('Plan Details:', this.plan.details);
    },
    // Submit Patient Education form
    submitEducation() {
      // Handle Education form submission logic here
      console.log('Education Details:', this.education.details);
    },
    // Submit Follow-Up Plan form
    submitFollowUp() {
      // Handle Follow-Up form submission logic here
      console.log('Follow-Up Details:', this.followup.details);
    },
    // Submit Documentation form
    submitDocs() {
      // Handle Docs form submission logic here
      console.log('Docs Details:', this.docs.details);
    },
    // Submit Referral form
    submitReferral() {
      // Handle Referral form submission logic here
      console.log('Referral To:', this.referral.to);
      console.log('Referral Details:', this.referral.details);
    },
    // Fetch referral data from backend (replace with actual API call)
    fetchReferrals() {
      this.referrals = [
        {
          id: 1,
          patient_name: 'Jane Smith',
          referral_date: '2024-07-15'
        },
        {
          id: 2,
          patient_name: 'Michael Johnson',
          referral_date: '2024-07-16'
        },
        {
          id: 3,
          patient_name: 'Sarah Brown',
          referral_date: '2024-07-17'
        }
      ];
    }
  },
  mounted() {
    // Fetch initial data when component is mounted
    this.fetchPatients();
    this.fetchAssess();
    this.fetchReferrals();
  }
};
</script>

<style scoped>
/* Styling for tabs */
.tabs-navigation {
  margin-bottom: 1rem;
}

.tabs-navigation ul {
  display: flex;
  list-style-type: none;
  padding: 0;
}

.tabs-navigation ul li {
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-radius: 0.25rem 0.25rem 0 0;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
}

.tabs-navigation ul li.active {
  background-color: #007bff;
  color: white;
}

.tab-content {
  border: 1px solid #ccc;
  padding: 1rem;
  border-top: none;
}

.form-group {
  margin-bottom: 1rem;
}

.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
