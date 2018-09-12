const baseUrl = "https://www.easy-mock.com/mock/5b7c271360600b6d828b4dfe/smlievue/"
const LOCALURL = "http://localhost:3000/"

const URL = {
    getShoppingMallInfo: baseUrl + 'index', //商城首页所有信息
    loginUer: LOCALURL + 'user/reg', // 用户注册接口
    login: LOCALURL + 'user/login', //  用户登录接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //  用户登录接口
    getCategoryList: LOCALURL + 'goods/getCategoryList', // 大类商品接口
    getCategorySubList: LOCALURL + 'goods/getCategorySubList' // 大类商品接口
}

module.exports = URL