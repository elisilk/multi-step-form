import { createRouter, createMemoryHistory } from 'vue-router'

import FormStep1 from '@/views/FormStep1.vue'
import FormStep2 from '@/views/FormStep2.vue'
import FormStep3 from '@/views/FormStep3.vue'
import FormStep4 from '@/views/FormStep4.vue'
import FormStep5 from '@/views/FormStep5.vue'

const routes = [
  { path: '/', redirect: { name: 'Step1' } },
  { path: '/1', name: 'Step1', component: FormStep1 },
  { path: '/2', name: 'Step2', component: FormStep2 },
  { path: '/3', name: 'Step3', component: FormStep3 },
  { path: '/4', name: 'Step4', component: FormStep4 },
  { path: '/5', name: 'Step5', component: FormStep5 },
]

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
