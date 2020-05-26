import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import axios from 'axios'
import FormData from '../components/FormData.vue'
import NavMenu from '../components/NavMenu.vue'
import Login from '../components/Login.vue'
import Thank from '../components/Thank.vue'
import AdminHome from '../components/admin/AdminHome.vue'
import Test from '../components/admin/Test.vue'
import Deal from '../components/admin/Deal.vue'
import UserHome from '../components/user/UserHome.vue'
import NotFound from '../components/NotFound.vue'
import QbConnect from '../components/QbConnect.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: NavMenu,
    children: [
      { path: '/', redirect: '/login' },
      { path: '/devis', name: 'Devis', component: FormData },
      { path: '/qbConnect', name: 'QbConnect', component: QbConnect },
      { path: '/validationDevis', name: 'ValidationDevis', component: Thank },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter
      },
      {
        path: '/user',
        name: 'User',
        component: UserHome,
        beforeEnter
      },
      {
        path: '/admin',
        name: 'Admin',
        component: AdminHome,
        beforeEnter
      },
      {
        path: '/test',
        name: 'Test',
        component: Test,
        beforeEnter
      },
      {
        path: '/deal/:dealId',
        name: 'Deal',
        component: Deal,
        beforeEnter
      },
      {
        path: '*', // *表示匹配所有路由,只要是匹配不到的路由,都会跳到这个组件去
        name: 'NotFound',
        component: NotFound
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

async function beforeEnter (to, from, next) {
  try {
    if (window.localStorage.getItem('token')) {
      if (store.getters.permission !== 0) {
        if (store.getters.permission < 512 && store.getters.permission >= 2) {
          if (to.path === '/admin' ||
              to.path === '/test' ||
              to.path === '/deal' ||
              to.path === '/login') {
            next('/user')
          } else {
            next()
          }
        } else if (store.getters.permission >= 512 && store.getters.permission >= 2) {
          if (to.path === '/user' ||
          to.path === '/login') {
            next('/admin')
          } else {
            next()
          }
        } else {
          if (to.path !== '/login') {
            next('/login')
          } else {
            next()
          }
        }
      } else {
        axios.defaults.headers.common.Authorization = window.localStorage.getItem('token')
        var hasPermission = await store.dispatch('reAuth', window.localStorage.getItem('token'))
        if (hasPermission.data.permission < 512 && store.getters.permission >= 2) {
          if (to.path === '/admin' ||
              to.path === '/test' ||
              to.path === '/login') {
            next('/user')
          } else {
            next()
          }
        } else if (hasPermission.data.permission >= 512 && store.getters.permission >= 2) {
          if (to.path === '/user' ||
          to.path === '/login') {
            next('/admin')
          } else {
            next()
          }
        } else {
          if (to.path !== '/login') {
            next('/login')
          } else {
            next()
          }
        }
      }
    } else {
      if (to.path !== '/login') {
        next('/login')
      } else {
        next()
      }
    }
  } catch (e) {
    console.log(e)
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
}

export default router
