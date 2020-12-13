import request from '@/utils/request'


// 获得代码
export function code(data) {
  return request({
    url: '/api/user/withdraw/verify_code',
    method: 'post',
    data
  })
}

export function create(data) {
    return request({
        url: '/api/user/withdraw/create',
        method: 'post',
        data
    })
}