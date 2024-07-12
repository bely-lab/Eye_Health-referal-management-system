// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import ReceptionDashboard from './views/ReceptionistDashboard.vue';
import HealthcareWorkerDashboard from './views/HealthcareWorkerDashboard.vue';
import DoctorDashboard from './views/DoctorDashboard.vue';
import AdminDashboard from './views/AdminDashboard.vue';
import store from './store';
import NewPatientForm from './components/patients/NewPatientForm.vue';
import SearchPatient from './components/patients/SearchPatient.vue';
import Appointments from './components/patients/Appointments.vue';
import Billing from './components/patients/Billing.vue';
import PatientQueries from './components/patients/PatientQueries.vue';
import RecordAssessment from './views/RecordAssesment.vue';
import ReferralResponse from './views/ReferralResponse.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  // {
  //   path: '/reception-dashboard',
  //   component: ReceptionDashboard,
  //   //meta: { requiresAuth: true, role: 'reception' },
  // },
  {
    path: '/referral-response',
    name: 'ReferralResponse',
    component: ReferralResponse
  },
  {
    path: '/reception-dashboard',
    name: 'ReceptionistDashboard',
    component: ReceptionDashboard,
    children: [
      {
        path: 'patients/new',
        name: 'NewPatientForm',
        component: NewPatientForm,
      },
      {
        path: 'patients/search',
        name: 'SearchPatient',
        component: SearchPatient,
      },
      
      {
        path: 'appointments',
        name: 'Appointments',
        component: Appointments,
      },
      {
        path: 'billing',
        name: 'Billing',
        component: Billing,
      },
      {
        path: 'queries',
        name: 'PatientQueries',
        component: PatientQueries,
      },
    ],
  },

  {
    path: '/record-assessment/:id',
    name: 'RecordAssessment',
    component: RecordAssessment,
    meta: { requiresAuth: true, role: 'healthcare-worker' },
  },
  {
    path: '/healthcare-worker-dashboard',
    component: HealthcareWorkerDashboard,
    meta: { requiresAuth: true, role: 'healthcare-worker' },
  },
  {
    path: '/doctor-dashboard',
    component: DoctorDashboard,
    meta: { requiresAuth: true, role: 'doctor' },
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'Admin' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next('/login'); // Redirect to login if not authenticated
  } else if (to.meta.requiresAuth && store.getters.isLoggedIn && to.meta.role !== store.state.userRole) {
    next('/'); // Redirect to home if user does not have the correct role
  } else {
    next(); // Proceed to the route
  }
});

export default router;
