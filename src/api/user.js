import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data
  })
}

export function balance() {
  return request({
    url: '/api/user/transaction/balance',
    method: 'post'
  })
}

export function info() {
  return request({
    url: '/api/user/info',
    method: 'post'
  })
}



//个人中心--邮箱绑定验证码
export function verify_code(data) {
  return request({
    url: '/api/user/email/update/verify_code',
    method: 'post',
    data
  })
}
// 个人中心--邮箱绑定
export function email_update(data) {
  return request({
    url: '/api/user/email/update',
    method: 'post',
    data
  })
}
//个人中心--邮箱解除绑定验证码
export function email_code(data) {
  return request({
    url: '/api/user/email/remove/verify_code',
    method: 'post',
    data
  })
}

//个人中心--邮箱解除绑定
export function email_move(data) {
  return request({
    url: '/api/user/email/remove',
    method: 'post',
    data
  })
}

//个人中心--手机绑定验证码
export function phone_code(data) {
  return request({
    url: '/api/user/phone/update/verify_code',
    method: 'post',
    data
  })
}

//个人中心--手机号绑定
export function phone_update(data) {
  return request({
    url: '/api/user/phone/update',
    method: 'post',
    data
  })
}

//个人中心--手机解除绑定验证码
export function phone_remove_code(data) {
  return request({
    url: '/api/user/phone/remove/verify_code',
    method: 'post',
    data
  })
}

//个人中心--手机号解除绑定
export function phone_remove(data) {
  return request({
    url: '/api/user/phone/remove',
    method: 'post',
    data
  })
}
//个人中心--找回密码验证码获取（兼容手机、邮箱）
export function pwd_code(data) {
  return request({
    url: '/api/user/pwd_reset/verify_code',
    method: 'post',
    data
  })
}
//找回密码（重置密码）
export function pwd_reset(data) {
  return request({
    url: '/api/user/pwd_reset',
    method: 'post',
    data
  })
}

export function invited_list(data) {
  return request({
    url:'/api/user/invited/list',
    method: 'post',
    data
  })
}