import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import reg from '@/components/pages/Register'
import login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'

Vue.use(Router)

export default new Router({
    routes: [

        {
            path: '/main',
            name: 'Main',
            component: Main,
            children: [{
                    path: '/',
                    name: 'ShoppingMall',
                    component: ShoppingMall
                }, {
                    path: '/CategoryList',
                    name: 'CategoryList',
                    component: CategoryList
                }, {
                    path: '/Cart',
                    name: 'Cart',
                    component: Cart
                }

            ]
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
        }
    ]
})