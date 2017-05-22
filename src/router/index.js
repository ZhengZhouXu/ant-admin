import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['../page/index/index.vue'], resolve)
const home = resolve => require(['../page/home/home.vue'], resolve)
const menberManage = resolve => require(['../page/membermanage/membermanage.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: index
  }, {
    path: '/index',
    component: index,
    children: [{
      path: '',
      component: home
    }, {
      path: '/home',
      component: home
    }, {
      path: '/membermanage',
      component: menberManage
    }]
  }]
})
