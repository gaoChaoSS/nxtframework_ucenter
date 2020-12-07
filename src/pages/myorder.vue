<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部订单" name="first">
        <Order v-for="(item, index) in list" :key="index"
          :Lists="item.orderFormProductList"
          :amountFinally = "item.amountFinally"
          :datelineCreateReadable = "item.datelineCreateReadable"
          :id = "item.id"
         />
        <Pagination 
          @handleNumber="changeNumber($event)"
          :number="number[0]"
        />
    </el-tab-pane>
    <el-tab-pane label="待付款" name="second">待付款</el-tab-pane>
    <el-tab-pane label="待收货" name="third">待收货</el-tab-pane>
    <el-tab-pane label="待评价" name="fourth">待评价</el-tab-pane>
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
      this.$store.dispatch('order/list', {offset:(this.number[0] - 1)*10, limit: 10})
      console.log(this.list)
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      changeNumber(value){
        this.number[value.item] = value.number
        this.$store.dispatch('order/list', {offset:(this.number[0] - 1)*10, limit: 10})
        this.$forceUpdate();
      }
    }
  };
</script>