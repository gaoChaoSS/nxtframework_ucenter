import { list, detail, create } from '@/api/refund'

const state = {
    amountFinally: 99.4,
    amountRefundTotal: null,
    datelineCreate: 1606289576631,
    datelineCreateReadable: "2020-11-25 15:32:56",
    datelineEnd: null,
    datelineEndReadable: null,
    deliveryPerson: "aaa",
    deliveryPhone: "bbb",
    id: 1,
    orderFormId: 34,
    orderFormRefundProductList: [],
    orderFormSerialNum: "NXT1605857984204SLKPYV",
    reasionDescription: "11",
    reasonImageList: [],
    reasonType: 1,
    reasonTypeText: "质量问题",
    status: 1,
    statusText:'',
    refundList:[]
}

const mutations = {
    SET_REFUND_LIST: (state, data) =>{
        state.refundList = data
    },
    SET_LOAD: (state, data) => {
        state = {...data}
    },
    CHECK_PRODUCT: (state, data) =>{
        var arr  = [];
        state.refundList.map(item => {
            if(item.id == data)
                item.checked = !item.checked
            arr.push(item)
        })
        state.refundList = arr
    }
}

const actions = {
    list({ commit }, data) {
        console.log(data)
        return new Promise((resolve, reject) => {
            list({...data}).then((response) => {
                // console.log(response.result)
                commit('SET_REFUND_LIST', response.result)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // eslint-disable-next-line no-empty-pattern
    detail({ commit }, data){
        return new Promise((resolve, reject) =>{
            detail({...data}).then((res) => {
                commit('SET_LOAD', res.result)
                res.result.orderFormRefundProductList.map(item => {
                    item.checked = true
                    item.sum = item.quantity
                })
                commit('SET_REFUND_LIST', res.result.orderFormRefundProductList)
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
