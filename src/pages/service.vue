<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部售后" name="first">
        <Order v-for="(item, index) in list" :key="index"
          :lists="item.orderFormRefundProductList"
          :id="item.id"
          :orderId="item.orderFormId"
          :datelineCreateReadable="item.datelineCreateReadable"
          :amountFinally="item.amountFinally"
          :statusText="item.statusText"
        />
        <Pagination />
    </el-tab-pane>
    <el-tab-pane label="受理中" name="second">待付款</el-tab-pane>
    <el-tab-pane label="退货中" name="third">待收货</el-tab-pane>
    <el-tab-pane label="售后完成" name="fourth">待评价</el-tab-pane>
  </el-tabs>
</template>
<script>
 import Order from '@/components/orders'
 import Pagination from '@/components/Pagination'
 import { mapState } from 'vuex'
  export default {
    data() {
      return {
        activeName: 'first',
        number:[1, 1, 1, 1]
      };
    },
    computed:{
      ...mapState({
        list: state => state.refund.refundList
      })
    },
    components:{
      Order,
      Pagination
    },
    created(){
      this.$store.dispatch('refund/list', {offset:(this.number[0] - 1)*10, limit: 10});
      console.log(this.list)
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>