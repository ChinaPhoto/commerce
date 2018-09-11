<template>
    <div>
       <div>
            商品详情页面
       </div>
    </div>
</template>

<script>
    import url from '@/serviceAPI.conf.js';
    
    export default{
        data (){
            return {
                goodsId:'775e575ce28a4f89b1dfe2c99eb08ae7'
            }
        },
        created(){
            this.getInfo()
        },
        methods: {
            getInfo(){
                this.$ajax.post(url.getDetailGoodsInfo,{
                    goodsId:this.goodsId
                }).then((res)=>{
                    console.log(res)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    }
</script>