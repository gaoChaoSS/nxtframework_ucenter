<template>
  <div class="info-page">
    <div class="info-item">
      <img src="@/assets/info/1.png" alt="" class="info-item-img">
      <p class="info-item-title">帐户余额   {{balance}}</p>
      <div class="btn-group">
        <div class="btn">充值</div>
        <div class="btns">提现</div>
      </div>
    </div>
    <div class="info-item">
      <img src="@/assets/info/2.png" alt="" class="info-item-img">
      <p class="info-item-title">推广收益   {{profit}}</p>
      <div class="btn-group">
        <div class="btn">转到余额</div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-title">
          支付方式
          <router-link to="/order" class="info-title-a">查看所有订单</router-link>
      </div>
      <div class="info-content">
          <img src="@/assets/info/3.png" alt="" width="120px">
          <p>您最近没有待处理订单</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex' 
  export default {
    data() {
      return {
        activeName: 'first',
        profit:1
      };
    },
    computed:{
      ...mapState({
        balance: state => state.user.balance
      })
    },
    created(){
      this.$store.dispatch('user/balance')
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style scoped>
.info-page{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #F8F8F8;
}
.info-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 49%;
  height: 120px;
  background: #fff;
  padding: 0px 40px;
  box-sizing: border-box;
}

.info-item-img{
  width: 40px;
  height: 40px;
}
.info-item-title{
  width: 100%;
  margin-left: 20px;
  text-align: left;   
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 29px;
  color: #1B1B1B;
}
.btn-group{
  min-width: 240px;
  display: flex;
  align-items: center;
}
.info-card{
    background: #fff;
    width: 100%;
    /* height: 200px; */
    padding: 30px 0px;
    margin-top: 20px;
}
.btn{
  height: 40px;
  padding: 0px 40px;
  background: #014785;
  border: 1px solid #014785;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#fff;
  margin-right: 10px;
}
.btns{
  height: 40px;
  padding: 0px 40px;
  background: #fff;
  border: 1px solid #014785;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#014785;
}
.info-title{
    /* font-size: 24px;
    font-weight: 600;
     */
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40px;
    color: #014785;
    padding-left: 60px;
    position: relative;
}
.info-title:before{
    content: '';
    width: 4px;
    height: 34px;
    position: absolute;
    top: 4px;
    background: #014785;
    left: 44px;

}
.info-content{
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    margin-top: 40px;
    justify-content:  flex-start;
    align-items: center;
    /* flex-wrap: wrap; */
}
.content{
    margin:0px 40px;
}
p {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 29px;
  color: #5F5F5F;
}
.info-title-a{
  font-size: 18px;
  color:#0082FF;
  text-decoration: none;
  float: right;
  margin-right: 20px;
}
</style>