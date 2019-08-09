import Vue from 'vue'
import Router from 'vue-router'
import userinfo from '../components/Main/userinfo'
import software from '../components/Main/software'
import essay from '../components/Main/essay'
import video from '../components/Main/video'
import award from '../components/Main/award'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: userinfo
    },{
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo
    },{
      path: '/software',
      name: 'software',
      component: software
    },{
      path: '/essay',
      name: 'essay',
      component: essay
    },{
      path: '/video',
      name: 'video',
      component: video
    },{
      path: '/award',
      name: 'award',
      component: award
    }
  ]
})
