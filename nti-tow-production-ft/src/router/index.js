import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/layout/layout.vue'),
        children: [
            {
                path: 'read',
                name: 'read',
                component: () => import('@/views/read.vue')
            }
        ]
    }, {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue')
    }

];

const router = new VueRouter({
    routes
});
/**
 * 路由拦截
 */
router.beforeEach(async (to, from, next) => {
    next()
});

router.afterEach(() => {
});

export default router
