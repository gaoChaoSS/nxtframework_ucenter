<template>
  <div class="balance-page">
      <div class="user-info">
        <div class="user-info-left">
            <img :src="avatarPicUrl" alt="" class="avatar">
            <div class="info-content">
                <div class="item">
                    <p class="title">邮箱:</p>
                    <p class="content">{{email}}</p>
                </div>
                <div class="item">
                    <p class="title">手机:</p>
                    <p class="content">{{phone}}</p>
                </div>
            </div>
        </div>
      </div>
      <Card 
        title = "">
        <template name="header"></template>
        <div class="card-item">
            <p class="card-item-title">
                登录密码
            </p>
            <div class="card-item-content">
                互联网账号存在被盗风险，建议您定期更改密码以及保护账户安全。
            </div>
            <Button @click.native="dialogVisible.pwd = true">修改</Button>
        </div>
        <div class="card-item">
            <p class="card-item-title">
                邮箱验证
            </p>
            <div class="card-item-content">
                您已经绑定邮箱
            </div>
            <Button @click.native="dialogVisible.email = true">修改</Button>
        </div>
        <div class="card-item">
            <p class="card-item-title">
                手机验证
            </p>
            <div class="card-item-content">
                您没有绑定手机。互联网账号存在被盗风险，建议您立即绑定一保护账户安全。
            </div>
            <Button @click.native="dialogVisible.phone = true">修改</Button>
        </div>
      </Card>
        <el-dialog
            title="密码修改"
            :visible.sync="dialogVisible.pwd"
            width="30%"
            >
            <div class="form-group" style="margin-top:20px">
                <el-form label-position="right" label-width="160px" >
                    <el-form-item label="旧密码" class="label" prop="deliveryPerson">
                        <el-input v-model="pwdFrom.deliveryPerson" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" class="label" prop="deliveryPerson">
                        <el-input v-model="pwdFrom.deliveryPerson" style="width:200px"></el-input>
                    </el-form-item>
                    
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible.pwd = false">取 消</el-button>
                <el-button type="primary" >确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="邮箱绑定"
            :visible.sync="dialogVisible.email"
            width="40%"
            >
            <div class="form-group" style="margin-top:20px">
                <el-form label-position="right" label-width="160px" >
                    <el-form-item label="原邮箱" class="label" prop="deliveryPerson">
                        <p>{{email}}</p>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" label-width="160px" >
                    <el-form-item label="验证码" class="label" prop="deliveryPerson">
                        <el-input v-model="pwdFrom.removecode" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <Button @click.native="handleEmailCode">获取验证码</Button>
                    </el-form-item>
                </el-form>
                <el-form label-position="right" label-width="160px" >
                    <el-form-item>
                        <Button @click.native="handleEmailMove">解绑</Button>
                    </el-form-item>
                </el-form>
                <el-form label-position="right" label-width="160px" >
                    <el-form-item label="新邮箱" class="label" prop="deliveryPerson">
                        <el-input v-model="pwdFrom.newEmail" style="width:200px"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" label-width="160px" >
                    <el-form-item label="验证码" class="label" prop="deliveryPerson">
                        <el-input v-model="pwdFrom.code" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <Button @click.native="handleEmailVerifyCode">获取验证码</Button>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible.email = false">取 消</el-button>
                <el-button type="primary" @click.native="handelEmailUpdate" >确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="手机号绑定"
            :visible.sync="dialogVisible.phone"
            width="40%"
            >
            <div class="form-group" style="margin-top:20px">
                <el-form label-position="right" label-width="160px" >
                    <el-form-item label="原手机号" class="label" prop="deliveryPerson">
                        <p>{{phone}}</p>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" label-width="160px" >
                    <el-form-item label="验证码" class="label" prop="deliveryPerson">
                        <el-input v-model="phoneFrom.removecode" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <Button  @click.native="handlePhoneCode">获取验证码</Button>
                    </el-form-item>
                </el-form>
                <el-form label-position="right" label-width="160px" >
                    <el-form-item>
                        <Button @click.native="handlePhoneMove">解绑</Button>
                    </el-form-item>
                </el-form>
                <el-form label-position="right" label-width="160px" >
                    <el-form-item label="新手机号" class="label" prop="deliveryPerson">
                        <el-input v-model="phoneFrom.newPhone" style="width:200px"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" label-width="160px" >
                    <el-form-item label="验证码" class="label" prop="deliveryPerson">
                        <el-input v-model="phoneFrom.code" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <Button @click.native="handlePhoneVerifyCode"> 获取验证码</Button>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible.phone = false">取 消</el-button>
                <el-button type="primary"  @click.native="handelPhoneUpdate" >确 定</el-button>
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
            pwdFrom:{
                removecode: '',
                newEmail: '',                
                code:'',                
            },
            phoneFrom:{
                removecode: '',
                newPhone: '',                
                code:'',                
            },
            dialogVisible: {
                pwd: false,
                email: false,
                phone: false,
            },
            tableData:[],
            price: 123,
            loginForm:[],
            rules:[]
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
            username: state => state.user.username,
            avatarPicUrl: state => state.user.avatarPicUrl,
            email: state => state.user.email,
            phone: state => state.user.phone,
            inviteCode: state => state.user.inviteCode,
            inviteUrl: state =>state.user.inviteUrl,
            inviteUrlQrImageUrl: state => state.user.inviteUrlQrImageUrl
        })
    },
    filters:{
        price(value){
            return '￥'+value
        }
    },
    created() {
        this.$store.dispatch('user/info')
    },
    methods:{
        handleSettlement(){
            this.$router.push('/settlement')
        },
        handleEmailCode(){
            console.log('sss');
            this.$store.dispatch('user/email_code',{})
        },
        handleEmailMove(){            
            this.$store.dispatch('user/email_move',{verifyCode: this.pwdFrom.removecode})
            
        },
        handleEmailVerifyCode() {
            this.$store.dispatch('user/verify_code',{email: this.pwdFrom.newEmail})
        },
        handelEmailUpdate() {
            this.$store.dispatch('user/email_update',{email: this.pwdFrom.newEmail,verifyCode: this.pwdFrom.code})            
        },
        handlePhoneCode() {
            this.$store.dispatch('user/phone_remove_code',{})
            //
        },
        handlePhoneMove(){
            this.$store.dispatch('user/phone_remove',{verifyCode: this.phoneFrom.removecode})
        },
        handlePhoneVerifyCode() {
            this.$store.dispatch('user/phone_code',{phone: this.phoneFrom.newPhone})
        },
        handelPhoneUpdate(){
            this.$store.dispatch('user/phone_update',{phone: this.phoneFrom.newPhone,verifyCode: this.phoneFrom.code})
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
    padding: 10px 20px;
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
    margin-right: 30px;
}
.content{
    font-size: 12px;
}
.price{
    font-size: 10px;
    /* margin-top:4px; */
    color:#1B1B1B;
}
.avatar{
    width: 80px;
    height: 80px;
    margin-right: 40px;
}
.info-content{
    display: flex;
    flex-direction: column;
    height: 80px;
    align-items: center;
    justify-content: center;
}
.item{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
p{
    font-size: #1B1B1B;
}
.card-item{
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 26px 40px;
    box-sizing: border-box;

}
.card-item:after{
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0px;
    left: 0px;
    background: #707070;
    opacity: 0.5;
}
.card-item:last-child::after{
    display: none;
}
.card-item-title{
    width: 160px;
    margin-right: 20px;
    color:#1B1B1B;
    font-weight: 600;
}
.card-item-content{
    width: 100%;    
    color: #1B1B1B;
}

</style>