import Vue from 'vue'
import Router from 'vue-router'
import theUserInfo from '../components/Main/the-userInfo'
import theSoftware from '../components/Main/the-software'
import theEssay from '../components/Main/the-essay'
import theVideo from '../components/Main/the-video'
import theAward from '../components/Main/the-award'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: theUserInfo
    },
    {
      path: '/the-userInfo',
      name: 'theUserInfo',
      component: theUserInfo
    },{
      path: '/the-software',
      name: 'theSoftware',
      component: theSoftware
    },{
      path: '/the-essay',
      name: 'theEssay',
      component: theEssay
    },{
      path: '/the-video',
      name: 'theVideo',
      component: theVideo
    },{
      path: '/the-award',
      name: 'theAward',
      component: theAward
    }
  ]
})
