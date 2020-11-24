<template>
    <el-container>
      <Header />
      <el-main><router-view /></el-main>
      <Footer />
    </el-container>
</template>

<script>
import Header from './layout/header'
import Footer from './layout/footer'  
export default {
  name: 'App',
  components:{
    Header, 
    Footer
  }
}
</script>

<style>
body{
  padding: 0px;
  margin:0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-menu.el-menu--horizontal{
  border-bottom: none;
}
.el-menu-item,.el-submenu__title{
  font-size: 20px;
  font-family: PingFang SC;
  line-height: 31px;
  color: #1B1B1B;
}
.el-header{
  /* border-bottom: 1px solid #707070; */
}
.el-container{
  flex-direction: column;
}
.el-main{
  background: #F8F8F8;
  min-height: 80%;
}
.el-form-item__label{
  color:#5F5F5F;
  font-size:16px;
  font-family: PingFang SC;
  padding-bottom: 6px !important;
}
</style>
