<template>
    <div class="contentShare">
      <div @click="back" class="icon-back"></div>
      <div class="header">{{item.placeName}}</div>
      <div class="pic">
        <img :src="item.path" alt="无图">
      </div>
      <div class="content">
        <div class="score">
          <div class="all">
            <div class="one">总分: {{item.score}}分</div>
            <span class="two">(评分人次：{{item.people}})</span>
          </div>
          <div class="jump" v-show="show" @click="score(item)">我想评分(点击评分)</div>
        </div>
        <span>作者:{{item.username}}</span>
        <div class="sum">
          <p>详细描述：</p>
          <span>{{item.descri}}</span>
        </div>
        <div id="allmap" ref="allmap"></div>
      </div>
      <div class="description">
        <div class="bbb">
          全部评论:
          <span v-if="!show">登录后才可以评论！</span>
        </div>
        <div class="solid"></div>
        <!--用v-if就根本不会传值-->
        <div v-show="show">
          <people-talking :placeName="item.placeName" :commentData="comment" :concernUser="concernUser"></people-talking>
        </div>
      </div>
    </div>
</template>

<script>
  import PeopleTalking from './peopleTalking'
  const $ = require('jquery')
  export default {
    name: 'contentShare',
    data() {
      return {
        item: {

        },
        concernUser: {},
        city: "",
        comment: {},
        show: false
      }
    },
    watch: {

    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      score(item) {
        // console.log(item.placeName);
        this.$router.push({name: 'score', params: {item}});
      },
      theLocation() {
        // console.log(this.item);
        let map = new BMap.Map(this.$refs.allmap);
        map.addControl(new BMap.NavigationControl());
        var local = new BMap.LocalSearch(map, {
          renderOptions:{map: map},

        });
        // console.log(this.item.placeName)
        var city = this.item.placeName;
        if(city != ""){
          local.search(city);
          map.addControl(new BMap.MapTypeControl({//添加地图类型控件
            mapTypes:[
              BMAP_NORMAL_MAP,
              BMAP_HYBRID_MAP
            ]}));
          map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

        }
      },
      isShow() {
        if(this.concernUser.username === undefined) {
          console.log('没有登录！')
          this.show = false
        }else{
          this.show = true
        }
      }
    },
    mounted() {
      this.item = this.$route.params.item;
      // console.log(this.item)
      this.comment = this.item.comment
      // console.log(this.comment)
      this.concernUser = this.$route.params.concernUser
      console.log(this.concernUser.username)
      this.theLocation()
    },
    activated: function() {
      // if(this.$route.params.item == 'undefined') {
      //   return
      // } else {
      if(this.$route.params.item !== undefined) {
        this.item = this.$route.params.item;
        // console.log(this.item)
        this.comment = this.item.comment
      }

      // 这里的this.concernUser变化了，但是正向传值的数据不变
      if(this.$route.params.concernUser !== undefined) {
        this.concernUser = this.$route.params.concernUser;
      }
      // console.log(this.concernUser.username)
        this.theLocation()
        // console.log(this.item)
      this.isShow()
    },
    components: {
      PeopleTalking

    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
.contentShare
  .icon-back
    position: fixed
    top: 0
    left: 0
    width: 100%
    font-size: 32px
    color: orangered
    height: 40px
    line-height: 40px
    padding-left: 20px
    background: rgb(0, 160,180)
    z-index: 99
  .header
    margin-top: 45px
    color: rgba(227, 119, 71, 0.9)
    text-align: center
    font-size: 25px
  .pic
    width: 100%
    margin: 0 auto
    height: 230px
    text-align: center
    line-height: 100px
    img
      width: 100%
      height: 220px
  .content
    .score
      width: 100%
      text-align: center
      margin: 15px auto
      .all
        .one
          color: red
          font-size: 27px
        .two
          color: rgba(200, 0, 0, 0.8)
          font-size: 13px
      .jump
        font-size: 17px
        color: rgba(255, 165, 0, 0.6)
    .sum
      font-style: italic
      margin-bottom: 10px
      p
        font-size: 20px
        color: rgba(140, 190, 200, 0.9)
        margin-left: 15px
      span
        color: dimgrey
        display: block
        font-size: 18px
        width: 95%
        height: 60px
        border: 0.08px solid grey
        padding-left: 4px
        border-radius: 5px
        margin: 0 auto
    span
      font-size: 22px
      color: skyblue
      /*margin-left: 20px*/

    #allmap
      width: 100%
      height: 260px
  .description
    .bbb
      margin: 20px 0 40px 20px
      font-size: 22px
      font-style: italic
      font-weight: bold
      span
        font-size: 16px
        color: rgba(255, 69, 0, 0.6)
    .solid
      width: 90%
      margin: 0 auto
      border: 0.5px solid rgba(128, 128, 128, 0.5)
</style>
