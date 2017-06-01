import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {loginRequest} from '@/request'

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
    beforeEnter: async (to, from, next) => {
      let toPath = to.fullPath.toLowerCase()

      if (toPath === '/index' && !store.state.user.userInfo) {
        let res = await loginRequest.isLogin()
        if (res.data) {
          store.commit('setUser', res.data)
          next()
        } else {
          next('/')
        }
      } else {
        next()
      }
    }
  }]
})
