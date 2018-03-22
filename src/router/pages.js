const Home = r => require.ensure([], () => r(require('pages/Home')), 'Home')
const Usercenter = r => require.ensure([], () => r(require('pages/Usercenter')), 'Usercenter')
const TradeProgress = r => require.ensure([], () => r(require('pages/TradeProgress')), 'TradeProgress')
const Bind = r => require.ensure([], () => r(require('pages/Bind')), 'Bind')
const BindOwner = r => require.ensure([], () => r(require('pages/BindOwner')), 'BindOwner')
const ActivityList = r => require.ensure([], () => r(require('pages/ActivityList')), 'ActivityList')
const ActivityDetail = r => require.ensure([], () => r(require('pages/ActivityDetail')), 'ActivityDetail')
const RepairUser = r => require.ensure([], () => r(require('pages/RepairUser')), 'RepairUser')
const RepairUserUntreated = r => require.ensure([], () => r(require('pages/repair/Untreated')), 'RepairUserUntreated')
const RepairUserTreated = r => require.ensure([], () => r(require('pages/repair/Treated')), 'RepairUserTreated')
const RepairUserFinished = r => require.ensure([], () => r(require('pages/repair/Finished')), 'RepairUserFinished')
const RepairUserFailed = r => require.ensure([], () => r(require('pages/repair/Failed')), 'RepairUserFailed')
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
  },
  {
    path: '/activitylist',
    name: 'activitylist',
    component: ActivityList
  },
  {
    path: '/activitydetail',
    name: 'activitydetail',
    component: ActivityDetail
  },
  {
    path: '/repairuser',
    name: 'repairuser',
    component: RepairUser,
    redirect: '/repairuser/untreated',
    children: [
      {
        path: 'untreated',
        name: 'repairuseruntreated',
        component: RepairUserUntreated
      },
      {
        path: 'treated',
        name: 'repairusertreated',
        component: RepairUserTreated
      },
      {
        path: 'finished',
        name: 'repairuserfinished',
        component: RepairUserFinished
      },
      {
        path: 'failed',
        name: 'repairuserfailed',
        component: RepairUserFailed
      }
    ]
  }
]
