import request from '@/utils/request'


// 查看购物车
export function detail(data) {
  return request({
    url: '/api/shopping_cart/detail',
    method: 'post',
    data
  })
}

// 添加商品
export function addProduct(data) {
    return request({
        url: '/api/shopping_cart/add_product',
        method: 'post',
        data
    })
}

// 移除商品
export function delProduct(data) {
    return request({
        url: '/api/shopping_cart/del_product',
        method: 'post',
        data
    })
}

// 选择商品
export function selectProduct(data) {
  return request({
    url:'/api/shopping_cart/select_product',
    method: 'post',
    data
  })
}