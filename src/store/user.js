export default {
  state: {
    userInfo: null
  },
  mutations: {
    setUser (state, userInfo) {
      state.userInfo = userInfo
    }
  }
}
