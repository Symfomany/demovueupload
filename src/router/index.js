import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Private from '@/components/Private'
import Regenerate from '@/components/Regenerate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/private',
      name: 'private',
      component: Private
    },
    {
      path: '/regenerate',
      name: 'regenerate',
      component: Regenerate
    }
  ]
})
