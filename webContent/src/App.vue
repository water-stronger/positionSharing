<template>
  <div id="app">
    <div class="router">
      <div class="tab">
        <router-link to="/first">首页</router-link>
      </div>
     <div class="tab">
       <router-link to="/video" >
         <span>视频</span>
       </router-link>
     </div>
     <div class="tab">
       <router-link to="/add" class="icon-add2"></router-link>
     </div>
    <div class="tab">
      <router-link to="/concern">关注</router-link>
    </div>
    <div class="tab">
      <router-link to="/mine">我的</router-link>
    </div>
    </div>
    <keep-alive>
      <router-view  @collect="collectShow" :concernUser="user" ></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // show: false,
      user: {}
    }
  },
  methods: {
    // addShow(user) {
    //   this.username =  user
    //   console.log(this.username)
    // },
    collectShow(user) {
      this.user =  user
    },
  }
}
</script>

<style>
  .router {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 40px;
    background: skyblue;
    font-style: italic;
  }
  .tab {
    flex: 1;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
  }
  .icon-add2 {
    line-height: 40px;
    font-size: 25px
  }
  a {
    display: block;
    color: rgb(77, 85, 93);
  }
  div a.active {
    color: darkgoldenrod;
  }
</style>
