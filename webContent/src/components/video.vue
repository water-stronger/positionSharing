<template>
    <div class="film">
      <div class="header">精选小视频</div>
      <div class="content" v-for="(item, index) in video" :key="index">
        <div class="video">
          <video :src="item.src" class="videoForm" poster="../assets/logo.png" style="width: 100%;height: 120px;"></video>
        </div>
        <div class="footer">
          <!--设置播放/暂停-->
        <div class="play" @click="play(index)">放</div>
          <div class="stop" @click="stop(index)">停</div>
          <!--设置进度条-->
          <div class="line">
            <div class="bar" ref="bar"></div>
          </div>
          <!--设置时间-->
          <div class="time">
            <span class="current" ref="current">00:00:00</span>/<span class="total" ref="total">00:00:00</span>
          </div>
        </div>
        <div class="description">
          描述：
          <span>
            {{item.description}}
          </span>
        </div>
        <div class="author">
          <span>作者:林水强</span>
          <div class="icon-praise" @click ="praiseAdd"></div>
        </div>
      </div>
    </div>
</template>

<script>
  const $ = require('jquery');
export default {
  name: 'film',
  data() {
    return {
      isPlay: false,
      praise: true,
      video: []
    }
  },
  methods: {
      // 播放
    play(index) {
      // console.log(index);
      var video = $(".film .content .videoForm")[index];
      // console.log(video)
        video.play()
      },
      // 全部时间
      // var totalTime = video.duration;
      // var h = Math.floor(totalTime/3600);
      // h=h>10?h:"0"+h;
      // var m = Math.floor(totalTime/60);
      // m=m>10?m:"0"+m;
      // var s = Math.floor(totalTime%60);
      // s=s>10?s:"0"+s;
      //
      // this.$refs.total.innerHTML=h+":"+m+":"+s;
      //
      // // console.log(totalTime)
      //
      // video.ontimeupdate = function(){
      //
      //   var currentTime = video.currentTime;
			// 		// console.log(currentTime)
      // // 进度时间
      //   var hour = Math.floor(currentTime/3600);
      //   hour=hour>10?hour:"0"+hour;
      //   var min = Math.floor(currentTime/60);
      //   min=min>10?min:"0"+min;
      //   var second = Math.floor(currentTime%60);
      //   second = second > 10 ? second:"0"+second;
      //   document.querySelector(".current").innerHTML=hour+":"+min+":"+second;
      //
      //   /*设置进度条*/
      //   var demo = currentTime/totalTime;
			// 		// console.log(demo)
      //   document.querySelector(".bar").style.width = demo*300+"px"
      //   if(demo == 1){
      //     document.querySelector(".bar").style.borderRadius = 0;
      //   }
      //
      // };
      // 全部时间
      // var totalTime = video.duration;
      // var h = Math.floor(totalTime/3600);
      // h=h>10?h:"0"+h;
      // var m = Math.floor(totalTime/60);
      // m=m>10?m:"0"+m;
      // var s = Math.floor(totalTime%60);
      // s=s>10?s:"0"+s;
      //
      // this.$refs.total.innerHTML=h+":"+m+":"+s;
      //
      // // console.log(totalTime)
      //
      // video.ontimeupdate = function(){
      //
      //   var currentTime = video.currentTime;
			// 		// console.log(currentTime)
      // // 进度时间
      //   var hour = Math.floor(currentTime/3600);
      //   hour=hour>10?hour:"0"+hour;
      //   var min = Math.floor(currentTime/60);
      //   min=min>10?min:"0"+min;
      //   var second = Math.floor(currentTime%60);
      //   second = second > 10 ? second:"0"+second;
      //   document.querySelector(".current").innerHTML=hour+":"+min+":"+second;
      //
      //   /*设置进度条*/
      //   var demo = currentTime/totalTime;
			// 		// console.log(demo)
      //   document.querySelector(".bar").style.width = demo*300+"px"
      //   if(demo == 1){
      //     document.querySelector(".bar").style.borderRadius = 0;
      //   }
      //
      // };
    // },
      // 暂停
    stop(index) {
      // console.log(index);
      var video = $(".film .content .videoForm")[index];
      // console.log(video);
      video.pause();
   },
    praiseAdd () {
      this.praise = !this.praise
    }
  },
  mounted() {
  $.ajax({
      url: 'http://172.20.10.2:2000/api/video',
      dataType: 'json',
      data: {
        aaa: 1,
      },
    // 注意this的指向问题
      success: (response) =>{
        // console.log(response)
        this.video = response.video;
        // console.log(this.video[0]);
        // console.log(this.video)
      }
    })
  }
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .film
    width: 100%
    .header
      width: 100%
      font-size: 22px
      text-align: center
      color: skyblue
    .content
      width: 90%
      border: 1px solid rgba(135, 206, 235, 0.6)
      border-radius: 5px
      margin: 10px auto 20px
      .video
        #video
          width: 100%
          margin: 0 auto
          height: 150px
      .footer
        width: 100%
        height: 40px
        background: #ccc
        display: flex
      .footer > div:hover
        cursor: pointer
      .footer .play
        float: left
        width: 45px
        height: 26px
        background: skyblue
        border-radius: 50%
        margin: 10px 7px 0 4px
        text-align: center
      .footer .stop
        float: left
        width: 40px
        height: 25px
        background: indianred
        border-radius: 50%
        margin-top: 10px
        text-align: center
      .footer .line
        float: left
        width: 300px
        height: 10px
        background: #333
        margin-top: 17px
        margin-left: 5px
      .footer .line .bar
        width: 0px
        height: 10px
        background: skyblue
        border-top-right-radius: 5px
        border-bottom-right-radius: 5px
      .footer .time
        width: 120px
        height: 20px
        text-align: center
        line-height: 20px
        margin-top: 12px
        font-size: 12px
        float: left
      .description
        background: rgba(0, 0, 0, 0.6)
        color: white
        text-align: center
      .author
        span
          margin-left: 20%
          color: rgba(0, 120, 120, 0.6)
        div
          float: right
          margin-top: 5px
          margin-right: 25%

</style>
