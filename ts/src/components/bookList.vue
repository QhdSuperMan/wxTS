<template>
  <div class='Clist' >
    <a class='list' v-for='val in list' :key='val.id'  :href="'/pages/detail/main?id=' + val.id" >
      <div class='l_imgage' >
        <img :src="val.image" alt="">
      </div>
      <div class='l_text' >
        <div class='l_title' >
          <span class='l_left' >{{val.title}}</span>
          <grade :sum='val.rate' />
          <p class='p' >访问量:{{val.count}}</p>
        </div>
        <div class='l_summary'>
          <p class='l_publisher' >
            <span>{{val.publisher}}</span>
            <span>{{val.user_info.nickName}}</span>
          </p>
          <span>{{val.summary}}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import grade from '@/components/grade'
export default {
  props: ['list'],
  components: {
    grade
  }
}
</script>

<style lang='stylus' >
.Clist
  .list
    padding:10rpx
    height:100%
    width:100%
    display:flex
    justify-content:space-between
    content-item:center
    .l_imgage
      img
        width:300rpx
        height:300rpx
    .l_text
      .l_left
        display inline-block
        width 200rpx
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        font-size:30rpx
        font-weight:bold
        line-height:50rpx
      .p
        text-align right
      font-size:30rpx
      margin:0rpx 10rpx
      height:300rpx
      overfloe:hidden
      .l_summary
        margin-top:10rpx
        height:165rpx
        overflow:hidden
        .l_publisher
          margin-bottom 10rpx
          span:first-child
            display inline-block
            width 200rpx
            text-overflow ellipsis 
            overflow hidden 
            white-space nowrap
          span:last-child
            float right
</style>


