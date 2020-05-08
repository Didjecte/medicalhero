import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import axios from 'axios'
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
      { path: '/login', name: 'Login', component: Login },
      { path: '/user', name: 'User', component: UserHome },
      {
        path: '/admin',
        name: 'Admin',
        component: AdminHome,
        async beforeEnter (to, from, next) {
          try {
            console.log(to.path)
            if (store.state.token) {
              if (store.getters.permission !== 0) {
                if (store.getters.permission >= 512) {
                  next()
                } else {
                  next('/user')
                }
              } else {
                axios.defaults.headers.common.Authorization = window.localStorage.getItem('token')
                console.log('redo')
                var hasPermission = await store.dispatch('reAuth')
                if (hasPermission.data.permission >= 512) {
                  next()
                } else {
                  next('/user')
                }
              }
            } else {
              next('/login')
            }
          } catch (e) {
            console.log(e)
            next('/login')
          }
        }
      } // 添加该字段表示进入此路由需要登录
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAdmin)) { // 判断当前路由是否需要权限
//     if (store.getters.isLoggedIn) { // 判断当前是否存在token
//       if (store.getters.permission === 0) {
//         store.dispatch('reAuth', window.localStorage.getItem('token'))
//           .then((x) => {
//             if (store.getters.permission >= 512) { // (1000000000)
//               next()
//             } else {
//               console.log('admin!' + store.getters.permission)
//               next('/user')
//             }
//           })
//       } else {
//         if (store.getters.permission >= 512) { // (1000000000)
//           next()
//         } else {
//           console.log('admin2!' + store.getters.permission)
//           next('/user')
//         }
//       }
//     } else {
//       next('/login')
//     }
//   } else {
//     console.log('test')
//     next()
//   }

//   if (to.matched.some((record) => record.meta.requiresUser)) { // 判断当前路由是否需要权限
//     if (store.getters.isLoggedIn) { // 判断当前是否存在token
//       if (store.getters.permission === 0) {
//         store.dispatch('reAuth', window.localStorage.getItem('token'))
//           .then(() => {
//             if (store.getters.permission < 512) { // (1000000000)
//               next()
//             } else {
//               console.log('user!' + store.getters.permission)
//               next('/admin')
//             }
//           })
//       } else {
//         if (store.getters.permission < 512) { // (1000000000)
//           next()
//         } else {
//           console.log('admiN!')
//           next('/admin')
//         }
//       }
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }

//   if (to.matched.some((record) => record.meta.notConnected)) { // 判断当前路由是否需要权限
//     if (store.getters.isLoggedIn) { // 判断当前是否存在token
//       if (store.getters.permission === 0) {
//         store.dispatch('reAuth', window.localStorage.getItem('token'))
//           .then(() => {
//             if (store.getters.permission >= 512) { // (1000000000)
//               next('/admin')
//             } else {
//               console.log('connected!' + store.getters.permission)
//               next('/user')
//             }
//           })
//       } else {
//         if (store.getters.permission >= 512) { // (1000000000)
//           next('/admin')
//         } else {
//           next('/user')
//         }
//       }
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }

//   if (to.matched.some((record) => record.meta.requiresAuth)) { // 判断当前路由是否需要权限
//     if (store.getters.isLoggedIn) { // 判断当前是否存在token
//       next()
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
