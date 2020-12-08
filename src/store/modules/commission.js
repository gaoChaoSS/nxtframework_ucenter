import { detail } from '@/api/commisson'
const state = {
    balanceAll: 0,
    balanceAllowTransfer: 0,
    balanceIsRejected: 0,
    balanceIsTransfering: 0,
}

const mutations = {
    SET_DATA:(state, data) =>{
        state = {...data}
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
