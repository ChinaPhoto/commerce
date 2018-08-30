<template>
    <div>
        <van-nav-bar
            title="注册页面"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />  

        <div class="register-panel">
            <van-cell-group>
                <van-field
                    v-model="username"
                    required
                    clearable
                    label="用户名"
                    placeholder="请输入用户名"
                   
                />

                <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
                />
            </van-cell-group>
        </div>      
        <div class="register-button">
            <van-button type="primary" size="large">注册</van-button>
        </div>
    </div>
</template>

<script>
    export default {
         data() {
             return {
                username:'',
                password:''
             }
         },
         methods:{
             goBack() {
                 this.$router.go(-1);   
             }
         }
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
        width:90%;
        margin: auto;
    }
</style>