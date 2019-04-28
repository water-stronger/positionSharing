<template>
  <div class="details">
    <div class="conScroll" ref="scroll">
      <div>
        <div>
          <div class="comment">
            <div class="comment_top">
              <span></span>
              <!--<span class="comCount">{{commentCount}}条评论</span>-->
            </div>
            <div class="showComment">
              <div v-for="(val, index) in commentData" :key="index" class="comFor">
                <img :src="val.pic" width="20">
                <div class="comBox">
                  <div class="user">
                    <span class="userID">{{val.user}}</span>
                    <div class="comPraise_box" style="display: inline-block"
                         @click="clickPraise(index)">
                      <span class="comPraise">{{val.praise}}</span>
                      <i class="icon-praise"></i>
                    </div>
                  </div>
                  <div class="text">{{val.text}}</div>
                  <div class="timeBox">
                    <span class="time">{{val.time}}</span>
                    <span class="reply" @click="replyMsg(index)">回复</span>
                  </div>
                  <div class="replyBox" v-for="(rep, index) in val.reply" :key="index">
                    <div class="replyBottom"><span class="replyId">{{rep.replyId}}：{{rep.replyText}}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="writeComment">
      <input ref="focusInput" type="text" placeholder="请写下你的评论"  v-model="val" @keyup.enter="send">
      <span @click="send()">发送</span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import axios from 'axios'
  const $ = require('jquery')
  export default {
    name: 'peopleTalking',
    props: {
      commentData: {},
      concernUser: {},
      placeName: '',
    },
    created() {
      // console.log(this.commentData)    // 没有数据
      // this.commentCount = this.commentData.length;
    },
    watch: {
     concernUser(newValue,oldValue) {
       // console.log('新值:',newValue)
       // console.log('旧值:',oldValue)
       if(newValue.username !== undefined ) {
         this.user = newValue
         this.userId = this.user.username
         this.pic = this.user.pic
         // console.log(this.pic)
         // console.log(this.user)
       }
     }
    },
    data() {
      return {
        showShare: false,
        replys: false,
        replyNum: 0,
        // commentData: {},
        user: {},
        userId: '',
        pic:'',
        val: '',
        praiseNum: 0,
      }
    },
    methods: {
      // showComment() {
      //   this.showShare = !this.showShare
      //   if (this.showShare) {
      //     $('.comment').slideDown()
      //   } else {
      //     $('.comment').slideUp()
      //   }
      // },
      send() {
        //  评论发送到遍历的数据里面，遍历的数据直接显示出来
        if (this.val != '') {
          //疑问： this.val != null('')的区别
          if (this.replys) {
            // 回复
            this.commentData[this.replyNum].reply.push({'replyId': this.userId, 'replyText': this.val})
            this.replys = false
            var commentReply = []
            commentReply.push({'replyId': this.userId, 'replyText': this.val})
            axios.post("http://172.20.10.2:2000/api/commentReply", {
              data: {
                placeName: this.placeName,
                // user: this.commentData[this.replyNum].user,
                commentReply: commentReply,
                index: this.replyNum
              }
            }).then( response => {
              // props中的值能不能更改？！！
              // this.commentData =  response.data.message;
            });

          } else {
            // 添加新评论
            var newReply = []
            newReply.push({'user': this.userId, 'pic': this.pic, 'text': this.val, 'praise': 0, 'time': '刚刚', 'reply': []})
            // console.log(typeof(newReply))
            this.commentData.push({'user': this.userId, 'pic': this.pic, 'text': this.val, 'praise': 0, 'time': '刚刚', 'reply': []})

            axios.post("http://172.20.10.2:2000/api/commentAdd", {
              data: {
                placeName: this.placeName,
                newReply: newReply,
                index : this.replyNum
              }
            }).then( response => {
              // console.log(response.data.message);
            });
          }
        } else {
          alert("评论不能为空！！")
        }
        this.val = ''
      },
      clearPraise() {
        for(var i = 0; i <=  $('.comPraise_box').length; i++){
          $('.comPraise_box').eq(i).removeClass('comPraiseColor')
        }
      },
      clickPraise(i) {
        // 点赞加样式
        if ($('.comPraise_box').eq(i).hasClass('comPraiseColor')) {
          $('.comPraise_box').eq(i).removeClass('comPraiseColor')
          this.commentData[i].praise --
        // 点赞减少 —— 修改数据库内容
          axios.post("http://172.20.10.2:2000/api/commentPraise", {
            data: {
              placeName: this.placeName,
              praise: this.commentData[i].praise,
              index: i
            }
          }).then( response => {
            console.log(response.data.message);
          });

        } else {
          $('.comPraise_box').eq(i).addClass('comPraiseColor')
          this.commentData[i].praise ++
          // 点赞增加 —— 修改数据库内容
          axios.post("http://172.20.10.2:2000/api/commentPraise", {
            data: {
              placeName: this.placeName,
              praise: this.commentData[i].praise ,
              index: i
            }
          }).then( response => {
            // console.log(response.data.message);
          });
        }
      },
      replyMsg(i) {
        this.replys = true              // 能否让评论, 返回给data
        this.replyNum = i               // 评论哪一条数据，返回给data
        this.$refs.focusInput.focus()   // 聚焦到写评论的input标签里面
      },
    },
    activated: function() {
      // 重新进入，清除原来的点击样式
      this.clearPraise()
      // console.log(this.concernUser)
      // console.log(this.user.username)
      // console.log(this.commentData)
      }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .details
    /*position: fixed
    width: 100%
    background: #fff
    .conScroll
      top: 62px
      bottom: 45px
      width: 100%
      overflow: hidden
      .up
        margin-bottom: 50px
        .content
          padding: 10px 12px 0
          border-bottom: 6px solid #f6f6f6
          .text
            font-size: 17px
            line-height: 26px
            span
              display: block
          .imgs
            margin-top: 16px
            span
              margin: 1px
            img
              width: 109px
          .content_bottom
            margin: 0 30px
            padding: 14px 0
            .ask
              border-bottom: 1px solid #e6e6e6
              padding: 10px 0
              .icon
                display: inline-block
                width: 4px
                height: 4px
                border: 4px solid #4ba2dc
                border-radius: 50%
              .text
                font-size: 13px
                line-height: 16px
                vertical-align: top
                color: #4ba2dc
            .other
              display: flex
              margin-top: 10px
              height: 20px
              font-size: 14px
              & > div
                flex: 1
                text-align: center
                color: #595959
              .like, .trample
                span
                  font-size: 8px
                  vertical-align: top
              .redColor
                color: red
    .comment
      padding: 0 10px
      margin-bottom: 40px
      .comment_top
        display: flex
        margin: 26px auto
        font-size: 16px
        .comCount
          flex: 1
          font-weight: 600
      .showComment
        .comFor
          display: flex
          img
            flex: 0 0 26px
            width: 26px
            height: 26px
            vertical-align: center
          .comBox
            flex: 1
            margin-bottom: 30px
            .user
              display: flex
              .userID
                flex: 1
                margin-left: 4px
                font-size: 14px
                line-height: 30px
                vertical-align: top
              .comPraise
                margin-right: 1px
                font-size: 8px
                line-height: 30px
              i
                font-size: 18px
                line-height: 30px
              .comPraiseColor
                color: red
            .text
              padding: 10px 20px 20px 10px
            .timeBox
              margin-bottom: 10px
              .time
                font-size: 12px
                color: #ccc
              .reply
                font-size: 12px
                color: #444
            .replyBox
              padding: 6px 12px
              font-size: 14px
              line-height: 20px
              background: #f4f8fb
    .writeComment
      text-align: center
      position: fixed
      left: 0
      bottom: 0px
      display: flex
      width: 100%
      height: 40px
      input
        flex: 1
        height: 40px
        text-align: left
        line-height: 40px
        font-size: 18px
        box-shadow: none
        border-radius: 5px
        border: 1px solid rgba(128, 128, 128, 0.6)
      span
        flex: 0 0 40px
        height: 40px
        font-size: 18px
        color: blue
        background: skyblue
        line-height: 40px
        text-align: center
        border-radius: 4px
</style>
