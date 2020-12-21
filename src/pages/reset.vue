<template>
  <div class="main-content">
    <template v-if="isSuccess">
      <div class="main-item">
        <div class="form-group">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="手机/邮箱" class="label" label-width="100px">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="验证码" class="label" label-width="100px">
              <el-input v-model="formLabelAlign.code" style="width:220px" ></el-input>
              <button class="btn" @click="handleCode">获取验证码</button>
            </el-form-item>
            <el-form-item label="密码" class="label" label-width="100px">
              <el-input v-model="formLabelAlign.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" label-width="100px">
              <el-input v-model="formLabelAlign.newPwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <button class="btn" @click="handleReset">登录</button>
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
        <img src="/ucenter/image/reset.png" class="success-img" alt="">
        <p class="success-card-p">现在,你可以用新密码进行登录</p>
        <button class="default-btn" @click="goLogin">去登录</button>  
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "nxtframework.com",
      },
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        pwd:'',
        newPwd:'',
        code:'',
        type: ''
      },
      isSuccess: true
    };
  },
  created() {
  },
  methods:{
    goLogin(){
      this.$router.push({ path: '/login'})
    },
    handleCode() {
      this.$store.dispatch('user/pwd_code',{phoneOrEmail:this.formLabelAlign.name})
        .then(() => {

        })
    },
    handleReset() {
      if(this.formLabelAlign.pwd != this.formLabelAlign.newPwd){
        this.$message({
          message: '二次密码不一致！',
          type: 'error'
        })
        return false
      }
      this.$store.dispatch('user/pwdReset',{
        phoneOrEmail:this.formLabelAlign.name,
        verifyCode:this.formLabelAlign.code,
        password:this.formLabelAlign.newPwd
      }).then(() => {
        this.isSuccess = false;
      })
    }
  }
};
</script>
<style>
.el-form-item__content{
  /* display: flex; */
  
}
</style>
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
  height: 40px;
  font-size: 18px;
  color:#fff;
  background: #014785;
  margin-left: 20px;
  border: 1px solid #014785;
}
.label{
  margin-bottom: 28px;
  /* display: flex; */
}
.p-bank{
  margin:0px;
  width: 100%;
  text-align: right;
  color:#9B9B9B;
  font-size:16px;
  font-family: PingFang SC;
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