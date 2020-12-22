<template>
  <div class="main-content">
    <template v-if="isSuccess">
      <div class="main-item">
        <div class="form-group">
          <el-form :label-position="labelPosition" label-width="80px" :model="loginForm">
            <el-form-item label="用户名" class="label" label-width="100px">
              <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" class="label" label-width="100px">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" label-width="100px">
              <el-input type="password" v-model="loginForm.passwords"></el-input>
            </el-form-item>
            <el-form-item>
              <button class="btn loading" v-if="isLoading"  disabled><i class="el-icon-loading"></i> 提交中</button>
              <button class="btn" @click="handleSign" v-else >登录</button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="main-item">
        <img class="main-item-img" src="/ucenter/image/sign.png" alt="">
      </div>
    </template>
    <template v-else>
      <div class="success-card">
        <img src="/ucenter/image/sign-s.png" class="success-img" alt="">
        <p class="success-card-p">注册成功，尊敬的用户：{{loginForm.username}}</p>
        <button class="default-btn" @click="goLogin">去登录</button>  
      </div>
    </template>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        passwords: "",
      },
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      isSuccess: true,
      isLoading: false,
      inviter_code:''
    };
  },
  created() {
    if(this.$route.query.inviter_code){
      this.inviter_code =  this.$route.query.inviter_code
      Cookies.set('inviter_code', this.inviter_code,{ expires:100000 })
    }else{
      if(Cookies.get('inviter_code') != undefined)
        this.inviter_code = Cookies.get('inviter_code')
    }    
    console.log(this.inviter_code)
    
    // console.log(this.$route.query.inviter_code)
  },
  methods:{
    handleSign(){
      this.isLoading = true
      let reqData = {...this.loginForm}
      if(this.inviter_code){
        reqData = {...reqData, inviterCode: this.inviter_code}
        console.log(reqData)
        // return false
      }
      this.$store.dispatch("user/register", reqData)
        .then(() => {
          this.$message({
            message: '注册成功！',
            type: 'success'
          });
          Cookies.set('inviter_code', this.inviter_code,{ expires:100000})
          this.isLoading = false
          this.isSuccess = false
          // this.$router.push({ path: '/'})
        })
        .catch(() => {
          this.isLoading = false
        });
    },
    goLogin(){
      this.$router.push({ path: '/login'})
    }
  }
};
</script>

<style scoped>
.main-content{
  display: flex;
  /* width: 100%; */
  justify-content: space-between;
  align-items: center;
  padding: 60px 80px;
  /* padding-bottom: 160px; */
  box-sizing: border-box;
  background: #fff;
  border-radius: 10px;
  margin: 100px 120px;
}
.main-item-img{
  height: 420px;
  width: auto;
  margin-left: 160px;
}
.form-group{
  width: 500px;
  background: #fff;
  padding: 0px 46px;
}

.btn{
  width: 160px;
  height: 46px;
  font-size: 18px;
  color:#fff;
  background: #014785;
  margin-left: 20px;
}
.label{
  margin-bottom: 28px;
}
.p-bank{
  margin:0px;
  width: 100%;
  text-align: right;
  color:#9B9B9B;
  font-size:16px;
  font-family: PingFang SC;
}
.loading{
  opacity: .6
}
.success-card{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  margin-bottom: 100px;
  margin-top: 30px;
  width: 100%;
}
.success-img{
  height: 200px;
}
.success-card-p{
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 300;
  line-height: 30px;
  color: #1B1B1B;
  margin:40px 0px;
}
.default-btn{
  background: #014785;
  color:#fff;
  width: 100px;
  padding: 8px 20px;
}

</style>