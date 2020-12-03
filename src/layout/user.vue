<template>
  <div class="layout-user">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main">
      <div class="nav">
        <div class="nav-item">
          <div class="nav-item-title">
            <img src="@/assets/user-icon-1.png" alt="" class="nav-item-title-img">
            <p class="nav-item-p">交易</p>
            <i class="el-icon-caret-bottom nav-item-title-icon"></i>
          </div>
          <div class="nav-content">
            <router-link class="nav-link" to="/order" :class="isActive('/order')?'active':''">我的订单</router-link>
            <router-link class="nav-link" to="/service" :class="isActive('/service')?'active':''">售后管理</router-link>
          </div>
        </div>
        <div class="nav-item">
          <div class="nav-item-title">
            <img src="@/assets/user-icon-2.png" alt="" class="nav-item-title-img">
            <p class="nav-item-p">资产</p>
            <i class="el-icon-caret-bottom nav-item-title-icon"></i>
          </div>
          <div class="nav-content">
            <router-link to="/order" class="nav-link">余额</router-link>
            <router-link to="/order" class="nav-link">收益</router-link>
          </div>
        </div>
      </div>
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
export default {
  created() {
    // console.log(this.$router);
  },
  methods: {
    isActive(tag){
      return tag ===  this.$route.path
    }
  },
};
</script>

<style scoped>
.layout-user{
  display: flex;
  flex-wrap: wrap;
  padding: 40px 100px;
  box-sizing: border-box;
  background: #F8F8F8;
}
.top{
  width: 100%;
  margin-bottom: 20px;
}
.nav{
  width: 200px;
  height: 400px;
  padding: 30px 20px;
  box-sizing: border-box;
  background: #fff;
  margin-right: 20px;
}
.main{
  display: flex;
  width: 100%;
  background: #F8F8F8;
}
.nav-item{
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.main-content{
  width: 100%;
}
.nav-item-title{
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
}
.nav-item-p{
  padding:0px;
  margin:0px;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 29px;
}
.nav-item-title-img{
  width: 20px;
  height: auto;
  margin-right: 10px;
} 
.nav-item-title-icon{
  font-size:20px;
  margin-left: 10px;
}
.nav-content{
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding-left: 29px;
  margin-top: 10px;
}
.nav-link{
  font-size: 10px;
  margin-bottom: 16px;
  color: #5F5F5F;;
  font-family: PingFang SC;
  text-decoration: none;
}
.nav-link.active{
  color: #014785;
  font-weight: 600;
}
</style>