<template>
  <div>
    <detail  :detail='data' ref='comment' v-if='data.id' />
  </div>
</template>

<script>
import { get } from '@/utils/index'
import detail from '@/components/detail.vue'
export default {
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.id = this.$root.$mp.query.id
    get('/addCount?id=' + this.id).then(data => {
      if (data.code === 0) {
        this.data = data.data
        setTimeout(()=> {
          this.$refs.comment.isComment()
          this.$refs.comment.getComment()
        }, 50)
      }
    })
  },
  components: {
    detail
  }
}
</script>

<style>

</style>


