import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '', /* 请求的状态 */
    token: window.localStorage.getItem('token') || '',
    userId: '', /* 用户的ID */
    permission: 0, /* 账户0什么都不能做 账户1做少东西 账户2做很多东西 */
    /* 用户后台1，超级管理员2，啥都不是为0跳回表单 */
    user: null
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, { token, userId, permission }) {
      state.status = 'success'
      state.token = token
      state.userId = userId
      state.permission = permission
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.userId = ''
      state.permission = 0
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'https://www.medicalhero.fr/api/user/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const userId = resp.data.userId
            const permission = +resp.data.permission
            window.localStorage.setItem('token', token)
            axios.defaults.headers.common.Authorization = token
            commit('auth_success', { token, userId, permission })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            window.localStorage.removeItem('token')
            reject(err)
          }).then()
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        window.localStorage.removeItem('token')
        delete axios.defaults.headers.common.Authorization
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    permission: state => state.permission
  },
  modules: {
  }
})
