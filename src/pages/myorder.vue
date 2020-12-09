<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部订单" name="first" :item="0">
        <Order v-for="(item, index) in lists[0]" :key="index"
          :Lists="item.orderFormProductList"
          :amountFinally = "item.amountFinally"
          :datelineCreateReadable = "item.datelineCreateReadable"
          :orderId = "item.serialNum"
          :id = "item.id"
          :statusText = "item.statusText"
         />
        <Pagination 
          @handleNumber="changeNumber($event)"
          :number="number[0]"
          :item ="0"
        />
    </el-tab-pane>
    <el-tab-pane label="待付款" name="second" :item="1">
      <Order v-for="(item, index) in lists[1]" :key="index"
          :Lists="item.orderFormProductList"
          :amountFinally = "item.amountFinally"
          :datelineCreateReadable = "item.datelineCreateReadable"
          :orderId = "item.serialNum"
          :id = "item.id"
          :statusText = "item.statusText"
         />
        <Pagination 
          @handleNumber="changeNumber($event)"
          :number="number[1]"
          :item ="1"
        />
    </el-tab-pane>
    <el-tab-pane label="待收货" name="third" :item="2">
        <Order v-for="(item, index) in lists[2]" :key="index"
          :Lists="item.orderFormProductList"
          :amountFinally = "item.amountFinally"
          :datelineCreateReadable = "item.datelineCreateReadable"
          :orderId = "item.serialNum"
          :id = "item.id"
          :statusText = "item.statusText"
         />
        <Pagination 
          @handleNumber="changeNumber($event)"
          :number="number[2]"
          :item ="2"
        />
    </el-tab-pane>
    <el-tab-pane label="待评价" name="fourth" :item="3">
        <Order v-for="(item, index) in lists[3]" :key="index"
          :Lists="item.orderFormProductList"
          :amountFinally = "item.amountFinally"
          :datelineCreateReadable = "item.datelineCreateReadable"
          :orderId = "item.serialNum"
          :id = "item.id"
          :statusText = "item.statusText"
         />
        <Pagination 
          @handleNumber="changeNumber($event)"
          :number="number[3]"
          :item ="3"
        />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
 import Order from '@/components/order'
 import Pagination from '@/components/Pagination'
 import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        activeName: 'first',
        number:[
          1,1,1,1
        ],
        lists:[
          [],[],[],[]
        ]
      };
    },
    computed: {
      ...mapGetters({
         list: 'orderList'
      })
    },
    components:{
        Order,
        Pagination
    },
    created(){
      this.loadData({item:0,number: 1})
    },
    methods: {
      handleClick(tab) {
        console.log(tab.$attrs.item)
        this.loadData({item:tab.$attrs.item,number: 1})
        // console.log(tab, event);
      },
      changeNumber(value){
        this.loadData(value)
      },
      loadData(value){
        this.number[value.item] = value.number
        let data = {offset:(this.number[value.item] - 1)*10, limit: 10}
        if(value.item == 1){
          data.isPaid = true
        }
        if(value.item == 2){
          data.isDelivery = true
        }
        if(value.item == 3){
          data.isReviews = true
        }
        this.$store.dispatch('order/list', data).then(() => {
            console.log(value)
            this.lists[value.item] = this.list
            console.log(this.lists[value.item])
            this.$forceUpdate();
        })
      }
    }
  };
</script>