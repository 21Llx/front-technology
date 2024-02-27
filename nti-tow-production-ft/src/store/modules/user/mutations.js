
import router from "@/router"
export default {
  login(state, data) {
    state.isLogin = true
    state.token = data.tokenValue
    state.userinfo = { loginId: data.loginId }
    state.tokenKey = data.tokenName
  },

  logout(state) {
    state.isLogin = false
    state.token = ''
    state.userinfo = ''
    state.tokenKey = ''
    router.push('/login')
  }

}
