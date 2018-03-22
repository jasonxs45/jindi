import layer from 'common/utils/layer'
import 'common/scss/layer.scss'
import Icon from './icon'
import {Flexbox, FlexboxItem} from './flexbox'
import Split from './split'
import Statisctitle from './title'
import Activitycard from './activitycard'
import Avatar from './avatar'
import Btn from './btn'
import Userinfo from './userinfo'
import XSelect from './select'
import XInput from './input'
import {Tabnav, TabnavItem} from './tabnav'
import Repaircard from './repaircard'
import Star from './star'
((w) => {
  w.$toast = msg => {
    return layer.open({
      content: msg,
      skin: 'msg',
      time: 2
    })
  }
  w.$loading = text => {
    return layer.open({
      type: 2,
      content: text,
      shadeClose: false
    })
  }
  w.$alert = opts => {
    opts = Object.assign({
      shadeClose: false,
      btn: '确定'
    }, opts)
    return layer.open(opts)
  }
  w.$confirm = opts => {
    opts = Object.assign({
      shadeClose: false,
      content: '',
      btn: ['确定', '取消'],
      yes: index => {
        layer.close(index)
      }
    }, opts)
    let index = layer.open(opts)
    console.log(index)
    return index
  }
})(window)

export {
  Icon,
  Flexbox,
  FlexboxItem,
  Split,
  Statisctitle,
  Activitycard,
  Avatar,
  Btn,
  Userinfo,
  XSelect,
  XInput,
  Tabnav,
  TabnavItem,
  Repaircard,
  Star
}
