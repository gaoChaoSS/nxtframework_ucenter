<template>
  <div class="credit-page">
        <Card title = "提现方式">
            <div class="item">
                <div class="back-btn" v-for="(item, index) in payType" :key="index">
                    <img :src="item.img" alt="" class="back-img">
                    {{item.title}}
                </div>
            </div>
            <div class="item active">
                <p class="input-title">姓名</p>
                <el-input class="input"  style="width:260px"></el-input>
                <p class="input-title">帐户</p>
                <el-input class="input"  style="width:260px"></el-input>
            </div>
        </Card>
        <Card>
            <div class="item">
                <p class="title">可提现金额</p>
                <p class="content">90.00</p>
            </div>
            <div class="item">
                <el-input class="input" style="width:300px"></el-input>
                <Button>全部提现</Button>
            </div>
        </Card>
        <Card title="验证码">
            <div class="item">
                <el-input class="input" style="width:300px"></el-input>
                <Button>获取验证码</Button>
            </div>
        </Card>
        <Card>
            <p style="margin-bottom: 20px">温馨提示:</p>
            <p>1.提现金额须大于 1 元。</p>
            <p>2.提现审核一般3 - 5个工作日到账。</p>
        </Card>
        <Button style="margin-top:20px">立即支付</Button>
  </div>
</template>

<script>
import Card from '@/components/card'
import Button from '@/components/button'
export default {
    data(){
        return {
            moneyData:[
                50,100, 200, 500
            ],
            payType:[
                {img: require("@/assets/weixin.png"),title: '微信', value: 'wxpay'},
                {img: require("@/assets/alipay.png"),title: '支付宝', value: 'alipay'},
                {img: require("@/assets/paypal.png"),title: 'Paypal', value: 'paypal'}
            ]
        }
    },
    components:{
        Card,
        Button
    }
}
</script>

<style scoped>
.back-img{
    height: 20px;
    margin-right: 10px;
}
.back-btn{
    width: 140px;
    height: 40px;
    color: #5F5F5F;
    border: 2px solid #5F5F5F;
    line-height: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 20px;
    font-size: 14px;
}
.back-btn.active{
    border: 2px solid #014785;
}
p{
    padding:0px;
    margin:0px;
    color:#5F5F5F;
    font-size: 12px;
}
.item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
}
.title{
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 23px;
    color: #1B1B1B;
    opacity: 1;
}
.content{
    margin-left: 20px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 22px;
    color: #1B1B1B;
    opacity: 1;

}
.input{
    margin-left: 10px;
    margin-right: 10px;
}
.item.active{
    background: #F8F8F8;
    padding: 10px 20px;
    margin-right: 40px;
    box-sizing: border-box;
    /* padding-right: 40px;  */
    /* width: auto; */
}
.input-title{
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 23px;
    color: #1B1B1B;
    opacity: 1;
    margin-left: 20px;
}
</style>