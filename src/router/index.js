import { createRouter, createWebHistory } from 'vue-router'
import MapView from '../views/MapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MapView
    },
    {
      path: '/report/:lat/:lng',
      name: 'report',
      // route level code-splitting
      // this generates a separate chunk (ReportView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ReportView.vue'),
      props: true
    },
    // Redirect not-found to home page
    { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/' }
  ]
})

export default router
