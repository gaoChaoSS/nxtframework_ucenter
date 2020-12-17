import { detail, cash, list } from '@/api/commisson'
const state = {
    balanceAll: 0,
    balanceAllowTransfer: 0,
    balanceIsRejected: 0,
    balanceIsTransfering: 0,
    list:[]
}

const mutations = {
    SET_DATA:(state, data) =>{
        Object.keys(state).forEach(key=>{state[key] = data[key]})
    },
    SET_LIST:(state, data) => {
        state.list = data
    }
}

const actions = {
    // eslint-disable-next-line no-empty-pattern
    detail({ commit }) {
        return new Promise((resolve, reject) => {
        detail({ guestToken:state.guestToken }).then(response => {
            commit('SET_DATA', response.result)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    // eslint-disable-next-line no-empty-pattern
    cash({}) {
        return new Promise((resolve, reject) => {
            cash({}).then(() => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    list({ commit }, data) {
        return new Promise((resolve, reject) => {
            list({...data}).then((res) => {
                commit('SET_LIST', res.result)
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
