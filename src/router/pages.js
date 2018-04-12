const Home = r => require.ensure([], () => r(require('pages/Home')), 'Home')
const Usercenter = r => require.ensure([], () => r(require('pages/Usercenter')), 'Usercenter')
const MyHouses = r => require.ensure([], () => r(require('pages/MyHouses')), 'MyHouses')
const HouseMember = r => require.ensure([], () => r(require('pages/HouseMember')), 'HouseMember')

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
const RepairSubmit = r => require.ensure([], () => r(require('pages/RepairSubmit')), 'RepairSubmit')

const RepairEngineer = r => require.ensure([], () => r(require('pages/RepairEngineer')), 'RepairEngineer')

const AdviseUser = r => require.ensure([], () => r(require('pages/AdviseUser')), 'AdviseUser')
const AdviseSubmit = r => require.ensure([], () => r(require('pages/AdviseSubmit')), 'AdviseSubmit')

const NewsCenter = r => require.ensure([], () => r(require('pages/NewsCenter')), 'NewsCenter')
const NewsDetail = r => require.ensure([], () => r(require('pages/NewsDetail')), 'NewsDetail')

const Magazine = r => require.ensure([], () => r(require('pages/Magazine')), 'Magazine')
const MagazineInner = r => require.ensure([], () => r(require('pages/MagazineInner')), 'MagazineInner')
const MagazineDetail = r => require.ensure([], () => r(require('pages/MagazineDetail')), 'MagazineDetail')

const ProjectProgress = r => require.ensure([], () => r(require('pages/ProjectProgress')), 'ProjectProgress')
const MonthlyProgress = r => require.ensure([], () => r(require('pages/MonthlyProgress')), 'MonthlyProgress')
const ProgressDetail = r => require.ensure([], () => r(require('pages/ProgressDetail')), 'ProgressDetail')

const Investigate = r => require.ensure([], () => r(require('pages/Investigate')), 'Investigate')

const MessageCenter = r => require.ensure([], () => r(require('pages/MessageCenter')), 'MessageCenter')

const Auth = r => require.ensure([], () => r(require('pages/Auth')), 'Auth')
const Wait = r => require.ensure([], () => r(require('pages/Wait')), 'Wait')
export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth
  },
  {
    path: '/wait',
    name: 'wait',
    component: Wait
  },
  {
    path: '/usercenter',
    name: 'usercenter',
    component: Usercenter,
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/myhouses',
    name: 'myhouses',
    component: MyHouses,
    meta: {
      title: '我的房源'
    }
  },
  {
    path: '/housemember/:id',
    name: 'housemember',
    component: HouseMember,
    meta: {
      title: '我的房源'
    }
  },
  {
    path: '/tradeprogress',
    name: 'tradeprogress',
    component: TradeProgress,
    meta: {
      title: '购房进度'
    }
  },
  {
    path: '/bind',
    name: 'bind',
    component: Bind,
    meta: {
      title: '用户绑定'
    }
  },
  {
    path: '/bind/bindowner',
    name: 'bindowner',
    component: BindOwner,
    meta: {
      title: '业主绑定'
    }
  },
  {
    path: '/bind/bindrelative',
    name: 'bindrelative',
    component: BindRelative,
    meta: {
      title: '家属绑定'
    }
  },
  {
    path: '/bind/bindrenter',
    name: 'bindrenter',
    component: BindRenter,
    meta: {
      title: '租户绑定'
    }
  },
  {
    path: '/bind/bindsecond',
    name: 'bindsecond',
    component: BindSecond,
    meta: {
      title: '二手业主绑定'
    }
  },
  {
    path: '/bind/bindownerconfirm/type/:typeid/member/:memberid',
    name: 'bindownerconfirm',
    component: BindOwnerConfirm,
    meta: {
      title: '业主审核'
    }
  },
  {
    path: '/activitylist',
    name: 'activitylist',
    component: ActivityList,
    meta: {
      title: '社区活动'
    }
  },
  {
    path: '/activitydetail/:id',
    name: 'activitydetail',
    component: ActivityDetail,
    meta: {
      title: '详情'
    }
  },
  {
    path: '/repairuser',
    name: 'repairuser',
    component: RepairUser,
    meta: {
      title: '业主报修'
    }
  },
  {
    path: '/repairsubmit',
    name: 'repairsubmit',
    component: RepairSubmit,
    meta: {
      title: '提交报修'
    }
  },
  {
    path: '/repairengineer',
    name: 'repairengineer',
    component: RepairEngineer,
    meta: {
      title: '业主报修'
    }
  },
  {
    path: '/adviseuser',
    name: 'adviseuser',
    component: AdviseUser,
    meta: {
      title: '投诉建议'
    }
  },
  {
    path: '/advisesubmit',
    name: 'advisesubmit',
    component: AdviseSubmit,
    meta: {
      title: '提交投诉建议'
    }
  },
  {
    path: '/newscenter',
    name: 'newscenter',
    component: NewsCenter,
    meta: {
      title: '新闻中心'
    }
  },
  {
    path: '/newsdetail/:id',
    name: 'newsdetail',
    component: NewsDetail,
    meta: {
      title: '详情'
    }
  },
  {
    path: '/magazine',
    name: 'magazine',
    component: Magazine,
    meta: {
      title: '社区期刊'
    }
  },
  {
    path: '/magazineinner/:id',
    name: 'magazineinner',
    component: MagazineInner,
    meta: {
      title: '列表'
    }
  },
  {
    path: '/magazinedetail/:id',
    name: 'magazinedetail',
    component: MagazineDetail,
    meta: {
      title: '详情'
    }
  },
  {
    path: '/projectprogress',
    name: 'projectprogress',
    component: ProjectProgress,
    meta: {
      title: '工程进度'
    }
  },
  {
    path: '/monthlyprogress/:id',
    name: 'monthlyprogress',
    component: MonthlyProgress,
    meta: {
      title: '工程进度'
    }
  },
  {
    path: '/progressdetail/:id',
    name: 'progressdetail',
    component: ProgressDetail,
    meta: {
      title: '详情'
    }
  },
  {
    path: '/investigate/:id',
    name: 'investigate',
    component: Investigate,
    meta: {
      title: '问卷调查'
    }
  },
  {
    path: '/messagecenter',
    name: 'messagecenter',
    component: MessageCenter,
    meta: {
      title: '消息中心'
    }
  }
]
