import { list, detail, create ,allow} from '@/api/refund'

const state = {
    amountFinally: 99.4,
    amountRefundTotal: null,
    datelineCreate: 1606289576631,
    datelineCreateReadable: "",
    datelineEnd: null,
    datelineEndReadable: null,
    deliveryPerson: "aaa",
    deliveryPhone: "bbb",
    id: 1,
    orderFormId: 34,
    orderFormRefundProductList: [],
    orderFormSerialNum: "",
    reasionDescription: "11",
    reasonImageList: [],
    reasonType: 1,
    reasonTypeText: "质量问题",
    status: 1,
    statusText:'',
    serialNum:'',
    refundList:[]
}

const mutations = {
    SET_REFUND_LIST: (state, data) =>{
        state.refundList = data
    },
    SET_LOAD: (state, data) => {
        Object.keys(state).forEach(key=>{state[key] = data[key]})
    },
    CHECK_PRODUCT: (state, data) =>{
        var arr  = [];
        state.refundList.map(item => {
            if(item.id == data)
                item.checked = !item.checked
            arr.push(item)
        })
        state.refundList = arr
    },
    CHECK_NUM: (state, data) =>{
        var arr  = [];
        state.refundList.map(item => {
            if(item.id == data.id)
                item.sum = data.sum
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
    allow({ commit }, data){
        return new Promise((resolve, reject) =>{
            allow({...data}).then((res) => {
                commit('SET_LOAD', res.result.orderFormDetail)
                res.result.list.map(item => {
                    item.checked = 
                    item.quantity = item.quantityAllowRefund
                    item.id = item.orderFormProductId
                    item.sum = item.quantity
                })
                commit('SET_REFUND_LIST', res.result.list)
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
