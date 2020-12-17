<template>
  <div class="order">
      <div class="title">
          <p>{{datelineCreateReadable}}</p>
          <p style="margin-left:20px">订单号: {{orderId}}</p>
      </div>
      <div class="content">
          <div class="product-list" >
              <div class="product" v-for="(item, index) in Lists" :key="index">
                  <img :src="item.picUrl" alt="">
                  <div class="product-content">
                        <p class="product-name">{{item.productName}}</p>
                        <div class="product-arr">
                            <div class="arr-item" v-for="(arr, key) in item.productSku" :key="key">
                                {{arr.skuKeyName}} {{arr.skuValueName}}
                            </div>
                        </div>
                  </div>
                  <p class="num">x{{item.quantity}}</p>
              </div>
          </div>
          <div class="row">
             <p>{{amountFinally | price}}</p>
          </div>
          <div class="row">
              <p>{{statusText | state}}</p>
              <div class="button" @click="handleDetail()">订单详情</div>
          </div>
          <div class="row">
            <div>
              <router-link :to="{name:'pay',query:{id:this.id}}" v-if="!paid " >付款</router-link>
              <router-link :to="{path:'/evaluate',query:{orderid:this.id}}" v-if="!reviews && done " >评价</router-link>
              <a @click="confirmReceived" v-if="!done && delivery " style="color: -webkit-link;cursor: pointer;" >确认收货</a>
              <router-link :to="{path:'serive_detail',query:{orderid:this.id}}" v-if="paid">申请售后</router-link>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        id: {
            default: 1,
            type: [String, Number]
        },
        datelineCreateReadable:{
            default: '2020-10-31 20:53:17',
            type: String
        },
        orderId: {
            default: '21312312312312',
            type: [String, Number]
        },
        Lists:{
            // eslint-disable-next-line vue/require-valid-default-prop
            default:()=>[
                {
                    picUrl:'/image/login.png',
                    productName:'扫地机器人 智能家电 ',
                    quantity: 1,
                    productSku:[
                        {key:'颜色', value: '白色'}
                    ]
                },
                {
                    picUrl:'/image/login.png',
                    productName:'扫地机器人 智能家电 ',
                    quantity: 1,
                    productSku:[
                        {key:'颜色', value: '白色'}
                    ]
                }
            ],
            type: Array
        },
        amountFinally:{
            default: 30.01,
            type: Number
        },
        state:{
            default: 1,
            type: Number
        },
        statusText:{
            default:'',
            type:String
        },
        paid:{
            default: false,
            type: Boolean
        },
        refund:{
            default: false,
            type: Boolean
        },
        reviews:{
            default: false,
            type: Boolean
        },
        done:{
            default: false,
            type: Boolean
        },
        delivery:{
            default: false,
            type: Boolean
        }
    },
    filters: {
        state: function (value) {
            if(value == '订单付款'){
                value = '等待付款'
            }
            return value
        },
        price: function (value) {
            return  '￥'+value;
        }
    },
    created() {
        
    },
    methods: {
        handleDetail(){
            if(this.statusText == '订单付款'){
                this.$router.push({ name: 'pay',query:{id: this.id}})
            }else {
                this.$router.push({path:'/detail', query:{id: this.id}})
            }
        },
        confirmReceived() {
            this.$store.dispatch('order/confirmReceived',{id: this.id})
            this.$forceUpdate()
        }
    }
}
</script>

<style scoped>
a{
    font-size: 10px;
    margin-right: 10px;
    display: inline-block;
}
.order{
    /* display: flex; */
    width: 100%;
    margin-bottom: 10px;
    background: #fff;
}
.title{
    font-size: 14px;
    width: 100%;
    border-bottom: 1px solid #70707080;
    display: flex;
    /* margin-bottom: 10px; */
    padding: 12px 20px;
    box-sizing: border-box;
    color: #5F5F5F;
}

.title p{
    font-size: 14px;
    color: #5F5F5F;
}
.content{
    display: flex;
    width: 100%;
}
p {
    margin: 0px;
    padding:0px;
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #1B1B1B;
}
.product-list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}
.product{
    display: flex;
    padding: 10px;
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
    width: 100%;
    
}
.product img{
    width: 60px;
    height: 60px;
}
.product-name{
    width: 100%;
    margin-bottom: 20px;
    font-size: 10px;
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
    display: inline-block;
    margin-right: 10px;
}
.row{
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    min-width: 200px;
    padding-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
    box-sizing: border-box;
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
}
.button{
    background: #014785;
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 26px;
    color: #FFFFFF;
    width: 120px;
    padding: 4px 6px;
    box-sizing: border-box;
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
    /* letter-spacing: 50px; */
}
</style>