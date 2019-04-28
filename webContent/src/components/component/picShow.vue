<template>
    <div class="picShow">
      <div class="ccc" v-for="(item, index) in data" :key="index">
        <div class="place" @click= "contentShare(item, concernUser)" >
          <div class="pic">
            <img :src="item.path"/>
          </div>
          <div class="another">
            <div class="title">基本描述:{{item.descri}}</div>
            <div class="igs">作者:{{item.username}}</div>
            <div class="style">类型:{{item.style}}</div>
            <div class="placeName">地点:{{item.placeName}}</div>
            <span></span>
          </div>
          <div class="score">{{item.score}}分</div>
        </div>
        <div class="collect" @click="collect(item)">收藏</div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'picShow',
    props: {
      data: {
        type: Array
      },
      concernUser: {}
    },
    data() {
      return {}
    },
    methods: {
      // 跳转到地点展示页面，携带要遍历的数据以及判断是否有登录
      contentShare(item, concernUser) {
        this.$router.push({name: 'contentShare', params: {item, concernUser}});
      },
      // 收藏先判断
      collect(item) {
        if (this.concernUser.username ===  undefined) {
          alert("请先登录！")
        } else{
          axios.post("http://172.20.10.2:2000/api/collect", {
            'username': this.concernUser.username,
            'item': item,
          }).then((response) => {
            console.log(response.data)
            alert(response.data.message)
          })
        }
      }
    },
    activated: function() {
      // console.log(this.concernUser.username)
      // console.log(this.data)
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
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
          padding-left: 18px
          .title
            margin-bottom: 8px
            color: rgba(210, 140, 0, 0.8)
            font-size: 15px
            white-space: nowrap
          .igs
            margin: 5px 0 5px 12px
            padding: 0 3px
            max-width: 180px
            font-size: 16px
            vertical-align: bottom
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            color: rgb(147, 153, 159)
          .style
            margin-left: 15px
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
      .collect
        position: absolute
        top: 38px
        right: -13px
        font-size: 17px
        padding: 2px
        margin: 10px 15px 15px
        width: 70px
        height: 20px
        line-height: 20px
        text-align: center
        border-radius: 4px
        color: grey
</style>
