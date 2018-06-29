<template>
  <div class='detail' >
    <div class='d_bg' >
      <img :src="detail.image" alt="">
      <img :src="detail.image"   class='d_img'  alt="" mode='aspectFit' >
      <div class='publisher' >
        <h1>{{ detail.title }}</h1>
        <p>{{ detail.author }}</p>
      </div>
    </div>
    <div class='d_text' >
      <p >
        <span class='d_user' >
          <img :src="detail.user_info.avatarUrl" alt="">
          <span>
            {{ detail.user_info.nickName }}
          </span>
        </span>
        <span class='d_grade' >
          <span>
            {{detail.rate}}分
          </span>
          <grade :sum='detail.rate' />
        </span>
      </p>
      <p>
        <span class='publisher'  >
          {{detail.publisher}}
        </span>
        <span class='price' >
          {{detail.price}}
        </span>
      </p>
    </div>
    <div class='d_tags' >
      <span v-for="(tag, index) in tags" :key='index'  class='d_tag'  >
        <span class='d_item' >
          {{ tag.tag }}
        </span>
        <span class='d_sum' >
          {{ tag.sum }}
        </span>
      </span>
    </div>
    <div class='d_summary' >
      <p>{{ detail.summary }}</p>
    </div>
    <textarea class='d_int' v-if='isAddComment'  placeholder='请输入评论' v-model='comment' ></textarea>
    <div class='d_btn' @click='addComment'  >
      <button size='mini' v-if='isAddComment' >评论</button>
    </div>
    <p class='d_tS' v-if='!isAddComment'  >
      您已经评论
    </p>
    <h1>全部评论</h1>
    <commentList :commentData='commentData' />
    <div class='d_switch' >
      <switch @change='getPhone' /> <span>手机 ：{{phone}}</span>
    </div>
    <div class='d_switch'>
      <switch @change='getLocal' /> <span>定位 ：{{adress}}</span>
    </div>
    <button class='d_btnb' open-type='share'  >
      转发给好友
    </button>
  </div>
</template>

<script>
// http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&ak=DddYkbxQ0HyrX1l6Kf40bfhF3ruVe36o //GET请求
// ak   	DddYkbxQ0HyrX1l6Kf40bfhF3ruVe36o
import grade from '@/components/grade'
import {get, model} from '@/utils/index.js'
import commentList from '@/components/commentList'
export default {
  data () {
    return {
      phone: '',
      adress: '',
      comment: '',
      isAddComment: true,
      commentData: [],
      openid: ''
    }
  },
  props: ['detail'],
  mounted () {
    this.isComment()
    this.getComment()
  },
  onLoad () {
    // 判断当前用户是否评论
    this.openid = wx.getStorageSync('user').openId
  },
  methods: {
    getComment() {
      get('/getComment?bookid=' + this.detail.isbn).then(data => {
        if (data.code === 0) {
          this.commentData = data.data
        }
      })
    },
    isComment () {
      if (!this.openid) {
        return
      }
      get(`/isComment?openid=${this.openid}&bookid=${this.detail.isbn}`).then(data => {
        if (data.code === 0) {
          this.isAddComment = false
        }
      }).catch(err => {
        this.isAddComment = true
      })
    },
    addComment () {
      if (!this.openid) {
        model('想得美','不登录还想评论？',(code)=>{
          if (code.confirm) {
            wx.switchTab({
              url:'../user/main'
            })
          }
        })
        return
      }
      if (this.comment.replace(/\s/g,'').length < 12) {
        model('请认真','不要水评哦，要真情流露')
        return
      }
      get(`/comment?openid=${this.openid}&bookid=${this.detail.isbn}&comment=${this.comment}&phone=${this.phone === '' ? '未知': this.phone}&location=${this.adress === '' ? '未知': this.adress}`)
      .then(data => {
        if (data.code === 0) {
          model('恭喜你','评论成功咯')
          this.isAddComment = true
        } else  {
          model('很遗憾','评论失败')
        }
      })
    },
    getPhone (e) {
      if (e.target.value) {
        var res = wx.getSystemInfoSync()
        this.phone = res.model
      } else {
        this.phone = ''
      }
    },
    getLocal (e) {
      if (e.target.value) {
        const _this = this
        wx.getLocation({
          type: 'wgs84',
          success: function(res) {
            var latitude = res.latitude
            var longitude = res.longitude
            var speed = res.speed
            var accuracy = res.accuracy
            wx.request({
              url: `http://api.map.baidu.com/geocoder/v2/?location=${res.latitude},${res.longitude}&output=json&ak=DddYkbxQ0HyrX1l6Kf40bfhF3ruVe36o`,
              success (data) {
                if (data.data.status === 0) {
                  _this.adress = data.data.result.formatted_address
                } else {
                  _this.adress = '位置地点'
                }
              }
            })
          }
        })
      } else {
        this.adress = ''
      }
    }
  },
  computed: {
    tags () {
      var demo = this.detail.tags.split(',').map(val => {
        return {
          tag: val.split(' ')[0],
          sum: val.split(' ')[1]
        }
      })
      return demo
    }
  },
  components: {
    grade,
    commentList
  },
  // onHide() {
  //   console.log('onHide', this)
  // },
  onUnload () {
    this.phone = ''
    this.adress = ''
  }
}
</script>

<style lang='stylus' >
@import '../../static/css/resize.styl';
.detail
  width 100%
  .d_bg
    img
      width 100%
      filter blur(10px)
      overflow hidden
    .d_img
      position absolute 
      top 50rpx
      left 0rpx
      right 0rpx
      margin 0 auto
      filter none
      width 300rpx
      height 300rpx
    .publisher
      position absolute 
      top 370rpx
      left 0rpx
      right 0rpx
      margin 0 auto
      text-align center
      color white
      h1 
        font-size 40rpx
        font-weight bold
  .d_text
    padding 20rpx
    .d_user
      img
        width 80rpx
        height 80rpx
        border-radius 50%
        vertical-align middle
    .d_grade
      float right
      line-height 80rpx
    .price
      float right
  .d_tags
    padding 20rpx
    .d_tag
      margin 5rpx
      display inline-block
      border solid 2px main-color
      border-radius 10rpx
      padding 10rpx
      font-size 30rpx
  .d_summary
    padding 20rpx
    font-size 30rpx
  .d_int
    width 100%
    height 100rpx
    margin 10rpx auto
    border solid 2px main-color
  .d_switch
    padding 20rpx
    font-size 30rpx
  .d_btn
    text-align right 
    padding-right 10rpx
  .d_tS
    text-align  center
    font-size 30rpx
    background-color rgba(153,157,159,0.5)
  .d_btnb
    text-align  center
    background-color main-color
</style>

