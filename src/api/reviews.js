import request from '@/utils/request'


export function detail(data) {
  return request({
    url: '/api/order_form/reviews/detail',
    method: 'post',
    data
  })
}

export function create(data){
    return request({
        url: '/api/order_form/reviews/create',
        method: 'post',
        data
    })
}