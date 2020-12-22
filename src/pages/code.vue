<template>
  <div class="credit-page">
    <Card>
      <p style="margin-bottom: 20px">说明:</p>
      <p>1、由您邀请注册的用户每次下单成交的订单，你可以得到一定比例的佣金；</p>
      <p>2、佣金可以自由结算和提现；</p>
      <p>
        3、一级下家：你直接邀请注册的用户；二级下家：你的下家邀请注册的用户；三级下家：你下家的下家邀请注册的用户；
      </p>
      <p>4、上家分佣比例：一级下家70%，二级下家20%，三级下家10%；</p>
      <p>
        5、举例：如果用户A购买一笔总额¥100的订单，产生了¥10佣金。如果A是你的一级下家，那么你将得到¥10
        x 70% = ¥7.00；
      </p>
      <p>
        如果A是你的二级下家，那么你将得到¥10 x 20% =
        ¥2.00；如果A是你的三级下家，那么你将得到¥10 x 10% = ¥1.00。
      </p>
    </Card>
    <Card>
      <div class="content" style="margin-top: 10px">
        <div class="item">
          <p class="title">邀请码</p>
          <p class="content-p">{{inviteCode}}</p>
        </div>
        <div class="item">
          <p class="title">邀请链接</p>
          <p class="content-p">{{inviteUrl}}</p>
        </div>
        <div class="item">
          <p class="title" style="align-self: self-start;">邀请二维码</p>
          <p class="content-p">
              <img :src="inviteUrlQrImageUrl" alt="">
          </p>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/card";
import { mapState } from "vuex";
export default {
  data() {
    return {
      moneyData: [50, 100, 200, 500],
      payType: [
        { img: require("@/assets/weixin.png"), title: "微信", value: "wxpay" },
        {
          img: require("@/assets/alipay.png"),
          title: "支付宝",
          value: "alipay",
        },
        {
          img: require("@/assets/paypal.png"),
          title: "Paypal",
          value: "paypal",
        },
      ],
      from: {
        amount: 0,
        verifyCode: null,
        verifyCodeType: 1,
        platform: "wxpay",
        platformAccount: "",
        platformPerson: "",
      },
      CodeType: [
        { name: "邮箱", id: 1 },
        { name: "手机", id: 2 },
      ],
      valuePay: "微信",
    };
  },
  components: {
    Card,
  },
  computed: {
    ...mapState({
      balanceTotal: (state) => state.balance.balanceTotal,
      username: (state) => state.user.username,
      avatarPicUrl: (state) => state.user.avatarPicUrl,
      email: (state) => state.user.email,
      phone: (state) => state.user.phone,
      inviteCode: (state) => state.user.inviteCode,
      inviteUrl: (state) => state.user.inviteUrl,
      inviteUrlQrImageUrl: (state) => state.user.inviteUrlQrImageUrl,
    }),
  },
  created() {
    this.$store.dispatch('user/info')
  },
  methods: {
    handleCash() {
      this.$store.dispatch("withdraw/create", { ...this.from });
    },
    handleCode() {
      this.$store.dispatch("withdraw/code", {
        verifyCodeType: this.from.verifyCodeType,
      });
    },
    changePayType(value, type) {
      console.log(value);
      this.valuePay = value;
      this.from.platform = type;
    },
  },
};
</script>

<style scoped>
.back-img {
  height: 20px;
  margin-right: 10px;
}
.back-btn {
  width: 140px;
  height: 40px;
  color: #5f5f5f;
  border: 2px solid #5f5f5f;
  line-height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-right: 20px;
  font-size: 14px;
}
.back-btn.active {
  border: 2px solid #014785;
}
p {
  padding: 0px;
  margin: 0px;
  color: #5f5f5f;
  font-size: 12px;
}
.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}
.title {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 23px;
  color: #1b1b1b;
  opacity: 1;
}
.content {
  margin-left: 20px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 22px;
  color: #1b1b1b;
  opacity: 1;
}
.input {
  margin-left: 10px;
  margin-right: 10px;
}
.item.active {
  background: #f8f8f8;
  padding: 10px 20px;
  margin-right: 40px;
  box-sizing: border-box;
  /* padding-right: 40px;  */
  /* width: auto; */
}
.input-title {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 23px;
  color: #1b1b1b;
  opacity: 1;
  margin-left: 20px;
}
.item {
  display: flex;
  margin-top: 6px;
}
.title {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 29px;
  color: #5f5f5f;
  width: 200px;
  text-align: left;
  margin: 0px;
}
.content-p {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 29px;
  color: #1b1b1b;
  margin: 0px;
}
</style>