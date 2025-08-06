import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../pages/Homepage.vue'
import Aboutpage from '../pages/Aboutpage.vue'
import Newspage from '../pages/Newspage.vue'
import Programspage from '@/pages/Programspage.vue'
import Donationpage from '@/pages/Donationpage.vue'
import Contactpage from '@/pages/Contactpage.vue'
import dashboard from '@/dashboard.vue'

const routes = [
 { path: '/', component: Homepage },
{ path: '/about', component: Aboutpage },
{ path: '/News', component: Newspage },
{ path: '/Programs', component: Programspage },
{ path: '/Donation', component: Donationpage },
{ path: '/Contact', component: Contactpage },
{ path: '/dashboard', component: dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
