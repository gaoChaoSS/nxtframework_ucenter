import request from '@/utils/request'


// 查看余额详情
export function detail(data) {
  return request({
    url: '/api/user/transaction/balance_detail',
    method: 'post',
    data
  })
}

// 收支明细
export function list(data) {
    return request({
        url: '/api/user/transaction/list',
        method: 'post',
        data
    })
}