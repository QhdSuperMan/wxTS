<template>
  <div class='progress' >
    <p>今天是{{ year }}年，已经过去了{{ day }}天,过了{{ percent }}%</p>
    <progress :percent="percent" color="#0DBC79" />
  </div>
</template>

<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear()
    },
    day () {
      const start = new Date(new Date().getFullYear() + '/1/1').getTime()
      const end = new Date().getTime()
      return Math.floor((end - start) / 1000 / 3600 / 24)
    },
    percent () {
      return ((this.run() === true ? this.day / 366 : this.day / 366) * 100).toFixed(1)
    }
  },
  methods: {
    run () {
      if (this.year % 400 === 0) {
        return true
      } else if (this.year & 4 === 0 && this.year % 100 !== 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang='stylus' >
.progress
  width:100%
  height:50rpx
  color: main-color
  p
    margin-bottom:20rpx
    text-align: center
</style>
