<template>
  <div class="footer">
    <div class="footer-item">
      <p>关于我们</p>
      <p>关于我们</p>
      <p>关于我们</p>
    </div>
    <div class="footer-item">
      <p>Copyright © 2020. NxtFramework.com All Rights Reserved.</p>
    </div>
    <div class="footer-item">
      <p>备案号 88888888</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer{
  background: #1B1B1B;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:40px 0px;
  padding-bottom: 30px;
}
.footer-item{
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-item p{
  
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: normal;
  line-height: 30px;
  color: #FFFFFF;
  padding: 0px 30px;
  opacity: 1;
}
</style>