<template>
  <div class="balance-page">
        <Card >
            <div class="user-item">
                <p class="title">可结算的</p>
                <p class="content">{{price | price}}</p>
            </div>
        </Card>
        <Card>
            <p class="title">温馨提示:</p>
            <p class="title">1.受理时间一般3~5工作日</p>
        </Card>
        <Button style="margin-top: 10px">全部结算</Button>
  </div>
</template>

<script>
import Card from '@/components/card'
import Button from '@/components/button'
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
    filters:{
        price(value){
            return '￥'+value
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
    /* flex-direction: column; */
    justify-content: flex-start;
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