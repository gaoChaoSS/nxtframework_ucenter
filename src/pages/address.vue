<template>
    <div class="address-page">
        <div class="info-card" v-if="!token">
            <div class="form-group" >
                <el-form label-position="right" label-width="160px" :model="login">
                    <el-form-item label="用户名" class="label">
                        <el-input v-model="login.username" style="width:470px"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" :model="formInline" label-width="160px"  class="demo-form-inline">
                    <el-form-item label="密码">
                        <el-input  type="password" v-model="login.password" style="width:300px"></el-input>                        
                    </el-form-item>
                    <el-form-item>
                        <div class="buy-btn" >立即注册</div>
                    </el-form-item>
                </el-form>
                <el-form label-position="right" label-width="160px" :model="login">
                    <el-form-item label="">
                        <p class="default-p-1">已有账号？</p>
                        <router-link to="/login" class="p-bank">登录</router-link>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="info-card">
            <div class="info-title">
                收货信息
            </div>
            <div class="form-group" style="margin-top:30px">
                <el-form label-position="right" label-width="160px" :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item label="姓名/Name" class="label" prop="deliveryPerson">
                        <el-input v-model="loginForm.deliveryPerson" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="国家地区/Country" prop="deliveryCountry">
                        <el-select v-model="loginForm.deliveryCountry" clearable placeholder="请选择" @change="deliveryCountry">
                            <el-option
                            v-for="item in deliveryPersonOption"
                            :key="item.id"
                            :label="item.regionName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="省份/Province" prop="deliveryProvince">
                        <el-select v-model="loginForm.deliveryProvince" clearable placeholder="请选择" @change="deliveryProvince">
                            <el-option
                            v-for="item in deliveryProvinceOption"
                            :key="item.id"
                            :label="item.regionName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="城市/City" prop="deliveryCity">
                        <el-select v-model="loginForm.deliveryCity" clearable placeholder="请选择">
                            <el-option
                            v-for="item in deliveryCityOption"
                            :key="item.id"
                            :label="item.regionName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="地址/Address" prop="deliveryAddress">
                        <el-input  v-model="loginForm.deliveryAddress" style="width:800px"></el-input>
                    </el-form-item>
                    <el-form-item label="电话/Phone" prop="deliveryPhone">
                        <el-input  v-model="loginForm.deliveryPhone" style="width:200px"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="info-card">
            <div class="info-title">
                配送方式
            </div>
            <div class="info-content">
                <div class="back-btn" v-for="(item, index) in deliveryOption" :key="index" @click="changePayType(item.id)" :class="{active:loginForm.deliveryConfigId==item.id}">
                    {{item.name}}
                </div>
            </div>
            <p class="default-p" style="margin-left:40px">配送费</p>
            <p class="price-p">￥{{deliveryCost}}</p>
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
            <div class="buy-info-item"><p class="default-p">总计:    </p><span class="price-p">￥{{total}}</span></div>
        </div>

        <div class="info-card">
            <div class="content">
                <p class="default-p">备注（如要发票请备注发票信息）</p>
                <el-input v-model="loginForm.deliveryRemark"></el-input>
            </div>
        </div>
        <div class="cart-info">
            <div class="back-btn" @click="handleGoCart()">
                <i class="el-icon-back" style="font-size: 30px;margin-right:20px"></i>
                返回购物车
            </div>
            <div class="buy-info">
                <div class="buy-btn-1" @click="handleGoBuy()">提交并核对订单</div>
            </div>
        </div>
    </div>
</template>

