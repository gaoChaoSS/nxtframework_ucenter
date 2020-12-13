import { create } from '@/api/recharge'


const actions = {
    // eslint-disable-next-line no-empty-pattern
    create({ } , data) {
        return new Promise((resolve, reject) => {
            create({...data }).then((response) => {
                window.open(response.result.redirectURL)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },

  
}

export default {
  namespaced: true,
  actions
}
