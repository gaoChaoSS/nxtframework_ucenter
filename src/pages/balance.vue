<template>
  <div class="balance-page">
      <div class="user-info">
        <div class="user-info-left">
            <div class="user-item" v-for="(items, indexs) in itemData" :key="indexs" >
                <div class="back" v-for="(item, index) in items" :key="index">
                    <img :src="item.icon" alt="" class="icon">
                    <div class="row">
                        <p class="title">{{item.title}}</p>
                        <p class="price">{{item.num | price}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="user-info-right">
            <div class="right-item">
                <Button @click.native="goCredit()">充 值</Button>
                <Button @click.native="goCash()" solid style="margin-top:12px">提 现</Button>
            </div>
            <div class="right-item">
                <p style="color:#5F5F5F; font-size: 16px;">帐户</p>
                <p style="color: #00AE9C; font-size: 16px; margin-top: 10px;">{{statusText}}</p>
            </div>
        </div>
      </div>
      <Card 
        title = "收支明细">
            <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            style="width: 100%">
                <el-table-column
                    property="datelineReadable"
                    label="时间"
                    width="320"
                />
                <el-table-column
                    property="amount"
                    label="金额"
                    width="180"
                />
                <el-table-column
                    property="typeText"
                    label="类型"
                    width="180"
                />
                <el-table-column property="eventText" label="事件"  />
            </el-table>
      </Card>
  </div>
</template>

<script>
import Card from '@/components/card'
import Button from '@/components/button'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            itemData: [
                [
                    {icon:require('@/assets/icon/1.png'), title:'可用金额', num:11},
                    {icon:require('@/assets/icon/1.png'), title:'累计充值', num:11}
                ],
                [
                    {icon:require('@/assets/icon/1.png'), title:'冻结金额', num:11},
                    {icon:require('@/assets/icon/1.png'), title:'累计提现', num:11}
                ],
                [
                    {icon:require('@/assets/icon/1.png'), title:'可提现', num:11},
                    {icon:require('@/assets/icon/1.png'), title:'提现中', num:11}
                ],
            ],
            tableData:[],
        }
    },
    components:{
        Card,
        Button
    },
    filters:{
        price(value){
            return '￥'+value
        }
    },
    computed:{
        ...mapState({
            balanceTotal: state => state.balance.balanceTotal,
            totalWithdrawRejected: state => state.balance.totalWithdrawRejected,
            totalRechargeSuccess: state => state.balance.totalRechargeSuccess,
            balanceCanWithdraw: state => state.balance.balanceCanWithdraw,
            totalWithdrawing: state => state.balance.totalWithdrawing,
            totalWithdrawSuccess: state => state.balance.totalWithdrawSuccess,
            tableDatas: state => state.balance.list,
            statusText: state => state.user.statusText
        })
    },
    created() {
        this.$store.dispatch('user/info')
        this.$store.dispatch('balance/detail').then(() =>{            
            this.itemData[0][0].num = this.balanceTotal
            this.itemData[0][1].num = this.totalRechargeSuccess
            this.itemData[1][0].num = this.totalWithdrawRejected
            this.itemData[1][1].num = this.totalWithdrawSuccess
            this.itemData[2][0].num = this.balanceCanWithdraw
            this.itemData[2][1].num = this.totalWithdrawing
        })
        this.$store.dispatch('balance/list',{offset:0, limit: 10}).then(() =>{
            this.tableData = this.tableDatas
            this.$forceUpdate()
        })
        // this.$store.dispatch('balance/list',{offset:1, limit: 10})
    },
    methods: { 
        goCredit() {
            this.$router.push('/credit')
        },
        goCash() {
            this.$router.push('/cash')
        }
    }
}
</script>

<style scoped>
p{
    padding: 0px;
    margin: 0px;
}
.balance-page{
    display: flex;
    flex-direction: column;
}
.user-info{
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-self: center;
}
.user-info-left{    
    display: flex;
}
.user-info-right{
    display: flex;
}
.right-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    box-sizing: border-box;
    width: 200px;
}
.user-item{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
    margin-right: 20px;
    position: relative;
}
.user-item:after{
    content :'';
    position: absolute;
    width: 1px;
    height: 60%;
    top:20px;
    right: 0px;
    background: #888;
    opacity: 0.5;
}
.user-item:last-child:after{
    display: none;
}
.back{
    width: 200px;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
}
.back:nth-child(n){
    margin-bottom: 10px;
}
.icon{
    /* width: 20px; */
    height: 26px;
    margin-right: 10px;
}   
.row{

}
.title{
    font-size: 12px;
    color: #5F5F5F;
}
.price{
    font-size: 10px;
    margin-top:4px;
    color:#1B1B1B;
}
</style>