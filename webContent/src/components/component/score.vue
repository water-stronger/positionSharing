<template>
    <div class="score">
      <div @click="back" class="icon-back"></div>
      <div class="header">"{{item.placeName}}"评分页面</div>
      <div class="star">
        <p>评分:</p>
        <ul class="comment">
          <li class="number" v-for="(number, index) in this.num" :key="index" :name = "number"  @click="getNumber(number)">{{number}}</li>
        </ul>
      </div>
      <div class="footer">
        <div class="yes" @click="sendNumber">确定</div>
        <div class="no" @click="back">取消</div>
      </div>
    </div>
</template>

<script>
  const $ = require('jquery')
export default {
  name: 'score',
  data() {
    return {
      item: {

      },
      num: [1, 2, 3, 4, 5],
      number: Number
    }
  },
  methods: {
    back() {
      this.$router.go(-2)
    },
    getNumber(number){
      // console.log(item)
      $(".star .comment li").removeClass("active")
      $(".star .comment li").eq(number-1).addClass("active");
      this.number = number
    },
    sendNumber() {
      //
      $.ajax({
        url: 'http://172.20.10.2:3000/api/score',
        dataType: 'jsonp',
        data: {
          score: this.number,
          placeName: this.item.placeName
        },
        success:  response => {
          // console.log(response)
          $(".star .comment li").removeClass("active")
          alert(response.message)
          // 如果跳转到上一层的话，因为activated的存在，会重新接收数据，所以不能go(-2)
          this.$router.go(-2)
        }
      })
  }
  },
  created() {
      this.item = this.$route.params.item;
      // console.log(this.item.placeName);
      this.getNumber()
  },
  // 如果没有keep-alive，不会加载这个函数
  activated: function() {
    // 重新赋值给item
    this.item = this.$route.params.item;
    // console.log(this.item.placeName)
  },
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .score
    .icon-back
      font-size: 30px
      width: 100%
      height: 40px
      line-height: 40px
      padding-left: 20px
      background: rgba(128, 128, 128, 0.25)
      margin-bottom: 15px
    .header
      margin-top: 20%
      font-size: 25px
      text-align: center
      color: rgba(0, 100, 0, 0.7)
      font-style: italic
    .star
      margin-top: 28px
      text-align: center
      p
        text-align: center
        font-size: 25px
        color: rgba(255, 0, 0, 0.7)
      ul
        margin-top: 15px
      ul li
        width: 60px
        height: 60px
        line-height: 60px
        text-align: center
        border-radius: 50%
        border: 1px solid skyblue
        font-size: 28px
        display: inline-block
        cursor: pointer
        color: teal
        margin: 10px 3px 12px 10px
      ul li.active
        color: darkorange
        background: rgb(135, 206, 235)

    .footer
      margin-top: 100px
      width: 100%
      height: 80px
      /*border: 1px solid blue*/
      display: flex
      text-align: center
      font-size: 24px
      line-height: 80px
      .yes
        flex: 1
        color: blue
      .no
        flex: 1
</style>
