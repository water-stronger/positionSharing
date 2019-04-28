
import Vue from 'vue'
import Router from 'vue-router'
import first from '@/components/first'
import video from '../components/video'
import add from '../components/add'
import concern from '../components/concern'
import mine from '../components/mine'
import contentShare from '../components/component/contentShare'
import score from '../components/component/score'
import position from '../components/position'
import set from '../components/component/set'

Vue.use(Router)

// 暴露路由
export default new Router({
  routes: [
    {path: '/first', name: 'first', component: first },
    {path: '/video', name: 'video', component: video },
    {path: '/add', name: 'add', component: add },
    {path: '/concern', name: 'concern', component: concern },
    {path: '/mine', name: 'mine', component: mine},
    {path: '/contentShare', name: 'contentShare', component: contentShare },
    {path: '/score', name: 'score', component: score},
    {path: '/position', name: 'position', component: position },
    {path: '/set', name: 'set', component: set }
  ],
  // 被覆盖的路由默认携带的类，改名为active
  linkActiveClass: 'active'
})
