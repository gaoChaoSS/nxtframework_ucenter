<template>
  <div class="order">
      <div class="title">
          <p>{{time}}</p>
          <p style="margin-left:20px">订单号: {{orderId}}</p>
      </div>
      <div class="content">
          <div class="product-list" >
              <div class="product" v-for="(item, index) in Lists" :key="index">
                  <img :src="item.img" alt="">
                  <div class="product-content">
                        <p class="product-name">{{item.title}}</p>
                        <div class="product-arr">
                            <div class="arr-item" v-for="(arr, key) in item.arr" :key="key">
                                {{arr.key}} {{arr.value}}
                            </div>
                        </div>
                  </div>
                  <p class="num">x{{item.num}}</p>
              </div>
          </div>
          <div class="row">
             <p>{{price | price}}</p>
          </div>
          <div class="row">
              <p>{{state | state}}</p>
              <div class="button" @click="handleDetail()">订单详情</div>
          </div>
          <div class="row">
              <a href="">评价</a>
              <a href="">申请售后</a>
              <a href="">再次购买</a>
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
            type: String
        },
        Lists:{
            // eslint-disable-next-line vue/require-valid-default-prop
            default:()=>[
                {
                    img:'/image/login.png',
                    title:'扫地机器人 智能家电 ',
                    num: 1,
                    arr:[
                        {key:'颜色', value: '白色'}
                    ]
                },
                {
                    img:'/image/login.png',
                    title:'扫地机器人 智能家电 ',
                    num: 1,
                    arr:[
                        {key:'颜色', value: '白色'}
                    ]
                }
            ],
            type: Array
        },
        price:{
            default: 30.01,
            type: Number
        },
        state:{
            default: 1,
            type: Number
        }
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
        }
    }
}
</script>

<style scoped>
.order{
    /* display: flex; */
    width: 100%;
    margin-bottom: 10px;
    background: #fff;
}
.title{
    font-size: 18px;
    width: 100%;
    border-bottom: 1px solid #70707080;
    display: flex;
    /* margin-bottom: 10px; */
    padding: 12px 20px;
    box-sizing: border-box;
    color: #5F5F5F;
}

.title p{
    font-size: 18px;
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
    width: 100px;
    height: 110px;
}
.product-name{
    width: 100%;
    font-size: 20px;
    margin-bottom: 20px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #1B1B1B;
}
.product-arr{
    font-size: 16px;
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
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 23px;
    color: #5F5F5F;
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