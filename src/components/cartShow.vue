<template>
  <div class="cart">
    <div class="item" style="width:360px">
        <div class="detail">
            <img :src="image" class="detail-img" alt="">
            <div class="info">
                <div class="info-item title">
                    <p class="name">{{name}}</p>
                </div>
                <div class="info-item">
                    <p class="att" v-for="( item, index) in skus" :key="index">{{item.skuKeyName}}: {{item.skuValueName}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="item" style="width:120px">￥{{price}}</div>
    <div class="item" style="width:240px">
        {{nums}}
        <!-- <el-input-number v-model="nums" @change="handleChange" :min="0" label="描述文字"></el-input-number> -->
    </div>
    <div class="item" style="width:160px">￥{{total}}</div>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
export default {
    props:{
        id: {
            default: 0,
            type: Number
        },
        productId:{
            default: 0,
            type: Number
        },
        image:{
            default:'/ucenter/image/empty.png',
            type: String
        },
        checkout: {
            default: false,
            type: Boolean
        },
        price: {
            default: 100,
            type: Number
        },
        name: {
            default: '智能扫地机器人',
            type: String
        },
        num: {
            default: 1,
            type: Number
        },
        skus:{
            type: [Array, Object],
            // eslint-disable-next-line vue/require-valid-default-prop
            default:() =>[
                {
                "skuKeyName": "颜色",
                "skuValueName": "绿"
            }, {
                "skuKeyName": "尺码",
                "skuValueName": "XL"
            }
            ]
        }
    },
    data() {
        return {
            nums:0
        }
    },
    created(){
        this.nums = this.num;
    },
    computed:{
        total: function() {
            return (this.num * this.price).toFixed(2)
        }
    },
    methods: {
        handleChange(value) {
            // this.$store.commit('cart/SET_PRODUCT_NUM', {id:this.id, num: value})
            if(this.num < value)
                this.$store.dispatch('cart/addProduct',{product:{productId:this.productId,quantity:1,sku:this.skus}})
            else
                this.$store.dispatch('cart/delProduct',{id:this.id,quantity:this.nums - 1})
            this.$store.commit('cart/SET_PRODUCT_NUM', {id:this.id, num: value})
        },
        handleCheckout(){
            this.$store.commit('cart/CHECK_PRODUCT', {id: this.id})
        },
        handleDel() {
            this.$store.dispatch('cart/delProduct',{id:this.id,quantity:this.nums})
            this.$store.commit('cart/DEl_PRODUCT', {id:this.id})
        }
    }
}
</script>

<style scoped>
div{
    font-size:12px;
}
p{
    padding: 0px;
    margin: 0px;
}
.cart{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 140px;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(112 112 112 / 0.5);
}
.detail{
    display: flex;
}
.detail-img{
    height: 80px;
    width: 100px;
}
.info{
    /* margin-left: 20px; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
    padding-top: 0px;
}
.title{
    /* margin-bottom: 20px; */
    margin-bottom: 10px;
    font-size: 16px;
}

.checkout{
    border: 1px solid #1B1B1B;
    border-radius: 50%;
    
    height: 30px;
    width: 30px;
    display: flex;
    padding: 6px;
    box-sizing: border-box;
}
.checkouted{
    border: 1px solid #014785;
    background: #014785;
}
.checkout-img{
    width: 100%;
    height: auto;
}
.att{
    display: block;
    margin-right: 10px;
    color: #1B1B1B;
}
</style>