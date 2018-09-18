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
              <div id="list-div">
                    <van-pull-refresh v-model="isRefresh" @refresh='onRefresh'>
                          <van-list
                            v-model="loading"
                            :finished = 'finished'
                            @load="onLoad"
                        >
                             <div class="list-item" v-for="(item,index) in goodList" :key="index">
                                <div class="list-item-img"><img :src="item.IMAGE1" width="100%"/></div>
                                <div class="list-item-text">
                                    <div>{{item.NAME}}</div>
                                    <div class="">￥{{item.ORI_PRICE}}</div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>        

                  
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
                active:0,
                list:[],
                loading:false,  //上拉加载使用
                finished:false, // 下拉加载是否有错
                isRefresh:false,
                page:1,  // 表示现在传递的第几页
                goodList:[],  //接受现在传递的参数,
                categorySubId:''    // 获取子类的id

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
            },
            onLoad(){
                setTimeout(()=>{
                  this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
                    this.getGoodList()
                    },1000)
            },
            onRefresh(){
                setTimeout(()=>{
                        this.isRefresh = false;
                        this.finished = false;
                        this.list=[];
                        this.onLoad();
                    
                },500)
            },
            // 初始化数据
            init(){
                this.page = 1;
                this.goodList = [];
                this.finished =false;
            },
            // 子类数据请求
            getGoodList (){
                let  data = {
                    categorySubId:this.categorySubId,
                    page:this.page
                }
                this.$ajax.post(url.getGoodsListByCategorySubID, data).then((res)=>{
                    if(res.data.code == 200 && res.data.message) {
                        this.page ++ ;
                        this.goodList = this.goodList.concat(res.data.message)
                    }else{
                        this.finished = true
                    }
                      this.loading=false;
                }).catch((err)=>{
                    console.log(err)
                })

            }


      },
      mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById("leftNav").style.height= winHeight-46 +'px'
            document.getElementById('list-div').style.height=winHeight-90 +'px'

         
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
