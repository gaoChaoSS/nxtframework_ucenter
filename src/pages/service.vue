<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部售后" name="first" :item="0">
        <Order v-for="(item, index) in lists[0]" :key="index"
          :lists="item.orderFormRefundProductList"
          :id="item.id"
          :orderId="item.serialNum"
          :datelineCreateReadable="item.datelineCreateReadable"
          :amountFinally="item.amountFinally"
          :statusText="item.statusText"
        />
        <Pagination 
          @handleNumber="changeNumber($event)"
          :number="number[0]"
          :item ="0"
        />
    </el-tab-pane>
    <el-tab-pane label="受理中" name="second" :item="1">
      <Order v-for="(item, index) in lists[1]" :key="index"
        :lists="item.orderFormRefundProductList"
        :id="item.id"
        :orderId="item.serialNum"
        :datelineCreateReadable="item.datelineCreateReadable"
        :amountFinally="item.amountFinally"
        :statusText="item.statusText"
      />
      <Pagination 
        @handleNumber="changeNumber($event)"
        :number="number[1]"
        :item ="1"
      />
    </el-tab-pane>
    <el-tab-pane label="退货中" name="third" :item="2">
      <Order v-for="(item, index) in lists[2]" :key="index"
        :lists="item.orderFormRefundProductList"
        :id="item.id"
        :orderId="item.serialNum"
        :datelineCreateReadable="item.datelineCreateReadable"
        :amountFinally="item.amountFinally"
        :statusText="item.statusText"
      />
      <Pagination 
        @handleNumber="changeNumber($event)"
        :number="number[2]"
        :item ="2"
      />
    </el-tab-pane>
    <el-tab-pane label="售后完成" name="fourth" :item="3">
      <Order v-for="(item, index) in lists[3]" :key="index"
        :lists="item.orderFormRefundProductList"
        :id="item.id"
        :orderId="item.serialNum"
        :datelineCreateReadable="item.datelineCreateReadable"
        :amountFinally="item.amountFinally"
        :statusText="item.statusText"
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
 import Order from '@/components/orders'
 import Pagination from '@/components/Pagination'
 import { mapState } from 'vuex'
  export default {
    data() {
      return {
        activeName: 'first',
        number:[1, 1, 1, 1],
        lists:[
          [],[],[],[]
        ]
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
      this.loadData({item:0,number: 1})
    },
    methods: {
      handleClick(tab) {
        this.loadData({item:tab.$attrs.item,number: 1})
      },
      changeNumber(value){
        this.loadData(value)
      },
      loadData(value){
        this.number[value.item] = value.number
        let data = {offset:(this.number[value.item] - 1)*10, limit: 10}
        if(value.item == 1){
          data.isApplied = true
        }
        if(value.item == 2){
          data.isShippedOrWaitShipping = true
        }
        if(value.item == 3){
          data.isDone = true
        }
        this.$store.dispatch('refund/list', data).then(() => {
            console.log(value)
            this.lists[value.item] = this.list
            console.log(this.lists[value.item])
            this.$forceUpdate();
        })
      }
    }
  };
</script>