<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" alt="" width="100%">
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL">
                    </div>
                </van-tab>
                <van-tab title="评价">
                    正在制作中
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div>
                <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import url from '@/serviceAPI.conf.js';
    import {toMoney} from "@/filter/moneyFilter.js"
    import {Toast} from 'vant'
    export default{
        data (){
            return {
                goodsId:'',
                goodsInfo:{}
            }
        },
        created(){
            this.getGoodsId()
            this.getInfo()
        },
        methods: {
            getGoodsId(){  //接收参数id
                this.goodsId = this.$route.query.goodsId
                console.log(this.goodsId)
            },
            getInfo(){
                this.$ajax.post(url.getDetailGoodsInfo,{
                    goodsId:this.goodsId
                }).then((res)=>{
                  if(res.data.status){
                    this.goodsInfo = res.data.data
                  }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            onClickLeft(){
                this.$router.go(-1)
            },
            // 增加商品到购物车
            addGoodsToCart(){
                // 读取 购物车内的商品数据
                let cartInfo  = localStorage.cartInfo? JSON.parse(localStorage.cartInfo):[];


                // 判断购物车有没有这个商品
                let isHaveGoods = cartInfo.find(cart =>
                    cart.goodsId== this.goodsId
                )
                    //   let isHaveGoods = cartInfo.find(cart=>cart.goodsId== this.goodsId)
                  console.log(isHaveGoods)
                if(!isHaveGoods){
                    // 如果没有就直接添加近购物车
                     let newGoodsInfo={
                        goodsId:this.goodsInfo.ID,
                        Name:this.goodsInfo.NAME,
                        price:this.goodsInfo.PRESENT_PRICE,
                        image:this.goodsInfo.IMAGE1,
                        count:1
                    }
                     cartInfo.push(newGoodsInfo);
                    localStorage.cartInfo = JSON.stringify(cartInfo);
                    Toast.success('添加成功');
                }else{
                    Toast.success('已有此商品')
                }
                this.$router.push({name:'Cart'})  // 进行跳转
            }
        },
        filters :{
            moneyFilter(money){
              return toMoney(money);
            }
        }
    }
</script>


<style scoped>
    .detail{
        font-size:0px;
      }
    .goods-name{
        background-color: #fff;
      }
    .goods-price{
        background-color: #fff;
      }
    .goods-bottom{
        position: fixed;
        bottom:0px;
        left:0px;
        background-color: #FFF;
        width:100%;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
      }
    .goods-bottom > div{
        flex:1;
        padding:5px;
      }
</style>
