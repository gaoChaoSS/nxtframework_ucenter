import { list, save, defaults } from '@/api/address'

const state = {
    list: []
}

const mutations = {
    SET_LIST: (state, data) => {
        let arr = []
        data.map(item => {
            item.address = item.regionCountryName +  item.regionProvinceName + item.regionCityName + item.deliveryAddress
            arr.push(item)
        })
        state.list = arr
    }
}

const actions = {
    // eslint-disable-next-line no-empty-pattern
    list({ commit }) {
        return new Promise((resolve, reject) => {
            list({}).then((res) => {
                commit('SET_LIST', res.result)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // eslint-disable-next-line no-empty-pattern
    save({} , data) {
        return new Promise((resolve, reject) => {
            save({...data}).then(() => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        }) 
    },
    // eslint-disable-next-line no-empty-pattern
    defaults({} , data) {
        return new Promise((resolve, reject) => {
            defaults({...data}).then(() => {
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
