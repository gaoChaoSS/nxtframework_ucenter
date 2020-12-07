<template>
  <div class="order">
      <div class="title">
          <p>{{time}}</p>
          <p style="margin-left:20px">订单号: {{orderId}}</p>
      </div>
      <div class="content">
          <div class="product-list" >
              <div class="product" v-for="(item, index) in Lists" :key="index">
                  <div style="width:60px;align-self: center; text-align: center;">
                      <el-checkbox v-model="item.checked" style="align-self: center;" v-show="isChecked" @change="handleChange" />
                  </div>
                  <img :src="item.picUrl" alt="">
                  <div class="product-content">
                        <p class="product-name">{{item.productName}}</p>
                        <div class="product-arr">
                            <div class="arr-item" v-for="(arr, key) in item.sku" :key="key">
                                {{arr.skuValueName}} {{arr.skuKeyName}}
                            </div>
                        </div>
                  </div>
                  <p class="num">x{{item.quantity}}</p>          
                  <div style="    width: 120px;align-items: self-end; display: flex;">
                    <el-input-number v-model="item.sum" :min="0" :max="item.quantity" style="align-self: flex-end;" v-show="isChecked" />
                  </div>
                  <p class="num"> {{item.productPriceDeal | price}}</p>  
              </div>
          </div>
          <div class="row">
              <p>{{total}}</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        id: {
            default: 1,
            type: Number
        },
        time:{
            default: '2020-10-31 20:53:17',
            type: String
        },
        orderId: {
            default: '21312312312312',
            type: [String,Number]
        },
        Lists:{
            // eslint-disable-next-line vue/require-valid-default-prop
            default:()=>[
                {
                    checked:true,
                    picUrl:'/image/login.png',
                    productName:'扫地机器人 智能家电 ',
                    quantity: 2,
                    sum: 1,
                    productPriceDeal: 13.00,
                    sku:[
                        {skuKeyName:'颜色', skuValueName: '白色'}
                    ]
                },                
            ],
            type: [Array, Object]
        },
        price:{
            default: 30.01,
            type: Number
        },
        state:{
            default: 1,
            type: Number
        },
        isChecked:{
            default: false,
            type:Boolean
        }
    },
    computed:{
        total: function(){
            let sum = 0
            this.Lists.map(item => {
                if(item.checked) {
                    sum += item.sum * item.productPriceDeal
                }
            })
            return '$'+ sum.toFixed(2)
        }
    },
    created(){
        console.log(this.Lists);
    },
    filters: {
        state: function (value) {
            if (!value) return ''
            if(value == 1) return '已完成'
        },
        price: function (value) {
            return  '￥'+value;
        }
    },
    methods: {
        handleDetail(){
            this.$router.push('/detail')
        },
        handleChange()
        {
            this.$store.commit('refund/CHECK_PRODUCT', this.id)
        }
    }
}
</script>

<style scoped>
.order{
    /* display: flex; */
    width: 100%;
    margin-bottom: 10px;
    background: #F8F8F8;
}
.title{
    font-size: 12px;
    width: 100%;
    border-bottom: 1px solid #70707080;
    display: flex;
    /* margin-bottom: 10px; */
    padding: 12px 20px;
    box-sizing: border-box;
    color: #5F5F5F;
}

.title p{
    font-size: 10px;
    color: #5F5F5F;
}
.content{
    display: flex;
    width: 100%;
}
p {
    margin: 0px;
    padding:0px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #1B1B1B;
}
.product-list{
    display: flex;
    flex-direction: column;
    width: 100%;
}
.product{
    display: flex;
    padding: 20px 20px;
    padding-right: 0px;
    box-sizing: border-box;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
}
.product::after{
    content:  '';
    position: absolute;
    width: 100%;
    height: 1px;
    background:  #70707080;
    bottom: 0px;
}
.product:last-child::after{
    width: 0px;
}
.product-content{
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 280px;
    
}
.product img{
    width: 100px;
    height: 110px;
}
.product-name{
    width: 100%;
    font-size: 14px;
    margin-bottom: 10px;    
    font-family: PingFang SC;
    font-weight: 400;
    color: #1B1B1B;
}
.product-arr{
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 23px;
    color: #5F5F5F;
}
.arr-item{

}
.row{
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    min-width: 200px;
    padding-top: 20px;
    border-left: 1px solid #70707079;
}
.num{
    align-self: flex-end; 
    margin-bottom:10px;
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 23px;
    color: #5F5F5F;
    min-width: 160px;
    text-align: center;
}
.state{
    min-width: 220px;
    /* height: 100%; */
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 26px;
    color: #F3664B;
    /* border-left: 1px solid #70707079; */
    text-align: center;
    align-self: center;
    position: relative;
}
.state::after{
    content: '';
    position: absolute;
    width: 1px;
    height: 150px;
    top: -65px;
    left: 0px;
    background: #70707079;
}
.button{
    background: #014785;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 26px;
    color: #FFFFFF;
    width: 120px;
    padding: 6px 10px;
    box-sizing: border-box;
    text-align: center;
    margin-top: 10px;
    /* letter-spacing: 50px; */
}
</style> 