import request from '@/utils/request'


export function list(data) {
  return request({
    url: '/api/order_form_refund/list',
    method: 'post',
    data
  })
}

export function detail(data){
    return request({
        url: '/api/order_form_refund/detail',
        method: 'post',
        data
    })
}

export function create(data){
  return request({
    url: '/api/order_form_refund/create',
    method: 'post',
    data
  })
}