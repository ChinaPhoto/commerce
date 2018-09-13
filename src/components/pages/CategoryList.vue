<template>
  <div>
      <div class="navbar-div">
          <van-nav-bar   title="类别列表" />
      </div>
      <div>
         <van-row>
            <van-col span="6">
                <div id="leftNav">
                    <ul>
                        <li v-for="(item,index) in category" :key="index" @click="clickCategory(index,item.ID)" :class="{categoryActice:categoryIndex==index}">
                            {{item.MALL_CATEGORY_NAME}}
                        </li>
                    </ul>
                </div>
            </van-col>
            <van-col span="18">
              <div class="tabCategorySub">
                  <van-tabs v-model="active">
                      <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                      </van-tab>
                  </van-tabs>
              </div>
            </van-col>
        </van-row>
      </div>
  </div>
</template>

<script>
   import url from '@/serviceAPI.conf.js';
  export default {
      data() {
          return {
            category:[],
            categoryIndex:0,
            categorySub:[],
            active:0
          }
      },
      created() {
        this.getCategory();
        this.getCategorySubByCategoryId(1)
      },
      methods:{
          getCategory(){

            this.$ajax.get(url.getCategoryList).then((res)=>{
                if(res.data.status)  {
                    this.category = res.data.data
                }else{
                   Toast(res.data.message)
                }
            }).catch((err) =>{
              console.log(err)
            })

          },
          clickCategory(index,categoryId){
              this.categoryIndex = index;
              this.getCategorySubByCategoryId(categoryId)
          },
          getCategorySubByCategoryId(categoryId){
              this.$ajax.get(url.getCategorySubList,{
                  params:{
                    categoryId:categoryId
                  }
               }).
              then((res)=>{
                console.log(res)
                  this.categorySub=res.data.data
                  this.active = 0
              }).catch((err)=>{
                console.log(err)
              })
          }

      },
      mounted(){
          let winHeight = document.documentElement.clientHeight
          document.getElementById("leftNav").style.height= winHeight-46 +'px'
      }

  }
</script>

<style scoped>
    #leftNav{
        background-color: aliceblue;
    }
    #leftNav ul li {
        line-height: 2rem;
        border-bottom: 1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    }
    .categoryActice{
        background-color: #fff;
    }


    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }

</style>
