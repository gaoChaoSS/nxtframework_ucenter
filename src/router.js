import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './pages/login.vue'
import Sign from './pages/sign.vue'
import Reset from './pages/reset.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/', component: Login
    },
    {
        path: '/sign', component: Sign
    },
    {
        path: '/reset', component: Reset
    },
]

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
  

export default router;