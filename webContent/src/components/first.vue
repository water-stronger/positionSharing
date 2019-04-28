<template>
    <div class="first">
      <div class="header">
        <div class="GPS" @click="position">{{this.city}}(重选)</div>
        <div class="go" @click="showView">
          <div class="search">
            <a><b></b></a>
            <input type="text"  placeholder="请输入你要搜索的地方名字">
          </div>
        </div>
        <search-view v-show="isShow" @close="showView" :concernUser="concernUser"></search-view>
      </div>
      <div class="content">
        <div class="aaa" v-for="(item, index) in place" :key="index">
          <div  @click="picShow(item,index)" :class="{ bbb: index === nowActive}">
            {{item}}
          </div>
        </div>
        <div class="show" ref="show">
          <div>
            <pic-show :data="show" :concernUser="concernUser"></pic-show>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import picShow from './component/picShow'
  import BScroll from 'better-scroll'
  import axios from 'axios'
  import searchView from './component/SearchView'
export default {

  name: 'first',
  props: {
    concernUser: {}
  },
  data () {
    return {
      city: '惠州',
      place: ["美食","酒店","学习培训","电影","景点"],
      nowActive: 0,
      showPic: [],
      show: [],
      showDetail: [],
      isShow: false
    }
  },
  methods: {
    position() {
      this.$router.push('/position')
      // console.log(this)
    },
    showView() {
      this.isShow = !this.isShow
    },
    picShow(item,index) {
      this.show = [];
      // 请求后台数据库数据
      this.nowActive = index;
      axios.post("http://172.20.10.2:2000/api/showPic", {
      }).then( response => {
        this.showPic =  response.data.message;
        // console.log(this.showPic)
        for(var i = 0; i < this.showPic.length; i++){
          if(this.showPic[i].style === item &&
            this.showPic[i].city === this.city) {
            this.show.push(this.showPic[i]);
          }
        }
        // console.log(this.show)
      });
    },
    firstLook() {
      axios.post("http://172.20.10.2:2000/api/showPic", {
      }).then( response => {
        this.show = [];
        this.showPic =  response.data.message;
        for(var i = 0; i < this.showPic.length; i++){
          if(this.showPic[i].style === "美食" && this.showPic[i].city === this.city) {
            this.show.push(this.showPic[i]);
          }
        }
        // console.log(this.show)
      });
    }
  },

  components: {
    picShow,
    searchView
  },
  created() {
    this.firstLook()
    // 初始化的时候，让美食那一模块显示
    this.nowActive = 0
    this.$nextTick(() => {
      this.showscroll = new BScroll(this.$refs.show, {
        click: true
      })
    })
  },
  activated: function() {
      // 切换路由时，保持模块不变；切换城市的时候才改变
    if(this.city !== this.$route.params.area && this.$route.params.area !== undefined) {
      this.city = this.$route.params.area;
      this.nowActive = 0
      this.firstLook();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .first {
    font-size: 16px;
  }
  .header {
    color: #5bc0de;
    width: 100%;
    display: flex;
    height: 30px;
    margin-top: 10px;
    line-height: 30px;
  }
  .GPS {
    flex: 1;
    font-size: 13px;
    border: 0.5px solid rgba(117, 171, 242, 0.8);
    border-radius: 8px;
    text-align: center
  }
  .go {
    flex: 4;
    margin-left: 5px;
    /*border: 1px solid blue;*/
    border-radius: 8px;
  }
  .search {
    position: relative;
    height: 32px;
    border: 1px solid skyblue;
    border-radius: 5px;
    box-sizing: border-box
  }
  .search a {
    width: 35px;
    height: 35px;
    position: absolute;
    right: 0;
    top: 0
  }
  .search b {
    background: url(../public/img/iconbg.png) no-repeat 0 -28px;
    background-size: 30px 150px;
    display: block;
    width: 30px;
    height: 33px
  }
  .search input {
    width: 78%;
    height: 19px;
    padding: 8px 10px 6px 10px;
    border: none;
    outline: none;
    font-weight: 600;
    font-size: 14px
  }
  .content   {
    display: flex;
  }
  .content .aaa {
    flex: 1;
    text-align: center;
    font-size: 18px;
    color: grey
  }
  /*叠加CSS样式*/
  .content  .bbb {
    border-bottom: 1px solid rgba(240, 120, 0, 0.8);
    color: rgba(240, 120, 0, 0.8);
    padding-bottom: 5px
  }
  .content {
    width: 100%;
    margin-top: 12px;
  }
  .show {
    width: 100%;
    position: fixed;
    top: 95px;
    bottom: 42px;
    margin: 0 auto;
    overflow: hidden;
  }
</style>
