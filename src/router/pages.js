const Home = r => require.ensure([], () => r(require('pages/Home')), 'Home')
const Usercenter = r => require.ensure([], () => r(require('pages/Usercenter')), 'Usercenter')
const TradeProgress = r => require.ensure([], () => r(require('pages/TradeProgress')), 'TradeProgress')
const Bind = r => require.ensure([], () => r(require('pages/Bind')), 'Bind')
const BindOwner = r => require.ensure([], () => r(require('pages/bind/BindOwner')), 'BindOwner')
const BindRelative = r => require.ensure([], () => r(require('pages/bind/BindRelative')), 'BindRelative')
const BindRenter = r => require.ensure([], () => r(require('pages/bind/BindRenter')), 'BindRenter')
const BindSecond = r => require.ensure([], () => r(require('pages/bind/BindSecond')), 'BindSecond')
const BindOwnerConfirm = r => require.ensure([], () => r(require('pages/bind/BindOwnerConfirm')), 'BindOwnerConfirm')

const ActivityList = r => require.ensure([], () => r(require('pages/ActivityList')), 'ActivityList')
const ActivityDetail = r => require.ensure([], () => r(require('pages/ActivityDetail')), 'ActivityDetail')

const RepairUser = r => require.ensure([], () => r(require('pages/RepairUser')), 'RepairUser')
const RepairUserUntreated = r => require.ensure([], () => r(require('pages/repairuser/Untreated')), 'RepairUserUntreated')
const RepairUserTreated = r => require.ensure([], () => r(require('pages/repairuser/Treated')), 'RepairUserTreated')
const RepairUserFinished = r => require.ensure([], () => r(require('pages/repairuser/Finished')), 'RepairUserFinished')
const RepairUserFailed = r => require.ensure([], () => r(require('pages/repairuser/Failed')), 'RepairUserFailed')
const RepairSubmit = r => require.ensure([], () => r(require('pages/RepairSubmit')), 'RepairSubmit')

const RepairEngineer = r => require.ensure([], () => r(require('pages/RepairEngineer')), 'RepairEngineer')
const RepairEngineerUntreated = r => require.ensure([], () => r(require('pages/repairengineer/Untreated')), 'RepairEngineerUntreated')
const RepairEngineerTreated = r => require.ensure([], () => r(require('pages/repairengineer/Treated')), 'RepairEngineerTreated')
const RepairEngineerFinished = r => require.ensure([], () => r(require('pages/repairengineer/Finished')), 'RepairEngineerFinished')
const RepairEngineerCanceled = r => require.ensure([], () => r(require('pages/repairengineer/Canceled')), 'RepairEngineerCanceled')
// const OrderList = r => require.ensure([], () => r(require('components/orderlist')), 'OrderList')
const AdviseUser = r => require.ensure([], () => r(require('pages/AdviseUser')), 'AdviseUser')
const AdviseUserUntreated = r => require.ensure([], () => r(require('pages/adviseuser/Untreated')), 'AdviseUserUntreated')
const AdviseUserTreated = r => require.ensure([], () => r(require('pages/adviseuser/Treated')), 'AdviseUserTreated')
const AdviseUserFinished = r => require.ensure([], () => r(require('pages/adviseuser/Finished')), 'AdviseUserFinished')
const AdviseSubmit = r => require.ensure([], () => r(require('pages/AdviseSubmit')), 'AdviseSubmit')

const NewsCenter = r => require.ensure([], () => r(require('pages/NewsCenter')), 'NewsCenter')
const NewsDetail = r => require.ensure([], () => r(require('pages/NewsDetail')), 'NewsDetail')

const Magazine = r => require.ensure([], () => r(require('pages/Magazine')), 'Magazine')
const MagazineInner = r => require.ensure([], () => r(require('pages/MagazineInner')), 'MagazineInner')
const ProjectProgress = r => require.ensure([], () => r(require('pages/ProjectProgress')), 'ProjectProgress')
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
    path: '/bind/bindowner',
    name: 'bindowner',
    component: BindOwner
  },
  {
    path: '/bind/bindrelative',
    name: 'bindrelative',
    component: BindRelative
  },
  {
    path: '/bind/bindrenter',
    name: 'bindrenter',
    component: BindRenter
  },
  {
    path: '/bind/bindsecond',
    name: 'bindsecond',
    component: BindSecond
  },
  {
    path: '/bind/bindownerconfirm/type/:typeid/member/:memberid',
    name: 'bindownerconfirm',
    component: BindOwnerConfirm
  },
  {
    path: '/activitylist',
    name: 'activitylist',
    component: ActivityList
  },
  {
    path: '/activitydetail/:id',
    name: 'activitydetail',
    component: ActivityDetail
  },
  {
    path: '/repairuser',
    name: 'repairuser',
    component: RepairUser,
    redirect: '/repairuser/list/untreated',
    children: [
      {
        path: 'list/untreated',
        component: RepairUserUntreated
      },
      {
        path: 'list/treated',
        component: RepairUserTreated
      },
      {
        path: 'list/finished',
        component: RepairUserFinished
      },
      {
        path: 'list/failed',
        component: RepairUserFailed
      }
    ]
  },
  {
    path: '/repairsubmit',
    name: 'repairsubmit',
    component: RepairSubmit
  },
  {
    path: '/repairengineer',
    name: 'repairengineer',
    component: RepairEngineer,
    redirect: '/repairengineer/list/untreated',
    children: [
      {
        path: 'list/untreated',
        component: RepairEngineerUntreated
      },
      {
        path: 'list/treated',
        component: RepairEngineerTreated
      },
      {
        path: 'list/finished',
        component: RepairEngineerFinished
      },
      {
        path: 'list/canceled',
        component: RepairEngineerCanceled
      }
    ]
  },
  {
    path: '/adviseuser',
    name: 'adviseuser',
    component: AdviseUser,
    redirect: '/adviseuser/list/untreated',
    children: [
      {
        path: 'list/untreated',
        component: AdviseUserUntreated
      },
      {
        path: 'list/treated',
        component: AdviseUserTreated
      },
      {
        path: 'list/finished',
        component: AdviseUserFinished
      }
    ]
  },
  {
    path: '/advisesubmit',
    name: 'advisesubmit',
    component: AdviseSubmit
  },
  {
    path: '/newscenter',
    name: 'newscenter',
    component: NewsCenter
  },
  {
    path: '/newsdetail/:id',
    name: 'newsdetail',
    component: NewsDetail
  },
  {
    path: '/magazine',
    name: 'magazine',
    component: Magazine
  },
  {
    path: '/magazineinner/:id',
    name: 'magazineinner',
    component: MagazineInner
  },
  {
    path: '/projectprogress',
    name: 'projectprogress',
    component: ProjectProgress
  }
]
