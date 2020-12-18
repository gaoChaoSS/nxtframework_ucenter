<template>
    <div class="address-page">
        <div class="info-card">
            <div class="info-title">
                收货信息
            </div>
            <div class="content" style="margin-top:30px">
                <div class="item">
                    <p class="title">邮箱：</p>
                    <p class="content-p">sssss@aaa.com</p>
                </div>
                <div class="item">
                    <p class="title">姓名:</p>
                    <p class="content-p">{{deliveryPerson}}</p>
                </div>
                <div class="item">
                    <p class="title">收货地址：</p>
                    <p class="content-p">{{deliveryCountry}} , {{deliveryProvince}} , {{deliveryCity}} , {{deliveryAddress}}</p>
                </div>
                <div class="item">
                    <p class="title">联系电话：</p>
                    <p class="content-p">{{deliveryPhone}}</p>
                </div>
                <div class="item">
                    <p class="title">支付方式：</p>
                    <p class="content-p">{{valuePay}}</p>
                </div>
                <div class="item">
                    <p class="title">配送方式：</p>
                    <p class="content-p">顺丰</p>
                </div>
                <div class="item">
                    <p class="title">备注：</p>
                    <p class="content-p">{{deliveryRemark}}</p>
                </div>  
            </div>
        </div>
        <div class="info-card">
            <div class="info-title">
                支付方式
            </div>
            <div class="info-content">
                <div class="back-btn" v-for="(item, index) in payType" :key="index" @click="changePayType(item.title,item.value)" :class="{active:valuePay==item.title}">
                    <img :src="item.img" class="back-img" alt="">
                    {{item.title}}
                </div>
            </div>
        </div>
        <div class="info-card">
            <div class="info-title">
                商品列表
            </div>
            <div class="content">
                <div class="cart-list">
                    <div class="item" style="width:460px">
                        产品
                    </div>
                    <div class="item" style="width:200px">
                        单价
                    </div>
                    <div class="item" style="width:240px">
                        数量
                    </div>
                    <div class="item" style="width:200px">
                        合计
                    </div>
                </div>
                <Cart v-for="(item, index) in productList" :key="index"  
                    :id="item.id"
                    :name="item.productName"
                    :image="item.picUrl"
                    :skus="item.sku"
                    :price="item.productPrice"
                    :num="item.quantity"
                    :checkout="item.checkout"
                    :productId="item.productId"
                />
            </div>
        </div>
        <div class="cart-info">
            <div class="back-btn" @click="handleBack()" v-show="false"> 
                <i class="el-icon-back" style="font-size: 30px;margin-right:20px"></i>
                返回修改
            </div>
            <div class="buy-info" style="float: right">
                <div class="buy-btn-1" @click="handleGoBuy()">已核对,立即付款</div>
            </div>
        </div>
    </div>
</template>

