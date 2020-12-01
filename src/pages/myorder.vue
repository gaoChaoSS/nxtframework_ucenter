<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部订单" name="first">
        <Order />
        <Pagination />
    </el-tab-pane>
    <el-tab-pane label="待付款" name="second">待付款</el-tab-pane>
    <el-tab-pane label="待收货" name="third">待收货</el-tab-pane>
    <el-tab-pane label="待评价" name="fourth">待评价</el-tab-pane>
  </el-tabs>
</template>
<script>
 import Order from '@/components/order'
 import Pagination from '@/components/Pagination'
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    components:{
        Order,
        Pagination
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>