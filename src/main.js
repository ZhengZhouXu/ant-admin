// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
