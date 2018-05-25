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
  if (process.env.NODE_ENV === 'production') {
    wxConf.init()
  }
  next()
})
router.afterEach((to, from) => {
  window.$closeAll()
})
export default router
