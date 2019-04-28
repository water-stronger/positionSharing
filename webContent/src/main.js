// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import './public/icomoon/style.css'
// import BMap from 'vue-baidu-map'
// import peopleTalking from './components/component/peopleTalking'

//
// router.beforeEach((to, from, next) => {
//   console.log("from",from);
//   console.log("to:",to);
//   console.log("----------");
//   if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
//     if(localStorage.getItem('access_token')){ //判断本地是否存在access_token
//       next();
//     }else {
//       if(to.path === '/mine'){
//         next();
//       }else {
//         next({
//           path:'/mine'
//         })
//       }
//     }
//   }
//   else {
//     next();
//   }
//   /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
//   if(to.fullPath == "/mine"){
//     if(localStorage.getItem('access_token')){
//       next({
//         path:from.fullPath
//       });
//     }else {
//       next();
//     }
//   }
// });

// Vue.use(BMap, {
//   ak: 'YOUR_APP_KEY'  //这个地方是官方提供的ak密钥
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render: h => h(App),
  components: { App },
  template: '<App/>'
})
router.push('./first')
