import { create, code } from '@/api/withdraw'


const actions = {
    // eslint-disable-next-line no-empty-pattern
    create({ }, data) {
        return new Promise((resolve, reject) => {
            create({ ...data}).then(() => {
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    // eslint-disable-next-line no-empty-pattern
    code({  }, data) {
        return new Promise((resolve, reject) => {
            code({...data}).then(() => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
  
}

export default {
  namespaced: true,
  actions
}
