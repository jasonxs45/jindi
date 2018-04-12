import Vue from 'vue'
import Router from 'vue-router'
import pageRoutes from './pages'
import wxConf from 'common/utils/wxConf'
Vue.use(Router)

let routes = pageRoutes

const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title || '金地'
  wxConf.init()
  next()
})
router.afterEach((to, from) => {
})
export default router
