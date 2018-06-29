import Vue from 'vue'
import App from './index.vue'

const app = new Vue(App)
app.$mount()
// Page({
//   data: {
//     logs: []
//   }
// })
export default {
  config: {
    enablePullDownRefresh: true,
    navigationBarTitleText: '主要内容'
  }
}