<script>
import Cart from '@/components/cartShow.vue'
import { mapGetters, mapState} from 'vuex';
export default {
    data(){
        return {
            login:{
                username:'',
                password:'',
            },
            loginForm:{
                deliveryPerson:null,
                deliveryCountry:"",
                deliveryProvince:null,
                deliveryCity:null,
                deliveryProvinceName:'',
                deliveryCityName:'',
                deliveryAddress: '5',
                deliveryPhone:'13555',
                deliveryConfigId:1,
                deliveryConfig:'',
                dealPlatform:1,
                deliveryRemark:'dddd',
                deliveryPostcode:"cccc"
            },
            labelPosition: 'top',
            CountryOptions: [{
                value: '1',
                label: '中国'
                }
            ],
            ProvinceOptions: [{
                value: '1',
                label: '广东省'
                }
            ],
            value:'',
            rules:{
                deliveryCity:[
                    { type: 'date', required: true, message: '请选择城市！', trigger: 'change' },
                ],
                deliveryCountry:[
                    { type: 'date', required: true, message: '请选择国家或者地区！', trigger: 'change' },
                ],
                deliveryProvince:[
                      { type: 'date', required: true, message: '请选择省份！', trigger: 'change' },
                ],
                deliveryPerson:[
                    { required: true, message: '请输入用户名!', trigger: 'blur' },
                ],
                deliveryAddress:[
                    { required: true, message: '请输入地址!', trigger: 'blur' },
                ],
                deliveryPhone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ]
            }
        }
    },

    components:{
        Cart
    },
    computed:{
        ...mapGetters([
            'productList',
            'token'
        ]),
        ...mapState({
            deliveryPersonOption:state =>state.order.deliveryPersonOption,
            deliveryProvinceOption:state => state.order.deliveryProvinceOption,
            deliveryCityOption: state => state.order.deliveryCityOption,
            deliveryOption: state => state.order.deliveryOption,
            deliveryCost: state => state.order.deliveryCost,
            orderId: state => state.order.orderId
        }),
        total: function(){
            // eslint-disable-next-line no-unused-vars
            var total = 0;
            this.productList.map(item => {
                if(item.checkout)
                total += (item.productPrice * item.quantity)
            })
            return total
        }
    },
    created(){
        this.$store.dispatch('order/deliveryConfigList')
        this.$store.dispatch('order/deliveryRegionList', 0)
        console.log(this.deliveryOption)
        // this.$store.dispatch('order/deliveryCost',this.loginForm)
        // this.$store.dispatch('order/pay',{id:33,paymentMethod:"balance"})
        // this.$store.dispatch('order/statusPaid',{id:34})
        this.$store.dispatch('cart/detail')
    },
    methods:{
        changePayType(value){
            console.log(value)
            this.$store.dispatch('order/deliveryCost',this.loginForm)
            this.loginForm.deliveryConfigId = value
        },
        handleGoBuy(){
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    // console.log(this.$refs['loginForm'])
                    // alert('submit!');
                    this.$store.commit('cart/SET_ADDRESS', this.loginForm)
                    this.$store.dispatch('order/create',this.loginForm)                    
                        .then(() => {
                            this.$router.push({ name: 'pay',query:{id: this.orderId}})
                        })
                        .catch(() => {
                            this.$message({
                                message: '提交失败！',
                                type: 'error'
                            });
                        })
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
            // console.log(this.loginForm)
        },
        deliveryCountry(){
            if(this.loginForm.deliveryCountry)
            this.$store.dispatch('order/deliveryProvince', this.loginForm.deliveryCountry)
        },
        deliveryProvince(){
            if(this.loginForm.deliveryProvince)
            this.$store.dispatch('order/deliveryCity', this.loginForm.deliveryProvince)
        },
        handleGoCart(){
            this.$router.push('/cart')
        }
    }
}
</script>

<style scoped>
.address-page{
    width: 100%;
    box-sizing: border-box;
    padding: 60px 100px;
    background: #fff;
}
.info-card{
    background: #F8F8F8;
    width: 100%;
    /* height: 200px; */
    padding: 30px 0px;
    margin-top: 20px;
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
    margin-left: 40px;
    margin-top: 40px;
    /* flex-wrap: wrap; */
}
.content{
    margin:0px 40px;
}
.back-btn{
    width: 200px;
    height: 46px;
    color: #5F5F5F;
    border: 2px solid #5F5F5F;
    line-height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 20px;
}
.back-btn.active{
    border: 2px solid #014785;
}
.default-p{    
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #5F5F5F;
    display: inline-block;
    margin-right: 20px;
}
.price-p{
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28px;
    color: #1B1B1B;
    display: inline-block;
}
.cart-list{
        display: flex;
    padding: 60px 100px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 10px;
    box-sizing: border-box;
    background: #f8f8f8;
    margin-top: 60px;
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
    margin-bottom: 20px;
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
    display: flex; 
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    /* padding: 0 100px; */
    margin:60px 0px;
}
.buy-btn-1{
    width: 200px;
    height: 46px;
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