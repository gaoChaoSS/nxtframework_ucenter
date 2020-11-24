<template>
  <div class="main-content">
    <template v-if="isSuccess">
      <div class="main-item">
        <img class="main-item-img" src="/ucenter/image/login.png" alt="">
      </div>
      <div class="main-item">
        <div class="form-group">
          <el-form :label-position="labelPosition" label-width="80px" :model="loginForm">
            <el-form-item label="用户名" class="label">
              <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input  type="password" v-model="loginForm.password"></el-input>
              <router-link to="/reset" class="p-bank">忘记密码</router-link>
            </el-form-item>
            <el-form-item>
              <button class="btn loading" v-if="isLoading"  disabled><i class="el-icon-loading"></i> 提交中</button>
              <button class="btn" @click="handleLogin" v-else >登录</button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="success-card">
        <img src="/ucenter/image/sign-s.png" class="success-img" alt="">
        <p class="success-card-p">注册成功，尊敬的用户：xxxx@sfsf.com</p>
        <button class="default-btn">去登录</button>  
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
      labelPosition: 'top',
      isSuccess: true,
      isLoading: false
    };
  },
  created() {
    console.log(this.$store.getters.token);
  },
  methods:{
    handleLogin(){
      this.isLoading = true
      this.$store.dispatch("user/login", this.loginForm)
        .then(() => {
          this.$message({
            message: '登陆成功！',
            type: 'success'
          });

          this.isLoading = false
          this.$router.push({ path: '/'})
        })
        .catch(() => {          
          this.isLoading = false
        });
    }
  }
};
</script>

<style scoped>
.main-content{
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 60px 240px;
  padding-bottom: 160px;
  box-sizing: border-box;
}
.main-item-img{
  height: 500px;
  width: auto;
  margin-right: 160px;
}
.form-group{
  width: 420px;
  background: #fff;
  padding: 20px 36px;
}

.btn{
  width: 100%;
  height: 46px;
  font-size: 18px;
  color:#fff;
  background: #014785;
}
.loading{
      opacity: .6
}
.p-bank{
  margin:0px;
  width: 100%;
  text-align: right;
  color:#9B9B9B;
  font-size:16px;
  font-family: PingFang SC;
  text-decoration: none;
  text-align: right;
  display: inline-block;
}
.success-card{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  margin-bottom: 100px;
  margin-top: 30px;
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