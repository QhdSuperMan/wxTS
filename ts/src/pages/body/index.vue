<template>
  <div class='body_box'  >
    <div v-if='userinfo.openId'>
      <p class='b_books_title' >我的图书</p>
      <booklist :list='list' />
      <p class='b_books_title' >
        我的评论
      </p>
      <commentList v-if='commentData.length > 0' :commentData="commentData" />
    </div>
    <div v-else class='b_login' >
      请登录再来
    </div>
  </div>
</template>

<script>
import booklist from '@/components/bookList'
import { get, model } from '@/utils/index'
import commentList from '@/components/commentList'
export default {
  components: {
    booklist,
    commentList
  },

  data () {
    return {
      list: [],
      userinfo: {},
      commentData: []
    }
  },
  created () {
  },
  onShow () {
    this.userinfo = wx.getStorageSync('user')
    this.getList()
    this.getComment()
  },
  onLoad () {
    this.userinfo = wx.getStorageSync('user')
  },
  methods: {
    getComment() {
      get('/getComment?openid=' + this.userinfo.openId).then(data => {
        if (data.code === 0) {
          this.commentData = data.data
        }
      })
    },
    getList (init) {
      get('/bookList?openid=' + this.userinfo.openId).then(data => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        if (data.code === 0) {
          this.list = data.data.list
        } else {
          model('服务器错误')
        }
      })
    }
  },
  onPullDownRefresh () {
    wx.showLoading({
      title: '刷新中'
    })
    this.getList(true)
  }
}
</script>

<style lang='stylus' >
@import  '../../../static/css/resize.styl';
.body_box
  .b_books_title
    padding-left 20rpx
    background-color rgba(153,157,159,0.5)
  .b_login
    text-align center
    margin-top 300rpx
    color main-color 
    font-size 40rpx
</style>
