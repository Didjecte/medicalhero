import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import FormData from '../components/FormData.vue'
import NavMenu from '../components/NavMenu.vue'
import Login from '../components/Login.vue'
import Thank from '../components/Thank.vue'
import AdminHome from '../components/admin/AdminHome.vue'
import UserHome from '../components/user/UserHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: NavMenu,
    children: [
      { path: '/', redirect: '/login' },
      { path: '/devis', name: 'Devis', component: FormData },
      { path: '/validationDevis', name: 'ValidationDevis', component: Thank },
      { path: '/login', name: 'Login', component: Login, meta: { notConnected: true } },
      { path: '/user', name: 'User', component: UserHome, meta: { requiresUser: true } },
      { path: '/admin', name: 'Admin', component: AdminHome, meta: { requiresAdmin: true } } // 添加该字段表示进入此路由需要登录
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAdmin)) { // 判断当前路由是否需要权限
    if (store.getters.isLoggedIn) { // 判断当前是否存在token
      if (store.getters.permission >= 512) { // (1000000000)
        next()
      } else {
        next('/user')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }

  if (to.matched.some((record) => record.meta.requiresUser)) { // 判断当前路由是否需要权限
    if (store.getters.isLoggedIn) { // 判断当前是否存在token
      if (store.getters.permission < 512) { // (1000000000)
        next()
      } else {
        next('/admin')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }

  if (to.matched.some((record) => record.meta.notConnected)) { // 判断当前路由是否需要权限
    if (store.getters.isLoggedIn) { // 判断当前是否存在token
      if (store.getters.permission >= 512) { // (1000000000)
        next('/admin')
      } else {
        next('/user')
      }
    } else {
      next()
    }
  } else {
    next()
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) { // 判断当前路由是否需要权限
    if (store.getters.isLoggedIn) { // 判断当前是否存在token
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
