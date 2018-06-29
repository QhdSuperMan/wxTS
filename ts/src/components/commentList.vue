<template>
  <div class='d_commentList'  >
    <div v-for='val in commentData' :key='val.id' class='item'  >
      <div class='d_location' >
        <span>
          {{val.phone}}
        </span>
        <span class='d_agress' :title='val.location' >
          {{val.location}}
        </span>
      </div>
      <div>
        <img :src="val.user_info.avatarUrl" alt="头像">
        <span >{{ val.user_info.nickName }}</span>
      </div>
      <p>
        {{ val.comment }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commentData'],
}
</script>

<style lang='stylus' >
.d_commentList
  margin 10rpx 10rpx
  .item
    margin 10rpx 0rpx
    .d_location
      float right
      padding-top 10rpx
      span
        margin-left 10rpx
      .d_agress
        padding-top 10rpx
        display inline-block
        width 120rpx
        text-overflow ellipsis 
        overflow hidden
        white-space nowrap
    img 
      width 80rpx
      height 80rpx
      border-radius 50%
      margin 10rpx 20rpx
      vertical-align middle
    span 
      font-size 30rpx
    p
      padding-left 120rpx
      font-size 30rpx
</style>


