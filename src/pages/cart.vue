<template>
  <div class="cart-page">
    <Steps />
    <div class="cart-list">
        <div class="item" style="width:20px"></div>
            <div class="checkout" :class="{ checkouted: checkouts }" @click="handleAllCheck()" >
                <img class="checkout-img" src="@/assets/check.png" alt="">
            </div>
        <div class="item" style="width:360px">
            产品
        </div>
        <div class="item" style="width:120px">
            单价
        </div>
        <div class="item" style="width:240px">
            数量
        </div>
        <div class="item" style="width:160px">
            合计
        </div>
        <div class="item" style="width:80px">
            移除
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
        :invalid ="item.invalid"
    />
    <div class="cart-info">
        <div class="back-btn" @click="handleBack()">
            <i class="el-icon-back" style="font-size: 20px;margin-right:10px"></i>
            继续购物
        </div>
        <div class="buy-info">
            <div class="buy-info-item"><p class="buy-p">总计:    </p>￥{{total}}</div>
            <div class="buy-btn" @click="handleGoBuy()">去下单购买</div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters} from 'vuex';
import Cart from "@/components/cart";
import Steps from '@/components/Steps';
export default {
  data() {
    return {
      checkouts: false,
      productData: [],
    };
  },
  computed:{
    ...mapGetters([
        'productList'
    ]),
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
     console.log(this.$store)
     this.$store.dispatch('cart/detail');
    //  this.$store.commit('cart/SET_PRODUCT_LIST', this.productData)
     console.log(this.productList)
  },
  components: {
    Cart,
    Steps
  },
  watch:{
      productList:function(val) {
        console.log(val)
      }
  },
  methods:{
      handleCheckout(){
          console.log('checkout')
      },
      handleAllCheck(){
        //   this.$store.commit('cart/CHECK_ALL', !this.checkouts)
          this.productList.forEach(element => {
              if(element.checkout == !this.checkout){
                this.$store.dispatch('cart/selectProduct',{id: element.id, selected: !element.checkout})
              }
          });
          this.checkouts = !this.checkouts
      },
      handleGoBuy(){
          let arr = [];
          this.productList.forEach(element => {
              if(element.checkout){
                arr.push(element)
              }
          })
          console.log(arr)
          this.$store.commit('cart/BUY_PRODUCT', arr)
          this.$router.push({ name: 'address'})
      },
      handleBack(){
          this.$router.back();
      }
  }
};
</script>


<style scoped>
.cart-page {
    background: #fff;
    /* padding: 60px 100px; */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 0px;
}
p{
    padding: 0px;
    margin: 0px;
}
div{
    font-size: 12px;
}
.cart-list{
        display: flex;
    padding: 60px 100px;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
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
.cart-info{
    display: flex; 
    justify-content: space-between;
    width: 1200px;
    box-sizing: border-box;
    padding: 0 60px;
    margin:60px 0px;
}
.back-btn{
    width: 120px;
    height: 36px;
    color: #014785;
    border: 1px solid #014785;
    line-height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 10px;
}
.buy-info{
    display: flex;
    flex-direction: column;
    width: 400px;
    align-items: flex-end;
}
.buy-info-item{
    display: flex;
    font-size: 22px;
    margin-bottom: 30px;
}
.buy-p{
    margin-right: 100px;
}
.buy-btn{
    width: 120px;
    height: 36px;
    background: #014785;
    border: 1px solid #014785;
    line-height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    font-size: 10px;
}

</style>