<template>
  <div class="credit-page">
        <Card title = "提现方式">
            <div class="item">
                <div class="back-btn" v-for="(item, index) in payType" :key="index" @click="changePayType(item.title,item.value)" :class="{active:valuePay==item.title}">
                    <img :src="item.img" alt="" class="back-img">
                    {{item.title}}
                </div>
            </div>
            <div class="item active">
                <p class="input-title">姓名</p>
                <el-input class="input" v-model="from.platformPerson"  style="width:260px"></el-input>
                <p class="input-title">帐户</p>
                <el-input class="input" v-model="from.platformAccount"  style="width:260px"></el-input>
            </div>
        </Card>
        <Card>
            <div class="item">
                <p class="title">可提现金额</p>
                <p class="content">{{balanceTotal}}</p>
            </div>
            <div class="item">
                <el-input class="input" v-model="from.amount" style="width:300px"></el-input>
                <Button @click.native="handleAll">全部提现</Button>
            </div>
        </Card>
        <Card title="验证码">
            <el-select v-model="from.verifyCodeType" clearable placeholder="请选择" style="margin-left:10px;margin-bottom:10px">
                <el-option
                v-for="item in CodeType"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <div class="item">
                <el-input class="input" v-model="from.verifyCode" style="width:300px"></el-input>
                <Button @click.native="handleCode">获取验证码</Button>
            </div>
        </Card>
        <Card>
            <p style="margin-bottom: 20px">温馨提示:</p>
            <p>1.提现金额须大于 1 元。</p>
            <p>2.提现审核一般3 - 5个工作日到账。</p>
        </Card>
        <Button style="margin-top:20px" @click.native="handleCash">立即提现</Button>
  </div>
</template>

<script>
import Card from '@/components/card'
import Button from '@/components/button'
import { mapState }  from 'vuex'
export default {
    inject:['reload'],
    data(){
        return {
            moneyData:[
                50,100, 200, 500
            ],
            payType:[
                {img: require("@/assets/weixin.png"),title: '微信', value: 'wxpay'},
                {img: require("@/assets/alipay.png"),title: '支付宝', value: 'alipay'},
                {img: require("@/assets/paypal.png"),title: 'Paypal', value: 'paypal'}
            ],
            from: {
                amount:0,
                verifyCode:null,
                verifyCodeType:1,
                platform:'wxpay',
                platformAccount: '',
                platformPerson:''
            },
            CodeType:[
                {name:'邮箱', id:1},
                {name:'手机', id:2}
            ],
            valuePay:'微信'
        }
    },
    components:{
        Card,
        Button
    },
    computed:{
        ...mapState({
            balanceTotal: state => state.balance.balanceTotal  
        })
    },
    created(){
        this.$store.dispatch('balance/detail')        
    },
    methods:{
        handleCash() {
            this.$store.dispatch('withdraw/create', {...this.from})
                .then(() => {
                    this.$message({
                        message: '已提交提现申请',
                        type: 'success'
                    });
                    this.reload()
                })
        },
        handleCode() {
            this.$store.dispatch('withdraw/code', {verifyCodeType: this.from.verifyCodeType})
        },
        handleAll() {
            this.from.amount = this.balanceTotal
        },
        changePayType(value,type){
            console.log(value)
            this.valuePay = value
            this.from.platform = type
        },
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