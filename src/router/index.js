import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import reg from '@/components/pages/Register'
import login from '@/components/pages/Login'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'ShoppingMall',
        component: ShoppingMall
    }, {
        path: '/reg',
        name: 'reg',
        component: reg
    }, {
        path: '/login',
        name: 'login',
        component: login
    }]
})