import { detail, list } from '@/api/balance'
const state = {
    balanceTotal: 0,
    totalWithdrawRejected: 0,
    totalRechargeSuccess: 0,
    balanceCanWithdraw: 0,
    totalWithdrawing: 0,
    totalWithdrawSuccess: 0,
    list:[]
}

const mutations = {
    SET_DETAIL:(state, data) =>{
        Object.keys(state).forEach(key=>{state[key] = data[key]})
    },
    SET_LIST: (state, data) => {
        state.list = data
    }
}

const actions = {
    detail({ state,commit }) {
        return new Promise((resolve, reject) => {
        detail({ guestToken:state.guestToken }).then(response => {
            commit('SET_DETAIL', response.result)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    list({ commit }, data) {
        return new Promise((resolve, reject) => {
            list({...data}).then(res => {
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
