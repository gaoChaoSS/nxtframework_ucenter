import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/auth' // get token from cookie
import Login from './pages/login.vue'
import Sign from './pages/sign.vue'
import Reset from './pages/reset.vue'
import Info from './pages/info.vue'
import Cart from './pages/cart.vue'
import Address from './pages/address.vue'
import Pay from './pages/pay.vue'
import PayResult from './pages/payresult.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/login', component: Login
    },
    {
        path: '/sign', component: Sign
    },
    {
        path: '/reset', component: Reset
    },
    {
        path: '/', component: Info
    },
    {
        path: '/cart', component: Cart
    },
    {
        path: '/address', component: Address
    },
    {
        path: '/pay', component: Pay
    },
    {
        path: '/payresult', component: PayResult
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
        console.log('ssss');
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