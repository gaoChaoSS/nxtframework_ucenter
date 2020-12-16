<template>
    <div class="address-page">
        <div class="flow-card">
            <Flow v-for="(item, index) in flow" :key="index"
                :icon ="item.icon"
                :arrorImg ="item.arrorImg"
                :title ="item.title"
                :time ="item.time"
                :class ="{'active': item.active}"
            />
        </div>
        <div class="back">
            <Order                 
                :Lists="refundList"
                :isChecked ="state==1"
                :datelineCreateReadable = "datelineCreateReadable"
                :orderId = "orderFormSerialNum"
            />
        </div>
        <div class="info-card">
            <div class="content" style="margin-top:30px">
                <div class="item">
                    <p class="title">退货原因：</p>
                    <el-select v-model="value" placeholder="请选择" v-if="state==1">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <p class="content-p" v-else>{{reasonTypeTexts}}</p>
                </div>
                <div class="item">
                    <p class="title">问题描述：</p>
                    <el-input type="textarea" v-model="desc" v-if="state==1" :rows="6" resize="none" style="width:700px; "></el-input>
                    <p class="content-p" v-else>{{reasionDescriptions}}</p>
                </div>
                <div class="item">
                    <p class="title">图片信息：</p>
                    <div class="row">
                        <div class="blacks" v-for="(item, index) in reasonImageLists" :key="index">
                            <el-avatar shape="square" :size="60" :src="item" />
                        </div>
                        <div class="upload-item" v-if="state == 1">
                            <el-upload
                                class="upload-demo"
                                ref="upload"
                                action="/api/user/uploadimage"
                                :headers="headers"
                                :http-request="handleUploadHttpRequest"
                                :before-upload="beforeUpload"
                                :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </div>
                    </div>
                    <!-- <p class="content-p">广东省,深圳市,宝安区,南瓜街道,西瓜村89号</p> -->
                </div>
                <div class="item" v-if="state==2">
                    <p class="title">退货状态：</p>
                    <p class="content-p">{{statusText}}</p>
                </div>
                <div class="item" v-if="state==3">
                    <p class="title">图片信息：</p>
                    <p class="content-p">{{valuePay}}</p>
                    <p class="title" style="margin-left:200px">运单号码：</p>
                    <p class="content-p">{{valuePay}}</p>
                </div>
                <div class="item" v-if="state==1">
                    <div class="button" @click="handleCreate()">提交申请</div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import Order from '@/components/orderStep.vue'
