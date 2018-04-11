<template>
  <div class="auth">
    金地中心
  </div>
</template>
<script>
import api from 'common/api'
export default {
  name: 'Auth',
  created () {
    let HouseID = 12
    let Name = 13
    let IDCardLast4 = 14
    api.bind.houseOwerBind({HouseID, Name, IDCardLast4})
  }
}
</script>
<style lang="scss" scoped>
</style>
