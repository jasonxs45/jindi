<template>
  <div class="news-detail">
    {{id}}
  </div>
</template>
<script>
export default {
  name: 'NewsDetail',
  data () {
    return {
      id: ''
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
