<script>
// import { get } from './utils/index.js'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  onLaunch () {
    // get('/weapp/demo').then(data => {
    //   console.log(data)
    // })
    // wx.checkSession({
    //   success: function () {
    //     console.log('成功')
    //   },
    //   fail: function () {
    //     wx.login({
    //       success: function (res) {
    //         if (res.code) {
    //           wx.request({
    //             url: 'http://bjsuperman.cn',
    //             data: {
    //               id: res.code
    //             },
    //             header: {
    //               'Content-Type': 'applciation/json'
    //             },
    //             success: function (req) {
    //               console.log(req)
    //             }
    //           })
    //         }
    //       }
    //     })
    //   }
    // })
    // wx.getSetting({
    //   success (res) {
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success () {
    //           wx.startRecord()
    //         }
    //       })
    //     }
    //   }
    // })
  }
}
</script>

<style lang='stylus' >
@import '../static/css/iconfont.styl';
@import '../static/css/resize.styl';
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
