<template>
    <div>
        <van-nav-bar
            title="登录页面"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />

        <div class="register-panel">
                <van-field
                    v-model="username"
                    required
                    clearable
                    label="用户名"
                    placeholder="请输入用户名"
                    :error-message ='usernameErrorMsg'
                    @blur ="usernameVer"

                />

                <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
                    :error-message ='passwordErrorMsg'
                    @blur="passwordVer"
                />
        </div>
        <div class="register-button">
            <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登陆</van-button>
        </div>
    </div>
</template>

<script>
import url from '@/serviceAPI.conf.js';
import { Toast } from 'vant';
    export default {
         data() {
             return {
                username:'',
                password:'',
                openLoading:false,  //
                usernameErrorMsg:'',
                passwordErrorMsg:'',
                isVer:{
                    isUsername:false,
                    isPassword:false
                }
             }
         },
         methods:{
            goBack() {
                this.$router.go(-1);
            },
            // 验证方法
            usernameVer(){
                if(this.username == ''){

                    this.usernameErrorMsg = '用户名不能为空';
                    this.isVer.isUsername =false;

                }else if(this.username.length < 5){

                     this.usernameErrorMsg = '用户名不能少于5个字节';
                     this.isVer.isUsername =false;

                }else{

                    this.usernameErrorMsg = ''
                    this.isVer.isUsername =true

                }
            },
            passwordVer(){
                if(this.password == ''){

                    this.passwordErrorMsg = '密码不能为空';
                    this.isVer.isPassword =false;

                }else if(this.password.length < 6){

                     this.passwordErrorMsg = '密码不能为空6个字节';
                     this.isVer.isPassword =false;

                }else{

                    this.passwordErrorMsg = ''
                    this.isVer.isPassword =true

                }
            },

            loginAction(){
                this.usernameVer();
                this.passwordVer();
                if(this.isVer.isUsername && this.isVer.isPassword){
                    this.loginEd()
                }else{
                    Toast.fail('验证失败')
                }

                this.isVer.isUsername =false;
                this.isVer.isPassword = false;
            },

            loginEd(){
                this.openLoading = true;
                this.$ajax.post(url.loginUer, {
                    userName:this.username,
                    password:this.password

                }).then((res) =>{

                })
                .catch((error) =>{


                })
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
