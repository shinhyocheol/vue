import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // mutations
  state: {
    accessUser: null,
    accessToken: null,
    accessLevel: null
  },
  getters: {

  },
  mutations: {
    LOGIN (state, item) {
      state.accessUser = item['admin_id']
      state.accessToken = item['x-access-token']
      state.accessLevel = item['authority_level']
      if (window.localStorage) {
        localStorage.setItem("ACCESS_USER", state.accessUser)
        localStorage.setItem("ACCESS_TOKEN", state.accessToken)
        localStorage.setItem("ACCESS_LEVEL", state.accessLevel)
      }
    },
    LOGOUT (state) {
      state.accessUser = null
      state.accessToken = null
      state.accessLevel = null
      if (window.localStorage) {
        localStorage.setItem("ACCESS_USER", null)
        localStorage.setItem("ACCESS_TOKEN", null)
        localStorage.setItem("ACCESS_LEVEL", null)
      }
    }
  },
  actions: {
    LOGIN ({commit}, {id, password}) {
      const params = new URLSearchParams()
      const url = "http://localhost:8080/signin"
      params.append("id", id)
      params.append("password", password)
      return axios.post(url, params).then(result => {
        commit('LOGIN', result.data)
      })
    },
    LOGOUT ({commit}) {
      commit('LOGOUT')
    }
  }
})
