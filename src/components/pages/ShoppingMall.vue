<template>
    <div>
      <!-- 表头 -->
        <div class="search-bar">
            <van-row gutter="5">
                <van-col span="3">
                    <img :src="locationIcon" alt=""  width="80%" class="location-icon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input" >
                </van-col>
                <van-col span="5">
                    <van-button type="default" size="mini" >搜索</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- 轮播功能 -->
        <div class="swiper-area">
           <van-swipe :autoplay = 'swipeData.bannerTime'>
               <van-swipe-item v-for="(item,index) in swipeData.bannerPicArray" :key="index">
                   <img v-lazy="item.image" width="100%">
               </van-swipe-item>
            </van-swipe>
        </div>

        <!-- 首选页面 -->
        <div class="type-bar" v-if="this.category">
          <div  v-for="(item,index) in category" :key="index" >
            <img v-lazy="item.image" width="90%" />
            <span>{{item.mallCategoryName}}</span>
          </div>
        </div>

        <!-- 宣传广告 -->
        <div>
          <img v-lazy="this.advertesPicture" alt="" width="100%">
        </div>

        <!-- 商品推荐 -->
        <div class="recommend-area">
          <div class="recommend-title">
            商品推荐
          </div>
          <div class="recommend-body">
            <swiper :options = "swiperOption">
              <swiper-slide v-for="(item,index) in recommend" :key="index">
                <div class="recommend-item">
                  <img v-lazy="item.image" width="80%">
                  <div> {{item.goodsName}} </div>
                  <div> ￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}}) </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>

        <div v-if="floor1.data.length > 0">
            <floorComponent :floorData = "floor1"></floorComponent>
        </div>
        <div v-if="floor2.data.length > 0">
            <floorComponent :floorData = "floor2"></floorComponent>
        </div>
         <div v-if="floor3.data.length > 0">
            <floorComponent :floorData = "floor3"></floorComponent>
        </div>
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods" v-if="hotGoods.length > 0">
            <!--这里需要一个list组件-->
            <van-list>
                <van-row>
                      <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                          <goodsInfoComponent :goodsData ='item'></goodsInfoComponent>
                      </van-col>
                </van-row>
            </van-list>
        </div>
</div>
    </div>
</template>

<script>

  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import floorComponent from '../component/floorComponent.vue'
  import goodsInfoComponent from '../component/goodsInfoComponent.vue'
  import { toMoney } from '@/filter/moneyFilter.js'


    export default {
        data(){
            return{
              swiperOption:{
                slidesPerView:3
              },
              locationIcon:require('@/assets/images/location.png'),
              swipeData:{
                  bannerPicArray:[],
                  bannerTime: 3000
              },
              category:[],
              advertesPicture:'',
              recommend:[],
              floor1:{
                data:[],
                floorTitle:'我是一楼'
              },
              floor2:{
                data:[],
                floorTitle:'我是二楼'
              },
              floor3:{
                 data:[],
                floorTitle:'我是三楼'
              },
              hotGoods:[]
            }
        },
        components:{
          swiper,
          swiperSlide,
          floorComponent,
          goodsInfoComponent
        },
        created () {
          this.$ajax.get('https://www.easy-mock.com/mock/5b7c271360600b6d828b4dfe/smlievue/index').then((res) =>{
              if(res.status == 200){
                  console.log(res)
                  this.category=res.data.data.category;
                  this.swipeData.bannerPicArray = res.data.data.slides;
                  this.advertesPicture = res.data.data.advertesPicture.PICTURE_ADDRESS;
                  this.recommend = res.data.data.recommend;
                  this.floor1.data = res.data.data.floor1;
                  this.floor2.data = res.data.data.floor2;
                  this.floor3.data = res.data.data.floor3;
                  this.hotGoods = res.data.data.hotGoods;
              }
            }).catch((err) =>{
                console.log(err)
            })
        },
        mounted() {
            console.log('你是猪嘛')
        },
        filters :{
          moneyFilter(money){
            return toMoney(money);
          }
        }
    }
</script>

<style scoped>
    .search-bar{
        height: 2.2rem;
        background-color: #e5017d;
        line-height:2.2rem;
        overflow: hidden;
    }
    .location-icon{
        padding-top: .2rem;
        padding-left: .3rem;
    }
    .search-input{
        width:100%;
        height: 1.3rem;
        border-top:0px;
        border-left:0px;
        border-right:0px;
        border-bottom: 1px solid 1px !important ;
        background-color: #e5017d;
        color:#fff;
    }
    .swiper-area{
        clear: both;
        /* max-height: 15rem; */
        height: 9.2rem;
        overflow: hidden
    }
    .type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
  }
 .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
  }
  .recommend-title{
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#e5017d;
  }
  .recommend-body{
      border-bottom: 1px solid #eee;
   }

  .recommend-item{
      width:99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center;
  }
  .hot-area{
        text-align: center;
        font-size:14px;
        height: 1.8rem;
        line-height:1.8rem;
  }
</style>
