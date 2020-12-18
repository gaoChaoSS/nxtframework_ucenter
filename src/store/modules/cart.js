import { detail, addProduct, delProduct, selectProduct ,info} from '@/api/cart'
import { getGuestToken, setGuestToken } from '@/utils/auth'
const state = {
    productList:[],
    cartProductList:[],
    guestToken:getGuestToken(),
    deliveryPerson:'',
    deliveryProvince:'',
    deliveryCity:'',
    deliveryAddress: '',
    deliveryPhone:'',
    deliveryConfigId:1,
    deliveryConfig:'',
    dealPlatform:1,
    deliveryRemark:'',
    deliveryCountry:'',
    countAll:0
}

const mutations = {
  SET_PRODUCT_LIST: (state, data) => {
    state.productList = data
  },
  SET_PRODUCT_NUM: (state, data) => {
    state.productList.map(element => {
        if(element.id == data.id) {
        element.quantity = data.num
        }
    });
  },
  DEl_PRODUCT:(state, data) =>{
    let arr = [];
    state.productList.map(element => {
        if(element.id != data.id) {
            arr.push(element)
        }
    });
    state.productList = arr
  },
  CHECK_PRODUCT: (state, data) =>{
    let arr = [];
    state.productList.map(element => {
        if(element.id == data.id) {
            if(element.checkout)
            element.checkout = false
            else
            element.checkout = true
        }
        arr.push(element)
    }); 
    state.productList = arr
  },
  CHECK_ALL: (state, data) => {
    let arr = [];
    state.productList.map(element => {
        if(!element.invalid){
            element.checkout = data
            arr.push(element)
        }        
    }); 
    state.productList = arr
  },
  SET_ADDRESS: (state, data) =>{
      const {deliveryPerson,deliveryProvince,deliveryCity,
        deliveryAddress,deliveryPhone,deliveryConfigId,
        deliveryConfig,dealPlatform,deliveryRemark,deliveryCountry} = data;
      state.deliveryPerson = deliveryPerson
      state.deliveryProvince = deliveryProvince
      state.deliveryCity = deliveryCity
      state.deliveryAddress = deliveryAddress
      state.deliveryPhone = deliveryPhone
      state.deliveryConfigId = deliveryConfigId
      state.deliveryConfig = deliveryConfig
      state.dealPlatform = dealPlatform
      state.deliveryRemark = deliveryRemark
      state.deliveryCountry = deliveryCountry
  },
  BUY_PRODUCT:(state, data) =>{
    state.cartProductList = data
  },
  SET_GUESTTOKEN:(state, data) => {
    state.guestToken = data
  },
  SET_COUNT: (state, data) => {
    state.countAll =  data
  }
}

const actions = {
    detail({ state,commit }, data ={}) {
        return new Promise((resolve, reject) => {
        detail({ guestToken:state.guestToken,...data }).then(response => {
            const { itemList, guestToken} = response.result
            itemList.map(item =>{
                if(!item.invalid){
                    item.checkout = item.selected
                }else{
                    item.checkout = false
                }                
             })
             if(guestToken != state.getGuestToken) {
                setGuestToken(guestToken)
                commit('SET_GUESTTOKEN', guestToken)
             }
            commit('SET_PRODUCT_LIST', itemList)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    // eslint-disable-next-line no-empty-pattern
    addProduct({ }, data) {
        const {  product } = data;
        return new Promise((resolve, reject) => {
            addProduct({ product:product,guestToken:state.guestToken}).then(() => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    delProduct({state}, data) {
        return new Promise((resolve, reject) => {
            delProduct({guestToken:state.guestToken,product:data}).then(() => {
                // commit('DEl_PRODUCT', {id:data.id})
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    selectProduct({state, commit}, data) {
        return new Promise((resolve, reject) => {
            selectProduct({guestToken: state.guestToken, product: data}).then(() => {
                commit('CHECK_PRODUCT', data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // eslint-disable-next-line no-empty-pattern
    info({ commit, state }) {
        return new Promise((resolve, reject) => {
            info({ guestToken:state.guestToken }).then((res) => {
                commit('SET_COUNT',res.result.countAll)
                // console.log(res)
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