<script>
import Cart from '@/components/cartShow.vue'
import { mapState, mapGetters} from 'vuex';
export default {
    data(){
        return {
            loginForm:{
                username:'',
                password:''
            },
            labelPosition: 'top',
            value: 11,
            payType:[
            ],
            paymentMethod:'wxpay',
            valuePay:'微信',
            id: 0
        }
    },
    components:{
        Cart
    },
    computed:{
        ...mapState({
            deliveryCountry: state => state.order.deliveryCountry,
            deliveryProvince: state => state.order.deliveryProvince,
            deliveryCity: state => state.order.deliveryCity,
            deliveryPerson: state => state.order.deliveryPerson,
            deliveryRemark: state => state.order.deliveryRemark,
            deliveryAddress: state => state.order.deliveryAddress,
            deliveryPhone: state => state.order.deliveryPhone,
            orderId: state => state.order.orderId,
            productList: state => state.order.productList,
            paid: state => state.order.paid
        }),
        ...mapGetters([
           'balance'
        ])
    },
    created(){
        this.id = this.$route.query.id 
        this.$store.dispatch('user/balance')
        this.$store.dispatch('order/detail',this.id);
        this.payType= [
            {img: require("@/assets/weixin.png"),title: '微信', value: 'wxpay'},
            {img: require("@/assets/alipay.png"),title: '支付宝', value: 'alipay'},
            {img: require("@/assets/paypal.png"),title: 'Paypal', value: 'paypal'},
            {img: require("@/assets/balance.png"),title: '金额：'+ this.balance, value: 'balance'}
        ]
        console.log(this.payType)
        console.log(this.id)
    },
    methods:{
        changePayType(value,type){
            console.log(value)
            this.valuePay = value
            this.paymentMethod = type
        },
        handleGoBuy(){
            this.$store.dispatch('order/pay',{id:this.id,paymentMethod:this.paymentMethod})
            this.$confirm('已提交付款，等待支付结果', {
                confirmButtonText: '已完成付款',
                cancelButtonText: '取消',
                center: true
            }).then(() => {
                this.$router.push({path:'/payresult', query:{id : this.id}})
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleBack(){
            this.$router.back()
        }
    }
}
</script>

<style scoped>
.address-page{
    background: #fff;
    /* padding: 60px 100px; */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 0px;
}
.info-card{
    background: #F8F8F8;
    width: 1200px;
    /* height: 200px; */
    padding: 15px 0px;
    margin-top: 14px;
}
.info-title{
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 32px;
    color: #014785;
    padding-left: 40px;
    position: relative;
}
.info-title:before{
    content: '';
    width: 4px;
    height: 26px;
    position: absolute;
    top: 4px;
    background: #014785;
    left: 30px;
}
.info-content{
    display: flex;
    margin-left: 20px;
    margin-top: 20px;
    /* flex-wrap: wrap; */
}
.content{
    margin:0px 20px;
}
.back-btn{
    width: 120px;
    height: 36px;
    color: #5F5F5F;
    border: 2px solid #5f5f5f54;
    /* line-height: 46px; */
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 20px;
    font-size:10px;
        display: inline-flex;
    /* line-height: 36px; */
}
.back-btn.active{
    border: 2px solid #014785;
}
.default-p{    
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #5F5F5F;
    display: inline-block;
    margin-right: 20px;
}
.price-p{
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28px;
    color: #1B1B1B;
    display: inline-block;
}
.cart-list{
    display: flex;
    padding: 20px 100px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 36px;
    padding: 10px;
    box-sizing: border-box;
    background: #f8f8f8;
    margin-top: 10px;
}
.detail{
    display: flex;
}
.detail-img{
    height: 100px;
    width: 120px;
}
.info{
    /* margin-left: 20px; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
    padding-top: 4px;
}
.title{
    /* margin-bottom: px; */
}
.form-group{
    /* margin: 0px 40px; */
}
.buy-btn{
    width: 160px;
    height: 38px;
    background: #014785;
    border: 1px solid #014785;
    line-height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color:#fff;
    font-size: 18px;
}
.p-bank{
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #5F5F5F;
    display: inline-block;
}
.default-p-1{
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #5F5F5F;
    display: inline-block;
    margin:0px;
    margin-right: 20px;
    
}

.cart-info{
    /* display: flex; 
    justify-content: space-between; */
    width: 1200px;
    box-sizing: border-box;
    /* padding: 0 100px; */
    margin:40px 0px;
}
.buy-btn-1{
    width: 120px;
    height: 36px;
    background: #014785;
    border: 1px solid #014785;
    line-height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color:#fff;
    font-size: 10px;
}
.item{
    display: flex;
    margin-top: 4px;
}
.title{
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #5F5F5F;
    width: 200px;
    text-align: left;
    margin: 0px;
}
.content-p{
    
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #1B1B1B;
    margin: 0px;
}
.back-img{
    height: 20px;
    margin-right: 10px;
}
</style>

<style scoped>
.content{
    margin:0px 20px;
}
.default-p{    
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #5F5F5F;
    display: inline-block;
    margin-right: 20px;
}
.price-p{
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28px;
    color: #1B1B1B;
    display: inline-block;
}
.detail{
    display: flex;
}
.detail-img{
    height: 100px;
    width: 120px;
}
.info{
    /* margin-left: 20px; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
    padding-top: 4px;
}
.title{
    margin-bottom: 2px;
}
.form-group{
    /* margin: 0px 40px; */
}
.buy-btn{
    width: 120px;
    height: 30px;
    background: #014785;
    border: 1px solid #014785;
    line-height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color:#fff;
    font-size: 10px;
}
.p-bank{
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #5F5F5F;
    display: inline-block;
}
.default-p-1{
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #5F5F5F;
    display: inline-block;
    margin:0px;
    margin-right: 20px;
    
}
.buy-info-item{
    display: inline-block;
    width: 100%;
    text-align: right;
    padding-right: 40px;
    box-sizing: border-box;

}
.buy-p{

}
</style>