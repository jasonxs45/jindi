import layer from 'common/utils/layer'
import 'common/scss/layer.scss'
import Container from './container'
import Row from './row'
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
import Fitimg from './fitimg'
import XTextarea from './textarea'
import OrderList from './orderlist'
import Nodata from './nodata'
import Getmore from './getmore'
import {ImgRow, ImgCell} from './imgrow'
((w) => {
  w.$simplealert = opts => {
    opts = Object.assign({
      shadeClose: false,
      btn: ''
    }, opts)
    return layer.open(opts)
  }
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
  Container,
  Row,
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
  Star,
  Fitimg,
  XTextarea,
  OrderList,
  Nodata,
  Getmore,
  ImgRow,
  ImgCell
}
