import request from '@/utils/request'


// 查看收益数据
export function detail(data) {
  return request({
    url: '/api/user/commission/balance_detail',
    method: 'post',
    data
  })
}

