<template>
    <div class="add">
      <div class="none" v-if="isShow">
        <div class="tip">您还没有登录呢!</div>
        <div @click="login" class="login">去登录</div>
      </div>
      <div class="content" v-show="!isShow">
        <div class="header">请上传你的喜欢你的地方</div>
        <div class="form">
        <!--<form method="post" action="http://172.20.10.2:2000/api/share" class="form" enctype="multipart/form-data">-->
          <div class="style">
            <label>选择上传类型：</label>
            <select name="style" id="" v-model="style">
              <option value ="美食">美食</option>
              <option value ="酒店">酒店</option>
              <option value="学习培训">学习培训</option>
              <option value="电影">电影</option>
              <option value="景点">景点</option>
            </select>
          </div>
          <div class="pic">
            <label>上传该地方的图片:</label>
            <input type="file" id="file-id" @change="readFile()"/>
            <img src="" id="img-id"/>
            <br/>
            <p>上传图片不能大于2M</p>
          </div>
          <div class="text">
            所属城市:<input type="text" name="city" class="city" v-model="city" required>
          </div>
          <div class="text">
            <p>详细描述:</p>
            <textarea name="text" placeholder="介绍一下该地点特别之处" required v-model="description"></textarea>
          </div>
          <div id="allmap" ref="allmap"></div>
          <div id="r-result">
            <div class="address">
              地址:<input id="cityName" name="address" type="text" placeholder="输入具体的位置(必填)，按查询地址是否出错" v-model="address"/>
              <input type="button" value="查询" class="button" @click="theLocation" required />
            </div>
            <div class="jwd">
              经度:<input type="text" placeholder="不填" name="经度" id="jd" />
              纬度:<input type="text" placeholder="不填" name="纬度" id="wd"/>
            </div>
          </div>
          <div class="submit">
            <!--<button type="submit" class="one" >提交</button>-->
            <!--<button type="reset">重置</button>-->
            <button @click="submit" class="one" >提交</button>
            <button @click="clear">重置</button>
          </div>
        </div>
        <!--</form>-->
      </div>
    </div>
</template>

