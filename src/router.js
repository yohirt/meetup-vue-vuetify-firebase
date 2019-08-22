import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from './components/home'
import Meetups from './components/Meetup/Meetups'
import CreateMeetup from './components/Meetup/CreateMeetup'
import Meetup from './components/Meetup/Meetup'
import Profile from './components/User/Profile'
import Signin from './components/User/Signin'
import Signup from './components/User/Signup'
import AuthGuard from './components/router/auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: Meetups
    },
    {
      beforeEnter: AuthGuard,
      path: '/createmeetup',
      name: 'createmeetup',
      component: CreateMeetup,
      
    },
    {
      path: '/meetup/:id',
      props:true,
      name: 'Meetup',
      component: Meetup
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
    // {
    //   path: '/',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
