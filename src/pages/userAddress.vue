<template>
  <div class="balance-page">
        <Card 
            title = "地址管理">
                <template v-slot:header>
                    <p>地址管理</p>
                    <Button @click.native="handleAddPage">增加新地址</Button>
                </template>
                <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                    <el-table-column
                        type="deliveryPerson"
                        label="收货人"
                        width="120"
                    />
                    <el-table-column
                        property="address"
                        label="收货地址"
                        width="460"
                    />
                    <el-table-column
                        property="deliveryPhone"
                        label="联系电话"
                        width="160"
                    />
                    <el-table-column
                        property=""
                        label="操作"                    
                    >
                    <template slot-scope="scope">
                        <el-button @click.native="handleClick(scope.row)" type="text" size="small" v-if="!scope.row.isDefault">设为默认</el-button>
                        <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
        </Card>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <div class="form-group" style="margin-top:20px">
                <el-form label-position="right" label-width="160px" :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item label="姓名/Name" class="label" prop="deliveryPerson">
                        <el-input v-model="loginForm.deliveryPerson" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="国家地区/Country" prop="deliveryCountry">
                        <el-select v-model="loginForm.deliveryCountry" clearable placeholder="请选择" @change="deliveryCountry">
                            <el-option
                            v-for="item in deliveryPersonOption"
                            :key="item.id"
                            :label="item.regionName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="省份/Province" prop="deliveryProvince">
                        <el-select v-model="loginForm.deliveryProvince" clearable placeholder="请选择" @change="deliveryProvince">
                            <el-option
                            v-for="item in deliveryProvinceOption"
                            :key="item.id"
                            :label="item.regionName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="城市/City" prop="deliveryCity" >
                        <el-select v-model="loginForm.deliveryCity" clearable placeholder="请选择" >
                            <el-option
                            v-for="item in deliveryCityOption"
                            :key="item.id"
                            :label="item.regionName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="地址/Address" prop="deliveryAddress">
                        <el-input  v-model="loginForm.deliveryAddress" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="电话/Phone" prop="deliveryPhone">
                        <el-input  v-model="loginForm.deliveryPhone" style="width:200px"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="hendleAdd">确 定</el-button>
            </span>
        </el-dialog>
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
            dialogVisible:false,
            loginForm:{
                deliveryPerson:null,
                deliveryCountry:"",
                deliveryProvince:null,
                deliveryCity:null,
                deliveryProvinceName:'',
                deliveryCityName:'',
                deliveryAddress: '5',
                deliveryPhone:'13555',
                deliveryConfigId:1,
                deliveryConfig:'',
                dealPlatform:1,
                deliveryRemark:'dddd',
                deliveryPostcode:"cccc"
            },
            rules:{
                deliveryCity:[
                    { type: 'date', required: true, message: '请选择城市！', trigger: 'change' },
                ],
                deliveryCountry:[
                    { type: 'date', required: true, message: '请选择国家或者地区！', trigger: 'change' },
                ],
                deliveryProvince:[
                      { type: 'date', required: true, message: '请选择省份！', trigger: 'change' },
                ],
                deliveryPerson:[
                    { required: true, message: '请输入用户名!', trigger: 'blur' },
                ],
                deliveryAddress:[
                    { required: true, message: '请输入地址!', trigger: 'blur' },
                ],
                deliveryPhone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ]
            }
            // tableData:[]
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
            tableData: state => state.address.list,
            deliveryPersonOption:state =>state.order.deliveryPersonOption,
            deliveryProvinceOption:state => state.order.deliveryProvinceOption,
            deliveryCityOption: state => state.order.deliveryCityOption,
            deliveryOption: state => state.order.deliveryOption,
            deliveryCost: state => state.order.deliveryCost,
            orderId: state => state.order.orderId
        })
    },
    created() {
        this.$store.dispatch('address/list')
        this.$store.dispatch('order/deliveryConfigList')
        this.$store.dispatch('order/deliveryRegionList', 0)
    },
    methods: {
        deliveryCountry(){
            if(this.loginForm.deliveryCountry)
            this.$store.dispatch('order/deliveryProvince', this.loginForm.deliveryCountry)
        },
        deliveryProvince(){
            if(this.loginForm.deliveryProvince)
            this.$store.dispatch('order/deliveryCity', this.loginForm.deliveryProvince)
        },
        handleClick(row) {
            this.$store.dispatch('address/defaults', {id: row.id}).then(() => {
                this.$store.dispatch('address/list')
            })
        },
        handleDelete(row) {
            console.log(row)
        },
        handleAddPage()  {
            this.dialogVisible = true
        },
        hendleAdd() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('address/save',this.loginForm)                    
                        .then(() => {
                        })
                        .catch(() => {
                        })
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
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