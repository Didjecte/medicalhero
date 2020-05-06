import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import FormData from '../components/FormData.vue'
import NavMenu from '../components/NavMenu.vue'
import Login from '../components/Login.vue'
import Thank from '../components/Thank.vue'
import AdminHome from '../components/admin/AdminHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: NavMenu,
    children: [
      { path: '/', redirect: '/login' },
      { path: '/devis', name: 'Devis', component: FormData },
      { path: '/validationDevis', name: 'ValidationDevis', component: Thank },
      { path: '/login', name: 'Login', component: Login },
      { path: '/admin', name: 'Admin', component: AdminHome, meta: { requiresAuth: true } } // 添加该字段表示进入此路由需要登录
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
