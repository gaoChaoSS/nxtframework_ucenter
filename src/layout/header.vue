<template>
  <div class="header">
    <span class="logo-p">NxtFramework</span>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      style="width:100%"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">产品</el-menu-item>
      <el-menu-item index="3">资讯</el-menu-item>
      <el-submenu index="4">
        <template slot="title">关于</template>
        <el-menu-item index="4-1">选项1</el-menu-item>
        <el-menu-item index="4-2">选项2</el-menu-item>
        <el-menu-item index="4-3">选项3</el-menu-item>
      </el-submenu>   
    </el-menu>
    <div class="right-card">
      <img src="@/assets/car.png" alt="">
      <div class="right-item">登录/注册</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header{
  display: flex;
  align-items: center;
  border-bottom: .5px solid rgb(112 112 112 / 51%);
  padding: 16px 20px;
}
.logo-p {
  font-size: 38px;
  font-family: HYYaKuHeiW;
  font-weight: 600;
  line-height: 46px;
  color: #014785;
  opacity: 1;
  margin-right: 100px;
}
.right-card{
  display: flex;
  align-items: center;
  width: 200px;
}
.right-card img{
  height: 30px;
  width: auto;
}
.right-item{
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 31px;
  color: #1B1B1B;
  opacity: 1;
}
</style>