import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/auth' // get token from cookie
import Login from './pages/login.vue'
import Sign from './pages/sign.vue'
import Reset from './pages/reset.vue'
// import Info from './pages/info.vue'
import Cart from './pages/cart.vue'
import Address from './pages/address.vue'
import Pay from './pages/pay.vue'
import PayResult from './pages/payresult.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login', component: Login
  },{
    path: '/sign', component: Sign
  },{
    path: '/reset', component: Reset
  },{
    path: '/cart', component: Cart
  },{
    path: '/order_form_create', component: Address, name: 'address'
  },{
    path: '/order_form_pay', component: Pay, name:'pay',props: true
  },{
    path: '/payresult', component: PayResult
  },{
    path: '/', component: () => import('@/layout/user.vue'),
    children: [{
      path: '/',
      component: () => import('@/pages/info.vue')
    },{
      path: '/order',
      component: () => import('@/pages/myorder.vue')
    },{
      path: '/service',
      component: () => import('@/pages/service.vue')
    }
    ]
  },{
    path: '/detail', component: () => import('@/pages/orderDetail.vue')
  },{
    path: '/serive-1', component: () => import('@/pages/serive-1.vue')
  }
]
const whiteList = ['/login', '/reset', '/sign', '/cart'] // no redirect whitelist
const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })
  
const router = createRouter()

export function resetRouter() {
const newRouter = createRouter()
router.matcher = newRouter.matcher // reset router
}
 
router.beforeEach(async(to, from, next) => {
  
    // determine whether the user has logged in
    const hasToken = getToken()
  
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' })
      } else {
        // determine whether the user has obtained his permission roles through getInfo        
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
      }
    }
  })
  
  router.afterEach(() => {
  })

export default router;