<script>
  const $ = require('jquery')
  export default {
    name: 'add',
    props: {
      concernUser: {}
    },
    data()  {
        return {
          num: [1, 2, 3, 4, 5],
          isShow: true,
          style: '',
          city: '',
          description: '',
          address: ''
        }
    },
    methods:{
      // 上传地方后，清空input的内容
      clear() {
        document.getElementById('img-id').src = '';
        this.style = ''
        this.city = ''
        this.description = ''
        this.address = ''
      },
      //  1、显示想要显示的地方
      map(){
        let map =new BMap.Map(this.$refs.allmap); // 创建Map实例
        map.centerAndZoom(new BMap.Point(114.422486,23.114548), 12.5);// 初始化地图,设置中心点坐标（经纬度/城市的名称）和地图级别
        map.addControl(new BMap.MapTypeControl({//添加地图类型控件
          mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
          ]}));
        // map.setCurrentCity("惠州");// 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        // map.setMapStyle({style:'midnight'});//地图风格

      // 2、随机点击地图中的地点获得经度和纬度 —— 为加上
        map.addEventListener("click",function(e){
          var input =  document.getElementById('wd');
          var input2 =  document.getElementById('jd');
          input.value = e.point.lng;
          input2.value= e.point.lat;
        });
      },
      // 3、点击搜索，获得的地点用map地图显示出来
      theLocation() {
        let map = new BMap.Map(this.$refs.allmap);
        map.addControl(new BMap.NavigationControl());
        var local = new BMap.LocalSearch(map, {
          renderOptions:{map: map},

        });
        var city = document.getElementById("cityName").value;
        if(city != ""){
          local.search(city);
          map.addControl(new BMap.MapTypeControl({//添加地图类型控件
            mapTypes:[
              BMAP_NORMAL_MAP,
              BMAP_HYBRID_MAP
            ]}));
          map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

          map.addEventListener("click",function(e){
            var input =  document.getElementById('wd');
            var input2 =  document.getElementById('jd');
            input.value = e.point.lng;
            input2.value= e.point.lat;
          });
        }
      },

      readFile(){
        var imgFile=document.getElementById('file-id').files[0];
        //创建filereader对象
        var fileReader = new FileReader();
        //设置回调函数，即获取到文件路径后的操作
        fileReader.onload = function(){
          document.getElementById('img-id').src = fileReader.result;
        }
        //读取文件
        fileReader.readAsDataURL(imgFile);
      },
      login() {
        this.$router.push('/mine')
      },
      show() {
        if(this.concernUser.username !== undefined) {
          console.log('有数据')
          this.isShow = false
          this.isLogin = true
        }else{
          // if(this.concernUser.username === undefined) {
          console.log('没有有数据')
          this.isShow = true
          this.isLogin = false
          // }
        }
      },
      submit() {
        // 某个数据为空都不能提交
        if(this.style === '' || this.city === '' || this.description === '' || this.address === ''  ) {
          alert("信息没有填写完整！")
        }else{
          var file = $("#file-id")[0];
          var formData = new FormData();        //实例化表单提交数据对象
          formData.append("username", this.concernUser.username);
          formData.append("file",file.files[0]);
          formData.append("style",this.style);
          formData.append("city",this.city);
          formData.append("description",this.description);
          formData.append("address",this.address);
          $.ajax({
            url:"http://172.20.10.2:2000/api/share",
            type:"post",
            data: formData,
            cache:false,
            contentType:false,
            processData:false,
            success:(data) => {
              // $("#img").attr("src",data.url);
              if(data.message === '上传成功！'){
                alert(data.message)
                document.getElementById('img-id').src = '';
                this.style = ''
                this.city = ''
                this.description = ''
                this.address = ''
              }else{
                alert(data.message)
              }
            }
          })
        }
      }
    },
    watch: {
      isShow(newValue, oldValue) {
        // console.log(oldValue)
        // console.log(newValue)
      }
    },
    activated: function() {
      this.map()
      this.show()
    },
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .add
    margin-bottom: 40px
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
    .content
      .header
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 35px
        line-height: 35px
        color: deepskyblue
        text-align: center
        font-size: 20px
        background: rgb(255, 166, 49)
      .form
        padding-top: 45px
        .style
          font-style: italic
          font-size: 18px
          select
            font-size: 16px
            color: deepskyblue
            border: 1px solid deepskyblue
            width: 90px
        .pic
          label
            font-style: italic
            font-size: 18px
          input
            font-size: 13px
          #img-id
            display: block
            margin: 10px auto  3px
            width: 260px
            height: 130px
          p
            color: orangered
            font-size: 12px
            text-align: center
            margin-top: -20px
        .text
          display: flex
          font-style: italic
          font-size: 17px
          width: 100%
          height: 50px
          margin: 15px 0 10px 0
          line-height: 50px
          .city
            border: 1px solid skyblue
            border-radius: 6px
            font-size: 14px
            color: skyblue
            height: 40px
            margin: 6px 0 10px 10px
            padding-left: 10px
          textarea
            flex: 1
            border: 1px solid skyblue
            border-radius: 6px
            font-size: 14px
            color: skyblue
          p
            padding-right: 6px

        .star
          margin-top: 25px
          text-align: center
          p
            text-align: center
            font-size: 20px
            color: rgba(255, 0, 0, 0.7)
          ul li
            width: 40px
            height: 40px
            line-height: 40px
            text-align: center
            border-radius: 50%
            border: 1px solid skyblue
            font-size: 18px
            display: inline-block
            cursor: pointer
            color: teal
            margin: 10px 3px 12px 10px
          ul li.active
            color: orangered
            background: rgba(135, 206, 235, 0.8)

        #allmap
          width: 100%
          height: 250px
        #r-result
          font-size: 17px
          margin-top: 10px

          #cityName
            margin: 10px 5px 10px 5px
            color: skyblue
            font-size: 10px
            width: 72%
            height: 25px
            border: 1px solid rgba(0, 191, 255, 0.4)
            border-radius: 4px
            padding: 4px 0 2px 4px
          .button
            font-size: 13px
            width: 42px
            height: 25px
            border-radius: 4px
            background: rgba(118, 208, 237, 0.6)
          .jwd
            display: flex
          .jwd input
            flex: 1
            font-size: 12px
            color: darkred
            border: 1px solid rgba(0, 191, 255, 0.4)
            padding-left: 4px
            border-radius: 4px
            margin-left: 4px
        .submit
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
