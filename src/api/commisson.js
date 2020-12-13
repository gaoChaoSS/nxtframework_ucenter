import request from '@/utils/request'


// 查看收益数据
export function detail(data) {
  return request({
    url: '/api/user/commission/balance_detail',
    method: 'post',
    data
  })
}

//个人中心--结转全部佣金到余额
export function cash(data) {
  return request({
    url: '/api/user/commission/cash_out',
    method: 'post',
    data
  })
}