import { login, logout, register, balance } from '@/api/user'
import { getToken, setToken, removeToken, setUserId } from '@/utils/auth'
import  { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userid: '',
  name: '',
  avatar: '',
  introduction: '',
  balance: 0,
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_ID: (state, userid) => {
    state.userid = userid
  },
  SET_BALANCE: (state, balance) => {
    state.balance = balance
  }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password }).then(response => {
            console.log(response)
            const { token, user_id } = response.result
            commit('SET_TOKEN', token)
            commit('SET_USER_ID', user_id)
            setToken(token)
            setUserId(user_id)
            console.log(getToken())
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    register({ state }, userInfo) {
      const {username, password} = userInfo
      return new Promise((resolve, reject) => {
        register({ username: username.trim(), password: password }).then(() => {
            console.log(state)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
        logout({ user_id: state.userid, token: state.token }).then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_USER_ID', '')
            removeToken()
            resetRouter()

            resolve()
        }).catch(error => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_USER_ID', '')
            removeToken()
            reject(error)
        })
        })
    },
    balance({commit}) {
      return new Promise((resolve, reject) =>{
        balance().then((res) => {
          commit('SET_BALANCE', res.result)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
    


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
