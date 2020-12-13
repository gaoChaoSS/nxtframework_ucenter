import request from '@/utils/request'


// 查看余额详情
export function list(data) {
  return request({
    url: '/api/user/address/list',
    method: 'post',
    data
  })
}

export function save(data) {
    return request({
        url: '/api/user/address/save',
        method: 'post',
        data
    })
}

export function defaults(data) {
    return request({
        url: '/api/user/address/set_default',
        method: 'post',
        data
    }) 
}