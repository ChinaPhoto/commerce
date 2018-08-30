import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import login from '@/components/pages/login'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'ShoppingMall',
        component: ShoppingMall
    }, {
        path: '/login',
        name: 'login',
        component: login
    }]
})