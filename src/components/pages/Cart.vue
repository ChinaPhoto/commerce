<template>
  <div>
      <div class="navbar-div">
            <van-nav-bar   title="购物车" />
      </div>
       <div class="card-title">
          <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
      </div>
      <div class="cart-list">
          <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
              <div class="pang-img"><img :src="item.image" width="100%" /></div>
              <div class="pang-text">
                  <div class="pang-goods-name">{{item.Name}}</div>
                      <div class="pang-control">
                      <van-stepper v-model="item.count" />
                  </div>
              </div>
              <div class="pang-goods-price">
                   <div>
                      ￥{{item.price |moneyFilter}}
                  </div>
                  <div>
                      x{{item.count}}
                  </div>
                  <div class="allPrice">
                      ￥{{item.price*item.count | moneyFilter}}
                  </div>
              </div>
          </div>
      </div>
      <div class="totalMoeny">
          商品总价：￥ {{totalMoney | moneyFilter}}
      </div>

  </div>
</template>

<script>
 import {toMoney} from '@/filter/moneyFilter.js'
  export default {
    data() {
        return {
            cartInfo:[], // 购物车内的商品
            isEmpt:false  // 购物车是否为空 不为空显示true 为空显示false
        }
    },
    created () {
      this.getCarInfo()
    },
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }
    },
    computed: {
        totalMoney(){
            let allMoney = 0;
            this.cartInfo.forEach((val,index) =>{
                allMoney += val.price * val.count
            })

            localStorage.cartInfo = JSON.stringify(this.cartInfo);
            return allMoney
        }
    },
    methods: {

        // 清空购物车
        clearCart() {
            localStorage.removeItem('cartInfo');
            this.cartInfo = [];
        },
        //  得到购物车数据
        getCarInfo () {

            //判断localStorage里面是否有数据
            if(localStorage.cartInfo){
                this.cartInfo = JSON.parse(localStorage.cartInfo)
            }
            this.isEmpt = this.cartInfo.length > 0 ? true:false;

        }
    }
  }
</script>

<style scoped>
    .cart-title{
        height: 2rem;
        line-height: 2rem;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding:5px;
        text-align:right;
    }

    .cart-list{
        background-color: #fff;
    }
    .pang-row{
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        padding:0.5rem;
        font-size:0.85rem;
        border-bottom:1px solid #E4E7ED;
    }

    .pang-img{
        flex:6;
    }
    .pang-text{
        flex:14;
        padding-left:10px;
    }
    .pang-control{
        padding-top:10px;
    }
    .pang-goods-price{
        flex:4;
        text-align: right;
    }
    .allPrice{
        color:red;
    }
    .totalMoeny{
        text-align: right;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding:5px;
    }
</style>
