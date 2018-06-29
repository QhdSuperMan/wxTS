<template>
    <div class='main' >
      <swiper class='swiper' :autoplay='true' :circular='true'>
        <swiper-item v-for='val in rank' :key='val.id'>
          <a :href="'/pages/detail/main?id=' + val.id">
            <img :src="val.image" alt="图片"  />
          </a>
        </swiper-item>
      </swiper>
      <booklist :list='list' />
      <p class='l_loading' v-if='!mode' >没有更多数据</p>
    </div>
</template>

<script>
import { get, model } from '@/utils/index'
import grade from '@/components/grade'
import booklist from '@/components/bookList'
export default {
  data () {
    return {
      list: [],
      page: 0,
      mode: true,
      rank: []
    }
  },
  created () {
    this.getList()
    this.getSwiper()
  },
  methods: {
    getList (init) {
      get('/bookList?page=' + this.page).then(data => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        if (data.code === 0) {
          if (data.data.list.length < 10 && this.page > 0) {
            this.mode = false
          }
          if (init) {
            this.list = data.data.list
          } else {
            this.list = this.list.concat(data.data.list)
          }
        } else {
          model('服务器错误')
        }
      })
    },
    getSwiper () {
      get('/rank').then(data => {
        if (data.code === 0) {
          this.rank = data.data
        }
      })
    }
  },
  components: {
    booklist
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.page = 0
    wx.showLoading({
      title: '刷新中'
    })
    this.getList(true)
  },
  // 上拉加载
  onReachBottom () {
    if (!this.mode) {
      return
    }
    wx.showLoading({
      title: '加载中'
    })
    this.page++
    this.getList()
  }
}
</script>

<style lang='stylus' >
.main
  height:100%
  width:100%
  .swiper 
    margin-bottom 20rpx
    img 
     width 100%
     height 600rpx
  .l_loading
    text-align center
    margin-bottom 10rpx
</style>