import Flow from  '@/components/flow.vue'
import { getToken, getUserId } from '@/utils/auth'
import { uploadPic } from '@/api/refund'
import {  mapState} from 'vuex';
export default {
    data(){
        return {
            loginForm:{
                username:'',
                password:''
            },
            id: 0,
            listObj:{},
            labelPosition: 'top',
            value: 0,
            payType:[
            ],
            desc:'',
            imgarr:[
                '/image/login.png',
                '/image/login.png',
                '/image/login.png'
            ],
            options:[                                
                {value:0, label:'无理由' },
                {value:1, label:'质量问题'}
            ],
            valuePay:'微信',
            state:2,
            fileList: [],
            reasonImageListId:[],
            reasonImageLists:[],
            headers:{
                'token':getToken(),
                'user_id':getUserId(),
                // 'Content-Type':'application/octet-stream'
            },
            reasonTypeTexts:'',
            reasionDescriptions: '',
            flow:[
                {
                    title:'申请退货', icon:require('@/assets/icon/refund/1-2.png'), 
                    arrorImg:require('@/assets/icon/arror.png'), 
                    active: true,
                    time:''
                },
                {
                    title:'等待受理', icon:require('@/assets/icon/refund/2-1.png'), 
                    arrorImg:require('@/assets/icon/arror.png'), 
                    active: false,
                    time:''
                },
                {
                    title:'买家退货', icon:require('@/assets/icon/refund/3-1.png'), 
                    arrorImg:require('@/assets/icon/arror.png'), 
                    active: false,
                    time:''
                },
                {
                    title:'收到退货', icon:require('@/assets/icon/refund/4-1.png'), 
                    arrorImg:require('@/assets/icon/arror.png'),
                    active: false,
                    time:''
                },
                {
                    title:'退款完成', icon:require('@/assets/icon/refund/5-1.png'), 
                    arrorImg:'', 
                    active: false,
                    time:''
                }
            ]
        }
    },
    components:{
        Order,
        Flow
    },
    computed:{
        ...mapState({
            amountFinally: state => state.refund.amountFinally ,
            amountRefundTotal: state => state.refund.amountRefundTotal,
            datelineCreate: state => state.refund.datelineCreate,
            datelineCreateReadable: state => state.refund.datelineCreateReadable,
            datelineEnd: state => state.refund.datelineEnd,
            datelineEndReadable: state => state.refund.datelineEndReadable,
            deliveryPerson: state => state.refund.deliveryPerson,
            deliveryPhone: state => state.refund.deliveryPhone,
            orderFormId: state => state.refund.orderFormId,
            orderFormRefundProductList: state => state.refund.orderFormRefundProductList,
            orderFormSerialNum: state => state.refund.orderFormSerialNum,
            reasionDescription: state => state.refund.reasionDescription,
            reasonImageList: state => state.refund.reasonImageList,
            reasonType: state => state.refund.reasonType,
            reasonTypeText: state => state.refund.reasonTypeText,
            status: state => state.refund.status,
            statusText: state => state.refund.statusText,
            refundList: state => state.refund.refundList,
            productList: state => state.order.productList,
        })
    },
    watch:{
        orderState:function(){
           clearInterval(this.debouncedGetAnswer);
        },
        datelineCreateReadable:function(){
        },
        status:function() {
            console.log(this.status)
            if(this.status == 0){
                this.flow[1].active = true
                this.flow[1].icon = require('@/assets/icon/refund/2-2.png')
            }
            if(this.status == 2 || this.status == 5) {
                this.flow[1].active = true
                this.flow[2].active = true
                this.flow[1].icon = require('@/assets/icon/refund/2-2.png')
                this.flow[2].icon = require('@/assets/icon/refund/3-2.png')
            }
            if(this.status == 3 || this.status == 4 || this.status == 1) {
                for(let i = 0; i < this.flow.length ; i++) {
                    this.flow[i].active = true;
                    this.flow[i].icon = require('@/assets/icon/refund/'+(i+1)+'-2.png')
                }
            }
        }
    },
    created() {
        if(this.$route.query.id){
            this.id = this.$route.query.id
            this.$store.dispatch('refund/detail',{id: this.id}).then(() => {
                // console.log(this.$store.state.refund)
                this.reasonImageLists = this.reasonImageList
                this.reasonTypeTexts = this.reasonTypeText
                this.reasionDescriptions = this.reasionDescription
            })
        }else{
            this.state = 1;
            this.id = this.$route.query.orderid
            this.$store.dispatch('refund/allow', {id: this.id}).then(()=>{
                var arr = [];
                this.refundList.map(item => {
                    item.checked = true
                    item.sum = item.quantity
                    arr.push(item)
                })
                this.$store.commit('refund/SET_REFUND_LIST',arr)
                // console.log(this.$store.state.refund.datelineCreateReadable)
            })
            
        }

        // this.$forceUpdate()
    },
    mounted(){
        // console.log(this.$store.state.refund.datelineCreateReadable)
    },
    beforeDestroy() {
      clearInterval(this.debouncedGetAnswer);
    },
    methods:{
        handleGoInfo(){
            this.$router.push('/info')
        },
        submitUpload() {
            // console.log(this.$refs);
            this.$refs.upload.submit(this.listObj);
        },
        async handleUploadHttpRequest (param) {
            const fileObj = param.file
            const response = await uploadPic(fileObj)
            if(response.status == 0){
                console.log(response)
                this.reasonImageLists.push(response.result.url)
                this.reasonImageListId.push(response.result.id)
                // console.log(this.reasonImageLists)
            }else{
                this.$message({
                    message: response.message,
                    type: 'error',
                    duration: 5 * 1000
                })
            }
        },
        beforeUpload(file) {
            const _self = this
            const _URL = window.URL || window.webkitURL
            const fileName = file.uid
            this.listObj[fileName] = {}
            return new Promise((resolve) => {
                const img = new Image()
                img.src = _URL.createObjectURL(file)
                img.onload = function() {
                _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
                }
                resolve(true)
            })
        },
        handleCreate(){
            var arr = [];
            this.refundList.map(item => {
                if(item.checked){
                    let temp = {};
                    temp.orderFormProductId = item.id
                    temp.quantity =item.sum
                    arr.push(temp)
                }
            })
            this.$store.dispatch('refund/create', {
                orderFormProductList:arr,
                reasonType:this.value,
                reasionDescription: this.desc,
                imageIdList:this.reasonImageListId,
                id:this.id
            }).then(() =>{
                this.$message({
                    message: '提交成功!',
                    type: 'success',
                    duration: 5 * 200
                })
                this.state = 2
            })
        },
        // beforeUpload(file) {
        //     const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
        //     const isLt20M = file.size / 1024 / 1024 < 20
        //     if (!isImg) {
        //         this.$message.error('上传图片只能是 JPG、PNG、GIF 格式之一!')
        //     }
        //     if (!isLt20M) {
        //         this.$message.error('上传图片大小不能超过 20MB!')
        //     }
        //     return isImg && isLt20M
        // }
    }
}
</script>

