import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    postId: null,
    userCmtDlt: 'http://localhost:3000/api/comment/',
    adminCmtDlt: 'http://localhost:3000/api/admin/comment/'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
