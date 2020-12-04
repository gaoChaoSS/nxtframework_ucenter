<template>
  <div class="header">
    <span class="logo-p">NxtFramework</span>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      style="width:100%"
      text-color="#1B1B1B"
    >
      <el-menu-item index="1">
        <a href="/">首页</a>
      </el-menu-item>
      <el-menu-item index="2">
        <a href="/product/list">产品</a>
      </el-menu-item>
      <el-menu-item index="3">
        <a href="/news">资讯</a>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">关于</template>
        <el-menu-item index="4-1">
          <a href="/about">关于我们</a>
        </el-menu-item>
        <el-menu-item index="4-2">
          <a href="/connect_us">联系我们</a>
        </el-menu-item>
        <el-menu-item index="4-3">
          <a href="/buy_guide">购买指南</a>
        </el-menu-item>
        <el-menu-item index="4-4">
          <a href="/terms_state">条款声明</a>
        </el-menu-item>
        <el-menu-item index="4-4">
          <a href="/privacy_policy">隐私政策</a>
        </el-menu-item>
      </el-submenu>   
    </el-menu>
    <div class="right-card">
      <img src="@/assets/car.png" alt="" @click="handleCart()">
      <div class="right-item" v-if="token">
        <router-link to="/order" class="item-a">我的订单</router-link> 
        <router-link to="/" class="item-a">个人中心</router-link>
        <a href="#" class="item-a" @click="handleLogout()">注销</a>
      </div>
      <div class="right-item" v-else>
        <router-link to="/">登录</router-link> / 
        <router-link to="/sign">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'token',
    ]),
  },
  methods:{
    handleLogout(){
      this.$store.dispatch("user/logout", this.loginForm)
        .then(() => {
          this.$router.push({ path: '/login'})
        })
        .catch(() => {
          this.$message({
            message: '注销失败！',
            type: 'warning'
          })
        })
    },
    handleCart(){
      this.$router.push({ path: '/cart'})
    }
  }
}
</script>

<style scoped>
.header{
  display: flex;
  align-items: center;
  border-bottom: .5px solid rgb(112 112 112 / 51%);
  padding: 2px 20px;
}
.logo-p {
  font-size: 20px;
  font-family: HYYaKuHeiW;
  font-weight: 600;
  line-height: 46px;
  color: #014785;
  opacity: 1;
  margin-right: 50px;
}
.right-card{
  display: flex;
  align-items: center;
  /* width: 300px; */
}
.right-card img{
  height: 24px;
  width: auto;
  margin-right: 40px;
}
.right-item{
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #1B1B1B;
  opacity: 1;
  display: flex;
  min-width: 120px;
}
.right-item a{
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #1B1B1B;
  opacity: 1;
  text-decoration: none;
}
.item-a{
  
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 31px;
  color: #1B1B1B;
  border-left: 1px solid #7070706e;
  width: 100px;
  padding: 0px 10px;
  text-align: center;
}
</style>