import Vue from 'vue'
import Router from 'vue-router'
import pageRoutes from './pages'
import wxConf from 'common/utils/wxConf'
Vue.use(Router)

let routes = pageRoutes

const router = new Router({
  routes
})
let index = null
router.beforeEach((to, from, next) => {
  wxConf.init()
  if (window.$loading) {
    index = window.$loading('加载中')
  }
  next()
})
router.afterEach((to, from) => {
  index && window.$close(index)
})
router.afterEach((to, from) => {
  window.$closeAll()
})
export default router
