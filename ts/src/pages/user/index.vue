<template>
  <div class='user' >
      <div class='userInfo' @click='login' >
        <span v-if='step'><i class='icon iconfont icon-yonghu' ></i></span>
        <img v-else :src="userinfo.avatarUrl" alt="">
         <div class='userText' >
          {{ userinfo.nickName }}
        </div>
      </div>
      <pro />
      <scanCode />
  </div>
</template>

<script>
import config from '@/config.js'
import qcloud from 'wafer2-client-sdk'
import pro from '@/components/progress'
import scanCode from '@/components/scanCode'
export default {
  data () {
    return {
      step: true,
      userinfo: {
        avatarUrl: './',
        nickName: '点击登录'
      }
    }
  },
  created () {
    if (wx.getStorageSync('user')) {
      this.step = false
      this.userinfo = wx.getStorageSync('user')
    }
  },
  methods: {
    login () {
      const self = this
      if (!wx.getStorageSync('user')) {
        wx.showLoading({
          title: '登陆中'
        })
        qcloud.setLoginUrl(config.loginUrl + '?lang=zh_CN')
        qcloud.login({
          success: function (data) {
            wx.setStorageSync('user', data)
            self.userinfo = data
            self.step = false
            wx.hideLoading()
          },
          fail: function (err) {
            console.log(err)
          }
        })
      } else {
        this.step = false
        this.userinfo = wx.getStorageSync('user')
      }
    }
  },
  components: {
    pro,
    scanCode
  }
}
</script>

<style lang='stylus'>
.user
  width: 100%
  height: 100%
  .userInfo
    width:80%
    margin:auto
    margin-top:30px
    text-align:center
    img
      width:200rpx
      height:200rpx
      border-radius:50%
    span
      i
        font-size:200rpx
    .userText
      margin:20rpx 0rpx
</style>