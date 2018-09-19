import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import reg from '@/components/pages/Register'
import login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'

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
    }, {
        path: '/Goods',
        name: 'Goods',
        component: Goods
    }, {
        path: '/CategoryList',
        name: 'CategoryList',
        component: CategoryList
    }, {
        path: '/Cart',
        name: 'Cart',
        component: Cart
    }]
})