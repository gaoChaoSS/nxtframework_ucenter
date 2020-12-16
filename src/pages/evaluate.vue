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
            <p style="margin-right:30px">{{datelineCreateReadable}}</p> 
            <p>订单号:  {{serialNum}}</p>
        </div>
        <div class="back" v-for="(item, index) in orderFormProductLists" :key="index">
            <div class="product-back">
                <img class="product-img" :src="item.picUrl" alt="">
                <p class="product-name">{{item.productName}}</p>                
                <p class="att" v-for="(arrItem, arrIndex) in item.productSku" :key="arrIndex">{{arrItem.skuKeyName}}:{{arrItem.skuValueName}}</p>
                <p class="att">x{{item.quantity}}</p>
                <p class="att">￥{{item.productPrice}}</p>
            </div>
            <div class="message-back">
                <div class="chat-back">
                    <img class="user-img" :src="item.reviewsItem.avatar" alt="">
                    <div class="chat-info">
                        <p>{{item.reviewsItem.date}}</p>
                        <p>{{item.reviewsItem.content}}</p>
                        <div class="img-group">
                            <img class="chat-img" :src="pic" alt="" v-for="(pic, picIndex) in item.reviewsItem.picUrlList" :key="picIndex">
                        </div>
                    </div>
                </div>
                <div class="col" v-if="item.reviewsItem==[]"> 
                    <div class="row">
                        <el-input type="textarea" v-model="desc[index]"  :rows="6" resize="none" style="width:700px; "></el-input>
                    </div>
                    <div class="row">
                        <div class="blacks" v-for="(itemImg, indexs) in item.reasonImageLists" :key="indexs">
                            <el-avatar shape="square" :size="60" :src="itemImg" />
                        </div>
                        <div class="upload-item" >
                            <el-upload
                                class="upload-demo"
                                ref="upload"
                                :data="{key:index}"
                                action="/api/user/uploadimage"                                
                                :http-request="handleUploadHttpRequest"
                                :show-file-list="false"
                                :auto-upload="true">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="row">
                        <Button @click.native="handlePost(item, index)">提交评价</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Flow from  '@/components/flow.vue'
import Button from '@/components/button.vue'
import {  mapState} from 'vuex';
import { uploadPic } from '@/api/refund'
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
            desc:[],
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
            orderFormProductLists:[],
            flow:[
                {
                    title:'申请退货', icon:require('@/assets/icon/refund/1-1.png'), 
                    arrorImg:require('@/assets/icon/arror.png'), 
                    active: false,
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
        Flow,
        Button
    },
    computed:{
        ...mapState({
            orderFormProductList: state => state.reviews.orderFormProductList,
            orderFormDelivery: state => state.reviews.orderFormDelivery,
            datelineCreateReadable:  state => state.reviews.datelineCreateReadable,
            serialNum: state => state.reviews.serialNum
        })
    },
    watch:{
    },
    created() {
        this.id = this.$route.query.orderid
        this.$store.dispatch('reviews/detail',{id:this.id}).then(()=>{
            this.orderFormProductLists =  this.orderFormProductList;
            this.orderFormProductLists.map(item => {
                item.reasonImageLists = [];
                item.reasonImageListId = [];
                this.desc.push('');
            })
        })
    },
    mounted(){
        // console.log(this.$store.state.refund.datelineCreateReadable)
        
    },
    methods: {
        async handleUploadHttpRequest (param) {
            console.log(param)
            const fileObj = param.file
            const response = await uploadPic(fileObj)
            if(response.status == 0){
                console.log(response)
                console.log(this.orderFormProductList[param.data.key])
                this.orderFormProductList[param.data.key].reasonImageLists.push(response.result.url)
                this.orderFormProductList[param.data.key].reasonImageListId.push(response.result.id)
                // console.log(this.reasonImageLists)]
                this.$forceUpdate()
            }else{
                this.$message({
                    message: response.message,
                    type: 'error',
                    duration: 5 * 1000
                })
            }
        },
        handlePost(value,item) {
            console.log(value)
            this.$store.dispatch('reviews/create',{
                orderFormId: this.id,
                content: this.desc[item],
                orderFormProductId: value.id,
                imageIdList: value.reasonImageListId
            })
        }
    },
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
    background: #F8F8F8;
    margin-bottom: 10px;
    padding: 10px 20px;
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
    /* margin-left: 26px; */
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
}
.upload-item{
    width:100%;
    /* margin-top:10px; */
    display: inline-block;
}
p{
    margin: 0px;
    padding:0px;
    font-size: 10px;
    color:#5F5F5F;
}
.back{
    display: flex;
}
.product-back{
    display: flex;
    flex-direction: column;
    width: 300px;
    margin-left: 20px;
    margin-top: 30px;
}
.product-img{
    height: 80px;
    width: 80px;
    margin-bottom: 10px;

}
.product-name{
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 600;
    color:#1B1B1B;
}
.att{
    color:#5F5F5F;
    font-size:10px;
}

.message-back{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 10px;
}
.chat-back{
    display: flex;
}
.user-img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
}
.chat-back  p{
    color: #5F5F5F;
    margin-bottom: 4px;
}
.chat-info{

}
.col{
    display: flex;
    flex-direction: column;
    margin-top: 30px;
}
.text{

}
.img-group{
    margin-top: 10px;
}
.chat-img{
    width: 50px;
    height: 50px;
    margin-right: 10px;
}
.upload-demo{
    display: inline-flex;
    border: 1px solid #5f5f5f;
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
}
</style>