<template>
    <div>
        <van-nav-bar
            title="注册页面"
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
            <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">注册</van-button>
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

            registerAction(){
                this.usernameVer();
                this.passwordVer();
                console.log(this.isVer.isPassword)
                if(this.isVer.isUsername && this.isVer.isPassword){
                    this.registered()
                }else{
                    Toast.fail('验证失败')
                }

                this.isVer.isUsername =false;
                this.isVer.isPassword = false;
            },
            
            registered(){
                this.openLoading = true;
                this.$ajax.post(url.loginUer, {
                    userName:this.username,
                    password:this.password

                }).then((res) =>{
                      //如果返回code为200，代表注册成功，我们给用户作Toast提示
                      if(res.data.code == 200){
                          Toast.success('注册成功')
                          this.$router.push('/')
                      }else{
                           this.openLoading = false;
                          console.log(res.data.message)
                          Toast.fail('注册失败')
                      }
                })
                .catch((error) =>{
                  console.log(error)
                  this.openLoading = false;
                    Toast.fail('error')

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
