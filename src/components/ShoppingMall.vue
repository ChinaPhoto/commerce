<template>
    <div>
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
        <div class="swiper-area">
           <van-swipe :autoplay = 'swipeData.bannerTime'>
               <van-swipe-item v-for="(item,index) in swipeData.bannerPicArray" :key="index">
                   <img v-lazy="item.imageUrl" width="100%">
               </van-swipe-item>
            </van-swipe> 
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
    export default {
        data(){
            return{
                locationIcon:require('@/assets/images/location.png'),
                swipeData:{
                    bannerPicArray:[
                        {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
                        {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
                        {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'},
                    ],
                    bannerTime: 3000
                }
            }
        },
        created () {
          this.$ajax.get('https://www.easy-mock.com/mock/5b7c271360600b6d828b4dfe/smlievue/index').then((res) =>{
                console.log(res)
                console.log(1)
            })
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
        max-height: 15rem;
        overflow: hidden
    }
</style>