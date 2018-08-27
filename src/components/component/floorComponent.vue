<template>
  <div>
      <div class="floor">
          <div class="floor-title">
              {{floorData.floorTitle}}
           </div>
          <div class="floor-anomaly">
              <div class="floor-one">
                  <img  :src="floor0.image"  width="100%">
              </div>
              <div>
                  <div class="floor-two">
                      <img  :src="floor1.image"  width="100%">
                  </div>
                  <div>
                      <img  :src="floor2.image"  width="100%">
                  </div>
                </div>
            </div>
            <div class="floor-rule">
                <div v-for="(item,index) in floorData.data.slice(3)" :v-for="index">
                    <img :src="item.image" alt="" width="100%">
                </div>
            </div>
        </div>
  </div>
</template>

<script>
  export default {
      props:{
          floorData :{
              type:Object,
              default:true
          }
      },
    data() {
        return {
            floor0:{},
            floor1:{},
            floor2:{}
        }
    },
    mounted () {
      this.floor0 = this.floorData.data[0];
      this.floor1 = this.floorData.data[1];
      this.floor2 = this.floorData.data[2];
    }

  }
</script>

<style scoped>
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
  .floor-title{
      text-align:center;
      font-size:14px;
      height: 1.8rem;
      line-height: 1.8rem;
      color: #0012ff;
  }
</style>
