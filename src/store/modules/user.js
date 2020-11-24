import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken, setUserId } from '@/utils/auth'
import  { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userid: '',
  name: '',
  avatar: '',
  introduction: '',
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
  }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password }).then(response => {
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

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
        logout({ user_id: state.userid, token: state.token }).then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_USER_ID', '')
            removeToken()
            resetRouter()
            dispatch('tagsView/delAllViews', null, { root: true })

            resolve()
        }).catch(error => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_USER_ID', '')
            removeToken()
            dispatch('tagsView/delAllViews', null, { root: true })
            reject(error)
        })
        })
    },

    


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
