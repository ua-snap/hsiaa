import { createRouter, createWebHistory } from 'vue-router'
import MapView from '../views/MapView.vue'

const router = createRouter({
  history: createWebHistory(),
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
  ],
  // Scroll just above the map / report when you navigate
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
  }
})

export default router
