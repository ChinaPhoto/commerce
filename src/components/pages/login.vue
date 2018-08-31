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
            <van-button type="primary" size="large" @click="registered">注册</van-button>
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
                password:''
             }
         },
         methods:{
            goBack() {
                this.$router.go(-1);
            },
            registered(){
                this.$ajax.post(url.loginUer, {

                    userName:this.username,
                    password:this.password

                }).then((res) =>{
                      //如果返回code为200，代表注册成功，我们给用户作Toast提示
                      if(res.data.code == 200){
                          Toast.success('注册成功')
                      }else{
                          console.log(res.data.message)
                          Toast.fail('注册失败')
                      }
                })
                .catch((error) =>{
                  console.log(error)
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
