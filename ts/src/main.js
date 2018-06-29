import Vue from 'vue'
import App from './App'
import '../static/css/resize.styl'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/body/main', 'pages/user/main', '^pages/index/main', 'pages/detail/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0DBC79',
      navigationBarTitleText: '主页',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      backgroundColor: '#0DBC79',
      selectedColor: 'black',
      color: 'white',
      list: [
        {
          pagePath: 'pages/index/main',
          text: '图书',
          iconPath: 'static/img/book.png',
          selectedIconPath: 'static/img/book-active.png'
        },
        {
          pagePath: 'pages/body/main',
          text: '评论',
          iconPath: 'static/img/todo.png',
          selectedIconPath: 'static/img/todo-active.png'
        },
        {
          pagePath: 'pages/user/main',
          text: '我',
          iconPath: 'static/img/me.png',
          selectedIconPath: 'static/img/me-active.png'
        }
      ]
    }
  }
}
