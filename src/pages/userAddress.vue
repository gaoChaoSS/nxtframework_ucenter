<template>
  <div class="balance-page">
      <Card 
        title = "收支明细">
            <template v-slot:header>
                <p>收支明细</p>
                <Button>增加新地址</Button>
            </template>
            <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            style="width: 100%">
                <el-table-column
                    type="index"
                    label="收货人"
                    width="120"
                />
                <el-table-column
                    property="date"
                    label="收货地址"
                    width="360"
                />
                <el-table-column
                    property="name"
                    label="联系电话"
                    width="160"
                />
                <el-table-column
                    property="address"
                    label="操作"                    
                />
            </el-table>
      </Card>
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
            tableData:[]
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
    height: 80%;
    top:10px;
    right: 0px;
    background: #000;

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