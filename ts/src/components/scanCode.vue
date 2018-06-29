<template>
  <div>
    <button class='scanCode'  @click='scanCode' >扫描书籍</button>
  </div>
</template>

<script>
import {post, model} from '@/utils/index'
export default {
  methods: {
    scanCode () {
      wx.scanCode({
        success (data) {
          post('/addbook', {
            openid: wx.getStorageSync('user').openId,
            svn: data.result
          }).then(data => {
            if (data.code === 0) {
              model('成功', '添加成功')
            } else {
              model(data.data)
            }
          }).catch(err => {
            model('失败', err.data)
          })
        },
        fail (err) {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style lang='stylus' >
  .scanCode
    width:50%
    height:100rpx
    background-color: #0DBC79
    margin-top:200rpx
</style>


