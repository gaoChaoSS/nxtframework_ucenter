import Cookies from 'js-cookie'

const TokenKey = 'token'
const UserId = 'user-id'
const GuestToken = 'shopping_cart_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserId) 
}

export function setUserId(id) {
  return Cookies.set(UserId, id)
}

export function removeUserId() {
  return Cookies.remove(UserId)
}


export function getGuestToken() {
  return Cookies.get(GuestToken) == undefined ? '' :Cookies.get(GuestToken)
}

export function setGuestToken(token) {
  return Cookies.set(GuestToken, token)
}

export function removeGuestToken() {
  return Cookies.remove(GuestToken)
}