<style scoped>
.address-page{
    width: 100%;
    box-sizing: border-box;
    padding: 60px 100px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.info-card{
    background: #F8F8F8;
    width: 1200px;
    /* height: 200px; */
    padding: 30px 0px;
    margin-top: 20px;
}
.back{
    width: 1200px;
}
.info-title{
    /* font-size: 24px;
    font-weight: 600;
     */
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40px;
    color: #014785;
    padding-left: 60px;
    position: relative;
}
.info-title:before{
    content: '';
    width: 4px;
    height: 34px;
    position: absolute;
    top: 4px;
    background: #014785;
    left: 44px;

}
.info-content{
    display: flex;
    margin-left: 40px;
    margin-top: 40px;
    /* flex-wrap: wrap; */
}
.content{
    margin:0px 40px;
}
.back-btn{
    width: 200px;
    height: 46px;
    color: #5F5F5F;
    border: 2px solid #5f5f5f54;
    line-height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 20px;
}
.back-btn.active{
    border: 2px solid #014785;
}
.default-p{    
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #5F5F5F;
    display: inline-block;
    margin-right: 20px;
}
.price-p{
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28px;
    color: #1B1B1B;
    display: inline-block;
}
.cart-list{
        display: flex;
    padding: 60px 100px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 10px;
    box-sizing: border-box;
    background: #f8f8f8;
    margin-top: 60px;
}
.detail{
    display: flex;
}
.detail-img{
    height: 100px;
    width: 120px;
}
.info{
    /* margin-left: 20px; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
    padding-top: 4px;
}
.title{
    margin-bottom: 40px;    
}
.form-group{
    /* margin: 0px 40px; */
}
.buy-btn{
    width: 160px;
    height: 38px;
    background: #014785;
    border: 1px solid #014785;
    line-height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color:#fff;
    font-size: 18px;
}
.p-bank{
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #5F5F5F;
    display: inline-block;
}
.default-p-1{
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #5F5F5F;
    display: inline-block;
    margin:0px;
    margin-right: 20px;
    
}

.cart-info{
    display: flex; 
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    /* padding: 0 100px; */
    margin:60px 0px;
}
.buy-btn-1{
    width: 240px;
    height: 46px;
    background: #014785;
    border: 1px solid #014785;
    line-height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color:#fff;
    font-size: 18px;
}
.item{
    display: flex;
    margin-top: 10px;
}
.title{
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #5F5F5F;
    width: 200px;
    text-align: left;
    margin: 0px;
    margin-bottom: 20px;
    /* margin-right: ; */
}
.content-p{
    
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29px;
    color: #1B1B1B;
    margin: 0px;
}
.back-img{
    height: 30px;
    margin-right: 10px;
}
.title-card{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.title-img{
    height: 26px;
    margin-right: 10px;
}
.title-success{
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 47px;
    color: #00A854;
}
.title-error{
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 47px;
    color: #D81E06;
}
.flow-card{
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    width: 1200px;
}
.blacks{
    margin: 0 10px;
    display: block;
    display: inline-block;
    /* float: left; */
}
.blacks:first-child{
    margin-left: 0px;

    /* display: none; */
}
.row{
    width: 100%;
    margin-left: 26px;
}
.upload-item{
    width:100%;
    margin-top:10px
}
.button{
    background: #014785;
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 26px;
    color: #FFFFFF;
    width: 120px;
    padding: 4px 6px;
    box-sizing: border-box;
    text-align: center;
    margin-top: 10px;
    margin-left: 196px;
    /* letter-spacing: 50px; */
}
</style>