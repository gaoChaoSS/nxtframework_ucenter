import request from '@/utils/request'


// 查看余额详情
export function create(data) {
  return request({
    url: '/api/user/recharge/create',
    method: 'post',
    data
  })
}
