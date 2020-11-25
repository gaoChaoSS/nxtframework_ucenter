const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    userId: state => state.user.userid,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    productList: state => state.cart.productList
  }
  export default getters
  