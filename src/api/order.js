import request from '@/utils/request'


// /api/order_form/create 用户购物车商品下单
export function create(data) {
    return request({
      url: '/api/order_form/create',
      method: 'post',
      data
    })
}
  
// /api/order_form/delivery_config/list 查询运费模板列表（配送方式）；
export function deliveryConfigList(data) {
    return request({
      url: '/api/order_form/delivery_config/list',
      method: 'post',
      data
    })
}
  
// /api/order_form/delivery_region/list 国家列表；【parentId=0就是顶级国家列表】
export function deliveryRegionList(data) {
    return request({
      url: '/api/order_form/delivery_region/list',
      method: 'post',
      data
    })
}
// /api/order_form/delivery_cost 根据国家、省份、城市id和选中的运费模板id，查询运费；
export function deliveryCost(data) {
    return request({
      url: '/api/order_form/delivery_cost',
      method: 'post',
      data
    })
}
// /api/order_form/pay 订单付款
export function pay(data) {
    return request({
      url: '/api/order_form/pay',
      method: 'post',
      data
    })
}
// /api/order_form/status_paid 查询订单支付状态结果；
export function statusPaid(data) {
    return request({
      url: '/api/order_form/status_paid',
      method: 'post',
      data
    })
}

export function detail(data) {
  return request({
    url: '/api/order_form/detail',
    method: 'post',
    data
  })
}


export function list(data) {
  return request({
    url: '/api/order_form/list',
    method: 'post',
    data
  })
}