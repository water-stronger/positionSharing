<template>
    <div class="mine">
      <div class="afterLogin" v-if="isLogin">
        <div class="aaa">
          <div class="pic">
            <div class="welcome">欢迎"{{this.user.username}}"的登陆！</div>
            <img :src="this.user.pic" alt="点击设置，上传图片">
            <div class="icon-set" @click="set(user)">设置</div>
          </div>
        </div>
        <div class="out" @click="outLogin">退出登录</div>
      </div>
      <login class="loginCom" v-if="Login" @login="loginY"></login>
    </div>
</template>

<script>
  import login from './component/login'
export default {
  name: 'mine',
  data() {
    return {
      isLogin: false,
      Login: true,
      user: {}
    }
  },
  methods: {
    loginY(data){
      this.isLogin = !this.isLogin
      this.Login = !this.Login
      // console.log(data)
      this.user = data
      // login.vue登录后，解锁add和collect路由
      this.$emit('add',this.user.username)
      this.$emit('collect',this.user)
      // console.log(this.user)
    },
    outLogin() {
      this.isLogin = !this.isLogin
      this.Login = !this.Login
      this.user = {}
      this.$emit('collect',this.user)
      // console.log(this.user)
    },
    set(user) {
      this.$router.push({name: 'set', params: {user}});
    }
  },
  components: {
    login
  }
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .mine
    width: 100%
    .aaa
      .pic
        .welcome
          width: 100%
          margin: 20% 0 30px 0
          height: 50px
          line-height: 50px
          text-align: center
          font-size: 30px
          font-style: italic
          color: rgba(128, 100, 120, 1.0)
        img
          display: block
          margin: 0 auto
          height: 250px
        .icon-set
          margin: 30px 0 15px 0
          font-size: 25px
          text-align: center
    .out
      position: fixed
      bottom: 40px
      width: 100%
      height: 35px
      line-height: 35px
      text-align: center
      background: rgba(200, 0, 0, 0.6)
      color: white
    .loginCom
      width: 100%
</style>
