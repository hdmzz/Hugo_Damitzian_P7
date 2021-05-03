import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import inscription from '../views/SignUp';
import connectionVue from '../views/Connexion';
import PostsVue from '../views/Posts';
import test from '../views/test';
import CreatePostVue from '../views/CreatePost';
import AccountVue from '../views/Account';
import PostVue from '../views/Post';

const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/',
      name: 'inscription',
      component: inscription,
      meta: {
        guest: true
      }
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsVue,
      meta: {
        requiresAuth: true
      }
    }, 
    {
      path: '/connexion',
      name: 'connexion',
      component: connectionVue,
      meta: {
        guest: true
      }
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {
        guest: true
      }
    },
    {
      path: '/createPost',
      name: 'createPost',
      component: CreatePostVue,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: AccountVue,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostVue,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
});


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('token') == null) {
          next({
              path: '/connexion',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('userId'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                  next({ name: 'connexion'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('token') == null){
          next()
        } else {
      next()
  }
}})


export default router
