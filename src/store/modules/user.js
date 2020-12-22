import {
  login, logout, register,
  balance, info, verify_code,
  email_update, email_code,
  email_move, phone_code,
  phone_update, phone_remove_code,
  phone_remove, pwd_code,
  pwd_reset,invited_list, pwdReset
} from '@/api/user'
import { getToken, setToken, removeToken, removeGuestToken, removeUserId, setUserId } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userid: '',
  name: '',
  avatar: '',
  introduction: '',
  balance: 0,
  roles: [],
  username: '',
  avatarPicUrl: '',
  email: '',
  phone: '',
  inviteCode: '',
  inviteUrl: '',
  inviteUrlQrImageUrl: '',
  invited_list:[],
  statusText:''
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
    state.avatarPicUrl = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_ID: (state, userid) => {
    state.userid = userid
  },
  SET_BALANCE: (state, balance) => {
    state.balance = balance
  },
  SET_INFO: (state, data) => {
    Object.keys(state).forEach(key => { state[key] = data[key] })
  },
  SET_INVITED_LISS: (state, data) => {
    state.invited_list =  data
  },
  SET_EMAIL: (state, data) => {
    state.email = data
  },
  SET_PHONE: (state, data) => {
    state.phone =  data
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
    return new Promise((resolve, reject) => {
      register({ ...userInfo }).then(() => {
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
        removeGuestToken()
        removeUserId()
        resetRouter()

        resolve()
      }).catch(error => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_USER_ID', '')
        removeToken()
        removeGuestToken()
        removeUserId()
        reject(error)
      })
    })
  },
  balance({ commit }) {
    return new Promise((resolve, reject) => {
      balance().then((res) => {
        commit('SET_BALANCE', res.result)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  info({ commit }) {
    return new Promise((resolve, reject) => {
      info().then((res) => {
        commit('SET_INFO', res.result)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line no-empty-pattern
  verify_code({ }, data) {
    return new Promise((resolve, reject) => {
      verify_code({ ...data }).then((res) => {
        console.log(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line no-empty-pattern
  email_update({ }, data) {
    return new Promise((resolve, reject) => {
      email_update({ ...data }).then((res) => {
        console.log(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line no-empty-pattern
  email_code({ }, data) {
    return new Promise((resolve, reject) => {
      email_code({ ...data }).then((res) => {
        console.log(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line no-empty-pattern
  email_move({ }, data) {
    return new Promise((resolve, reject) => {
      email_move({ ...data }).then((res) => {
        console.log(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // eslint-disable-next-line no-empty-pattern
  phone_code({ }, data) {
    return new Promise((resolve, reject) => {
      phone_code({ ...data }).then((res) => {
        console.log(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line no-empty-pattern
  phone_update({ }, data) {
    return new Promise((resolve, reject) => {
      phone_update({ ...data }).then((res) => {
        console.log(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line no-empty-pattern
  phone_remove_code({ }, data) {
    return new Promise((resolve, reject) => {
      phone_remove_code({ ...data }).then((res) => {
        console.log(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line no-empty-pattern
  phone_remove({ }, data) {
    return new Promise((resolve, reject) => {
      phone_remove({ ...data }).then((res) => {
        console.log(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line no-empty-pattern
  pwd_code({ }, data) {
    return new Promise((resolve, reject) => {
      pwd_code({ ...data }).then((res) => {
        console.log(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line no-empty-pattern
  pwd_reset({ }, data) {
    return new Promise((resolve, reject) => {
      pwd_reset({ ...data }).then((res) => {
        console.log(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line no-empty-pattern
  pwdReset({ }, data) {
    return new Promise((resolve, reject) => {
      pwdReset({ ...data }).then((res) => {
        console.log(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  invited_list({commit}, data) {
    return new Promise((resolve, reject) => {
      invited_list({...data}).then((res) => {
        commit('SET_INVITED_LISS', res.result)
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
