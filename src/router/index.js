import Vue from 'vue'
import Router from 'vue-router'
import pageRoutes from './pages'

Vue.use(Router)

let routes = pageRoutes

const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  next()
})
router.afterEach((to, from) => {
})
export default router
