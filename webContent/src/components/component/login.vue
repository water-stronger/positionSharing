<template>
  <div class="login">
    <div class="header" v-if="login">登录
      <div class="form">
        <div class="userid">
          帐号:<input type="text" ref="username" placeholder="输入9位用户名" name="username" required="">
        </div>
        <div class="psw">
          密码:<input type="password" ref="password" placeholder="密码" name="password"   required="">
        </div>
        <button type="submit" @click="Login">登录</button>
        <div class="register">
          <span>还没有帐号？</span>
          <p @click="isRegister">立即注册</p>
        </div>
    </div>
    </div>
    <div class="header" v-if="register">注册
      <div class="register" >
        <div class="userid">
          帐号:<input type="text" ref="username" placeholder="输入9位用户名" name="username" required="">
        </div>
        <div class="psw">
          密码:<input type="password" ref="password" placeholder="密码"  name="password" required="">
        </div>
        <div class="pswComfirm">
          确认密码:<input type="password" ref="passwordAgain" placeholder="确认密码"  name="password" required="">
        </div>
        <button type="submit" @click="Register">注册</button>
        <div class="register">
          <p  @click="isLogin">点击这里登录</p>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import axios from 'axios'
  const $ = require('jquery');
  export default {
    name: 'login',
    props: {

    },
    data() {
        return {
            login: true,
            register: false,
            username: '',
            password: ''
        }
    },
    methods: {
        isRegister() {
            this.login = !this.login;
            this.register = !this.register
        },
        isLogin() {
            this.login = !this.login;
            this.register = !this.register
        },
      // 判断是否登录
        Login()  {
          axios.post("http://172.20.10.2:2000/api/login", {
                'username': this.$refs.username.value,
                'password': this.$refs.password.value,
              }).then((response) => {
                // console.log(response.data);
                if(response.data == '没有这个帐号！'){
                  alert('没有这个帐号！或密码错误！');
                }else {
                  this.$emit('login', response.data)
                }
          })
        },
        Register()  {
          if (this.$refs.password.value !== this.$refs.passwordAgain.value){
            alert("两次密码不一致！请重新输入")
            this.$refs.passwordAgain.value = ''
            // console.log(this)
          }else {
            axios.post("http://172.20.10.2:2000/api/register", {
              'username': this.$refs.username.value,
              'password': this.$refs.password.value,
            }).then(function(result){
              alert(result.data.message);
              console.log(result.data.message)
            })
          }
          if(this.$refs.password.value === this.$refs.passwordAgain.value){
             this.login = !this.login;
             this.register = !this.register
          }
        }
    }
      
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .login
    width: 100%
    height: 50%
    margin-top: 20%
    background: rgb(242, 242, 245)
    .header
      padding: 30px 0 10px 0
      color: rgba(0, 0, 0, 0.9)
      font-size: 24px
      display: block
      text-align: center
      font-weight: inherit
    .form, .register
      margin-top: 18px
      text-align: center
      font-size: 18px
      div
        margin-top: 7px
        color: rgba(124, 130, 168, 0.9)
      input
        padding-left: 8px
        margin-left: 5px
        height: 25px
        border: 1px solid skyblue
        border-radius: 4px
        font-size: 15px
      button
        background-color: rgb(255, 155, 36)
        margin-top: 20px
        width: 225px
        height: 32px
      .register
        span
          font-size: 14px
        p
          margin: 6px 0px 0px -8px
          cursor: pointer
          font-size: 16px
          color: rgb(251, 133, 108)
      .pswComfirm
        margin-left: -28px
        color: red
        font-size: 16px
</style>
