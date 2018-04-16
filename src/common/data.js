/* eslint-disable no-unused-vars */
let entries = [
  {
    name: '我的房源',
    icon: 'user',
    link: '/myhouses'
  },
  {
    name: '个人中心',
    icon: 'user',
    link: '/usercenter'
  },
  {
    name: '合同查询',
    icon: 'graph',
    link: '/tradeprogress'
  },
  {
    name: '工程进度',
    icon: 'msg',
    link: '/projectprogress'
  },
  {
    name: '业主报修',
    icon: 'repair',
    link: '/wait'
  },
  // {
  //   name: '在线客服',
  //   icon: 'msg',
  //   link: '/service'
  // },
  {
    name: '投诉建议',
    icon: 'suggest',
    link: '/wait'
  },
  {
    name: '社区活动',
    icon: 'activity',
    link: '/activitylist'
  },
  {
    name: '金地家书',
    icon: 'books',
    link: '/magazine'
  }
]
// 报修单的数据结构
let order = {
  state: 0, // 订单状态
  id: Math.round(Math.random() * 9999),
  title: '金地城二期E栋1303',
  date: '2018/02/28',
  desc: '主卧墙面-破裂；天花-漏水',
  descDetail: '问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述',
  ownerPhoto: [
    '/static/images/banner1.png',
    '/static/images/banner2.png',
    '/static/images/active1.png',
    '/static/images/active1.png'
  ],
  engineer: {
    name: '吴建军',
    tel: '15972228857'
  },
  progress: [
    {
      text: '已联系业主，准备上门检查',
      date: '02/28 12:00'
    },
    {
      text: '已联系业主，准备上门检查',
      date: '02/28 13:00'
    },
    {
      text: '已联系业主，准备上门检查',
      date: '02/28 12:00'
    }
  ],
  repairPhoto: [
    '/static/images/banner1.png',
    '/static/images/banner2.png',
    '/static/images/active1.png',
    '/static/images/active2.png'
  ],
  rate: 3.8
}
// 提交报修的类别
let posRoom = [
  {
    'id': '240',
    'title': '入户门'
  },
  {
    'id': '241',
    'title': '客厅'
  },
  {
    'id': '242',
    'title': '餐厅'
  },
  {
    'id': '244',
    'title': '卧室'
  },
  {
    'id': '245',
    'title': '阳台'
  },
  {
    'id': '246',
    'title': '卫生间'
  },
  {
    'id': '260',
    'title': '厨房'
  },
  {
    'id': '681',
    'title': '其他'
  }
]
let posLocation = [
  {
    'id': '301',
    'title': '墙面'
  },
  {
    'id': '302',
    'title': '地面'
  },
  {
    'id': '303',
    'title': '天花'
  },
  {
    'id': '304',
    'title': '给水'
  },
  {
    'id': '305',
    'title': '管道（排水）'
  },
  {
    'id': '306',
    'title': '烟道'
  },
  {
    'id': '307',
    'title': '铝合金门窗'
  }
]
const NAME_REG = /^[\u4e00-\u9fa5]{2,6}$/i
const TEL_REG = /^1([3,4,5,7,8]{1}[0-9]{9})$/i
const ID_REG = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/i
const LAST_FOUR_REG = /\d{3}[0-9Xx]/i
// 报修弹窗
let suc = `<img src="/static/images/rssuc.png" class="icon"/>
                  <h3 class="title">恭喜您</h3>
                  <p class="text">您已成功提交报修，请耐心等待~<br/>工作人员将尽快处理</p>`
let fail = `<img src="/static/images/rsfail.png" class="icon"/>
                  <h3 class="title">对不起</h3>
                  <p class="text">提交失败</p>`
// 正则
export {
  entries,
  posRoom,
  posLocation,
  NAME_REG,
  TEL_REG,
  ID_REG,
  LAST_FOUR_REG,
  suc,
  fail
}
