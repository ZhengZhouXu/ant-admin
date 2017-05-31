import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

const index = resolve => require(['@/page/index/index.vue'], resolve)
const login = resolve => require(['@/page/login/login.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: login
  }, {
    path: '/index',
    component: index,
    beforeEnter: (to, from, next) => {
      let toPath = to.fullPath.toLowerCase()
      // TODO: 检测是否登录
      if (toPath === '/index' && !store.state.user.userInfo) {
        next('/')
      }
      next()
    }
  }]
})
