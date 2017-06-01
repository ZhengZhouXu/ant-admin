<template>
<div class="login-wrapper">
  <div class="login">
    <!--<h2>请登录</h2>-->
    <div class="login-top">
      <h1>乐疯网后台管理系统</h1>
      <form>
        <input type="text" v-model.trim="username" placeholder="账号" >
        <input type="password" v-model.trim="password" placeholder="密码" >
        <input type="text" class="vail" v-model.trim="code" width="50%" placeholder="验证码" >
        <img id="valiCode" style="cursor: pointer;" height="40" @click="changeVailad" src="http://localhost:2682/admin/login/GetValidateCode?time=0" alt="验证码" />
        </form>
        <div class="forgot">
          <input type="button" @click="toLogin" value="登录" >
        </div>
    </div>
    <div class="login-bottom">
    </div>
  </div>
</div>
</template>

<script>
import {loginRequest} from '@/request'
export default {
  data () {
    return {
      username: 'xuxule',
      password: 'asd123',
      code: ''
    }
  },
  methods: {
    async toLogin () {
      let res = await loginRequest.login(this.username, this.password, this.code)
      if (typeof res.data !== 'string') {
        this.$store.commit('setUser', res.data)
        console.log(this.$store.state.user.userInfo)
        this.$router.push('/index')
      } else {
        this.openError(res.data)
      }
    },
    changeVailad (e) {
      e.currentTarget.src = e.currentTarget.src + Date.now()
    }
  }
}
</script>

<style lang="sass" scoped>
@import './css/style.css'
.login-wrapper
  padding-top: 200px
  width: 100%
  height: 100%
  background: url(./images/banner.jpg) repeat
  .vail
    width: 50%
  img
    position: relative
    top: 15px
</style>
