<template>
    <div class="goods-info">
        <div class="goods-image">
            <img v-lazy="goodsData.image" width="90%" />
        </div>
        <div class="goods-name">{{goodsData.name}}</div>
        <div class="goods-price">￥{{ goodsData.mallPrice | moneyFilter }}</div>
    </div>
</template>

<script>
  import { toMoney } from '@/filter/moneyFilter.js'
  export default {
      props: {
          goodsData:{
            type:Object,
            default:true
          }
      },
      filters: {
          moneyFilter(money) {
            return toMoney(money);
          }
      }
  }

</script>

<style scoped>
    .goods-name{
        padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap;
    }
</style>
