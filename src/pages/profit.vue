<template>
  <div class="balance-page">
      <div class="user-info">
        <div class="user-info-left">
            <div class="user-item">
                <div class="back" >
                    <img :src="require('@/assets/icon/1.png')" alt="" class="icon">
                    <div class="row">
                        <p class="title">我的全部收益</p>
                        <p class="price">{{balanceAll | price}}</p>
                    </div>
                </div>
            </div>
            <div class="user-item">
                <div class="back">
                    <p class="title">可结算收益</p>
                    <p class="price">{{balanceAllowTransfer | price}}</p>
                </div>
                <div class="back">
                    <p class="title">锁定收益</p>
                    <p class="price">{{balanceIsRejected | price}}</p>
                </div>
                <div class="back">
                    <p class="title">结转中</p>
                    <p class="price">{{balanceIsTransfering | price}}</p>
                </div>
            </div>
            <div class="user-item">
                <Button @click.native="handleSettlement">结算到余额</Button>
                <p class="title">先转入余额，再申请提现</p>
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
                    type="index"
                    label="时间"
                    width="300"
                />
                <el-table-column
                    property="date"
                    label="金额"
                    width="160"
                />
                <el-table-column
                    property="name"
                    label="类型"
                    width="200"
                />
                <el-table-column
                    property="address"
                    label="来源订单商品"
                />
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
                    {icon:require('@/assets/icon/1.png'), title:'可用金额', num:11}
                ],
                [
                    {icon:require('@/assets/icon/1.png'), title:'可用金额', num:11},
                    {icon:require('@/assets/icon/1.png'), title:'可用金额', num:11}
                ],
                [
                    {icon:require('@/assets/icon/1.png'), title:'可用金额', num:11},
                    {icon:require('@/assets/icon/1.png'), title:'可用金额', num:11}
                ],
            ],
            tableData:[],
            price: 123
        }
    },
    components:{
        Card,
        Button
    },
    computed:{
        ...mapState({
            balanceAll: state => state.commission.balanceAll,
            balanceAllowTransfer: state => state.commission.balanceAllowTransfer,
            balanceIsRejected: state => state.commission.balanceIsRejected,
            balanceIsTransfering: state => state.commission.balanceIsTransfering, 
        })
    },
    filters:{
        price(value){
            return '￥'+value
        }
    },
    created() {
        this.$store.dispatch('commission/detail')
    },
    methods:{
        handleSettlement(){
            this.$router.push('/settlement')
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
    width: 100%;
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
    width: 100%;
}
.user-item:after{
    content :'';
    position: absolute;
    width: 1px;
    height: 80%;
    top:10px;
    right: 0px;
    background: #000;

}
.user-item:last-child:after{
    display: none;
}
.back{
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 4px;
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
    /* margin-top:4px; */
    color:#1B1B1B;
}
</style>