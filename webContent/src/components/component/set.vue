<template>
    <div class="set">
      <div class="icon-back" @click="back"></div>
      <div class="solid"></div>
      <div class="pic">
          <label>上传您的大头照:</label>
          <input type="file" id="file" @change="readFile()"/>
           <img src="" id="img-id"/>
          <br/>
          <p>上传图片不能大于2M</p>
        </div>
      <div class="Yes">
        <button @click="dataSend" class="one">确定</button>
        <button @click="back">取消</button>
      </div>
    </div>
</template>

<script>
  const $ = require('jquery')
  // import axios from 'axios'
  export default {
    name: 'set',
    data() {
      return{
        user: {}
      }
    },
    methods: {
      back(){
        // var a = {a: 1, b: 2};
        // var b = {a: 2, b: 3, c: 4};
        // var c =Object.assign(b, a);
        // console.log(c);
        this.$router.go(-1)
      },
      readFile(){
        var imgFile = document.getElementById('file').files[0];
        //创建filereader对象
        var fileReader = new FileReader();
        //设置回调函数，即获取到文件路径后的操作
        fileReader.onload = function(){
          document.getElementById('img-id').src = fileReader.result;
        }
        //读取文件
        fileReader.readAsDataURL(imgFile);
      },
      dataSend() {
        // $("#file").change(function(){
          var file = $("#file")[0];                 //jq->js
          var formData = new FormData();        //实例化表单提交数据对象
          formData.append("file",file.files[0]);
          formData.append("user",this.user.username);
          // console.log(user)   {user: "爆头大哥"}
          // var obj = Object.assign(formData, user);
          // console.log(obj);
          $.ajax({
            url:"http://172.20.10.2:2000/api/set",
            type:"post",
            data: formData,
            cache:false,
            contentType:false,
            processData:false,
            success:(data) => {
              // $("#img").attr("src",data.url);
              console.log(data);
              if(data.message == '上传图片成功！'){
                alert(data.message)
                document.getElementById('img-id').src = '';
                this.$router.go(-1)
              }
            }
          })
        // })
      }
    },
    activated: function() {
      this.user = this.$route.params.user;
      // console.log(this.user)
    },
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .set
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: white
    z-index: 9999
    .icon-back
      font-size: 30px
      margin: 15px 0 15px  15px
    .solid
      border: 0.3px solid skyblue
      margin-bottom: 20px
    .pic
      label
        font-style: italic
        font-size: 20px
        color: #0d87ba
      input
        font-size: 13px
      #img-id
        width: 100%
        height: 300px
      p
        color: orangered
        font-size: 12px
        text-align: center
    .Yes
      text-align: center
      button
        margin: 25px
        width: 50px
        height: 30px
        text-align: center
        border-radius: 4px
        color: grey
      .one
        color: rgba(255, 0, 0, 0.8)


</style>
