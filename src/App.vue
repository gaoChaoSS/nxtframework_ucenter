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
  font-size: 11px;
  font-family: PingFang SC;
  line-height: 31px;
  color: #1B1B1B;
}
.el-menu-item{
  margin:0px 6px !important;
}
.el-menu-item a{
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
  min-height: 800px;
  padding: 0px;
}
.el-form-item__label{
  color:#5F5F5F;
  font-size:14px;
  font-family: PingFang SC;
  padding-bottom: 2px !important;
}
.el-form-item{
  margin-bottom: 16px;
}
.el-breadcrumb{
  font-size: 16px;
}
.el-tabs__nav-scroll {
  overflow: hidden;
  background: #fff;
  padding: 0px 40px;
  box-sizing: border-box;
  width: 100%;
}
.el-tabs__nav-wrap::after{
  background: #fff;
}
.el-tabs__nav{
  padding: 2px 0px;
}
.el-tabs__item{
  font-size: 12px;
}
.el-loading-spinner i{
  color:#014785;
  font-size:50px;
}
a{
  text-decoration: none;
}
</style>
