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
                  <div> ￥{{item.price}} (￥{{item.mallPrice}}) </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <!-- <swiperDefault></swiperDefault>
        <swiperDefaultTwo></swiperDefaultTwo>
        <swiperText></swiperText> -->
        <div class="floor">
            <div class="recommend-title">
              楼城设置
            </div>
            <div class="floor-anomaly">
                <div class="floor-one">
                    <img  v-lazy="floor1_0.image"  width="100%">
                </div>
                <div>
                    <div class="floor-two">
                        <img  v-lazy="floor1_1.image"  width="100%">
                    </div>
                    <div>
                        <img  v-lazy="floor1_2.image"  width="100%">
                    </div>
                </div>
            </div>
            <div class="floor-rule">
                <div v-for="(item,index) in floor1.slice(3)" :v-for="index">
                    <img v-lazy="item.image" alt="" width="100%">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
 import 'swiper/dist/css/swiper.css'
 import { swiper, swiperSlide } from 'vue-awesome-swiper'
 import swiperDefault from '../swiper/swiperDefault.vue'
 import swiperDefaultTwo from '../swiper/swiperDefault1.vue'
 import swiperText from '../swiper/swiperText.vue'
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
              floor1:[],
              floor1_0:{},
              floor1_1:{},
              floor1_2:{},

            }
        },
        components:{
          swiper,
          swiperSlide,
          swiperDefault,
          swiperDefaultTwo,
          swiperText
        },
        created () {
          this.$ajax.get('https://www.easy-mock.com/mock/5b7c271360600b6d828b4dfe/smlievue/index').then((res) =>{
              if(res.status == 200){
                console.log(res)
                this.category=res.data.data.category;
                this.swipeData.bannerPicArray = res.data.data.slides;
                this.advertesPicture = res.data.data.advertesPicture.PICTURE_ADDRESS;
                this.recommend = res.data.data.recommend;
                this.floor1 = res.data.data.floor1;
                this.floor1_0 =this.floor1[0]
                this.floor1_1 =this.floor1[1];
                this.floor1_2 =this.floor1[2];

              }

            }).catch((err) =>{
              console.log(err)
            })
        },
        mounted() {
          console.log('你是猪嘛')
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
  .floor-anomaly{
      display: flex;
      flex-direction:row;
      background-color: #fff;
      border-bottom:1px solid #ddd;
  }
  .floor-anomaly div{
      width:10rem;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
  }
  .floor-one{
      border-right:1px solid #ddd;

  }
  .floor-two{
      border-bottom:1px solid #ddd;
  }
.floor-rule{
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      background-color: #fff;

  }
  .floor-rule div{
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width:10rem;
      border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
      border-right: 1px solid #ddd;
  }

</style>
