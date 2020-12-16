import {  detail, create } from '@/api/reviews'

const state = {
    amountFinally: 99.4,
    orderFormProductList:[],
    orderFormDelivery:[],
    datelineCreateReadable:'',
    serialNum:'',
}

const mutations = {
    SET_LOAD: (state, data) => {
        Object.keys(state).forEach(key=>{state[key] = data[key]})
    },
}

const actions = {
    // eslint-disable-next-line no-empty-pattern
    detail({ commit }, data){
        return new Promise((resolve, reject) =>{
            detail({...data}).then((res) => {

                commit('SET_LOAD', res.result)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
     // eslint-disable-next-line no-empty-pattern
    create({ }, data){
        return new Promise((resolve, reject) =>{
            create({...data}).then((res) => {
                console.log(res)
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
