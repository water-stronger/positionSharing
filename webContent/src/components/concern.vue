<template>
    <div class="concern">
      <div class="none" v-if="isShow">
        <div class="tip">您还没有登录呢!</div>
        <div @click="login" class="login">去登录</div>
      </div>
      <div @click="concernReq" v-if="!isShow" class="click">
        <div class="look">"{{this.concernUser.username}}"收藏的地点有:</div>
        <div v-show="num" class="num">{{this.concern.length}}处</div>
      </div>
      <div class="solid" v-if="!isShow"></div>
      <div class="content" v-show="isLogin" ref="content">
        <div>
           <div class="picShow">
          <div class="ccc" v-for="(item, index) in concern" :key="index">
            <div class="place" @click="contentShare(item, concernUser)" >
              <div class="pic">
                <img :src="item.path"/>
              </div>
              <div class="another">
                <div class="title">基本描述:{{item.descri}}</div>
                <div class="igs">作者:{{item.username}}</div>
                <div class="style">类型:{{item.style}}</div>
                <div class="placeName">地点:{{item.placeName}}</div>
                <!--<div class="igs">地点:{{item.city}}</div>-->
                <span></span>
              </div>
              <div class="score">{{item.score}}分</div>
            </div>
            <div class="del" @click="del(item)">删除</div>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  // const $ = require('jquery')
  export default {
    name: 'concern',
    props: {
      concernUser: {},
    },
    data() {
      return {
        num: false,
        isShow: true,
        isLogin: false,
        concernData: {
          type: Array
        },
        concern: {}
      }
    },
    methods: {
      contentShare(item, concernUser) {
        this.$router.push({name: 'contentShare', params: {item, concernUser}});
      },
      login() {
        this.$router.push('/mine')
      },
      show() {
        // console.log(this.concernUser.username)
        if(this.concernUser.username !== undefined) {
          // console.log('有数据')
          this.isShow = false
          this.isLogin = true
          // return
        }else{
          // if(this.concernUser.username === undefined) {
            console.log('没有有数据')
            this.isShow = true
            this.isLogin = false
          // }
        }
        },
      // 请求数据库的数据
      concernReq() {
        // console.log("切换路由，自动请求数据！")
        this.num = true
        // console.log( this.concernUser.username)
        // console.log(this.concernUser.concern)
        axios.post("http://172.20.10.2:2000/api/concern", {
          'username' : this.concernUser.username
        }).then((response) => {
          this.concern = response.data
          // console.log(this.concern)
        })
      },
      del(item) {
        // 去掉前端页面的显示
        for (var i = 0; i < this.concern.length; i++) {
          if (this.concern[i] === item) {
            // console.log(this.concern[i])
            this.concern.splice(i, 1)
          }
        }

        // 去掉后端页面的显示
        axios.post("http://172.20.10.2:2000/api/del", {
          'placeName' : item.placeName,
          'username' : this.concernUser.username
        }).then((response) => {
          // console.log(response.data)
        })
      }
    },
    created() {
      this.$nextTick(() => {
      this.contentscroll = new BScroll(this.$refs.content, {
        click: true
      })
    })
    },
    activated: function() {
      this.show()
      // console.log(this.concernUser.username)
      this.concernReq()

    },
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .concern
    width: 100%
    .none
      font-size: 32px
      text-align: center
      margin-top: 30%
      font-style: italic
      .tip
        color: #0c7cb5
      .login
        font-size: 20px
        color: orangered
    .click
      margin-top: 15px
      text-align: center
      .look
        font-style: italic
        font-size: 23px
        color: rgba(30, 240, 255, 0.7)
      .num
        font-style: italic
        margin: 5px auto
        font-size: 22px
        color: rgba(250, 100, 120, 0.8)
    .solid
        margin-bottom: 15px
        width: 100%
        border: 0.5px solid skyblue
    .content
      width: 100%
      position: fixed
      top: 100px
      bottom: 42px
      margin: 0 auto
      overflow: hidden
      .picShow
        .ccc
          position: relative
          margin: 0 6px 15px 20px
          .place
            width: 100%
            display: flex
            border-bottom: 1px solid rgba(169, 169, 169, 0.6)
            margin-bottom: 25px
            .pic
              flex: 0 0 80px
              img
                border-radius: 8px
                width: 120px
                height: 110px
            .another
              padding-left: 20px
              .title
                margin-bottom: 8px
                color: rgba(210, 140, 0, 0.8)
                font-size: 15px
                white-space: nowrap
              .igs
                margin: 5px 0 5px 12px
                padding: 0 6px
                max-width: 180px
                font-size: 16px
                vertical-align: bottom
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
                color: rgb(147, 153, 159)
              .style
                margin-left: 18px
                width: 100%
                color: rgba(210, 80, 128, 0.9)
                font-size: 16px
              .placeName
                font-size: 17px
                white-space: nowrap
                margin-top: 8px
                font-weight: bolder
                color: rgba(20,10,10,0.5)
            .score
              top: 28px
              right: 14px
              position: absolute
              color: indianred
          .del
            position: absolute
            top: 42px
            right: -5px
            font-size: 17px
            padding: 2px
            margin: 10px 15px 15px
            width: 55px
            height: 25px
            background-color: rgba(128, 128, 128, 0.8)
            line-height: 20px
            text-align: center
            border-radius: 4px
            color: white

</style>
