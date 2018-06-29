<template>
  <div class='grade' >
    <span>☆☆☆☆☆</span>
    <span class='mode' :style='style' >★★★★★</span>
  </div>
</template>

<script>
export default {
  props: {
    sum: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style () {
      return `width:${this.sum / 10 * 5 * 0.8}em`
    }
  }
}
</script>

<style lang='stylus'>
@import '../../static/css/resize.styl';
.grade
  float: right
  position relative
  display  inline-block
  font-size 40rpx
  span
   color main-color
  .mode
    position absolute
    display  inline-block
    overflow hidden
    top 0
    left 0
</style>


