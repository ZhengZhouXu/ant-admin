// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import moment from 'moment'
import 'element-ui/lib/theme-default/index.css'
import './style/base.sass'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* init */
Vue.prototype.openSuccess = (message) => {
  Vue.prototype.$message({
    message,
    type: 'success'
  })
}

Vue.prototype.openError = (message) => {
  Vue.prototype.$message.error(message)
}

/* 全局filter */
Vue.filter('status', function (value) {
  switch (value) {
    case 0: return '正常'
    case 1: return '禁用'
  }
})
Vue.filter('timeFormat', function (value) {
  return moment(value).format('YYYY-MM-DD hh:mm:ss')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
