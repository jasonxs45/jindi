const Home = r => require.ensure([], () => r(require('pages/Home')), 'Home')
const Usercenter = r => require.ensure([], () => r(require('pages/Usercenter')), 'Usercenter')
const TradeProgress = r => require.ensure([], () => r(require('pages/TradeProgress')), 'TradeProgress')
const Bind = r => require.ensure([], () => r(require('pages/Bind')), 'Bind')
const BindOwner = r => require.ensure([], () => r(require('pages/BindOwner')), 'BindOwner')
export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/usercenter',
    name: 'usercenter',
    component: Usercenter
  },
  {
    path: '/tradeprogress',
    name: 'tradeprogress',
    component: TradeProgress
  },
  {
    path: '/bind',
    name: 'bind',
    component: Bind
  },
  {
    path: '/bindowner',
    name: 'bindowner',
    component: BindOwner
  }
]
