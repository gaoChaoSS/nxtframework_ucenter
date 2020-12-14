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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="一级下家" name="first" :item="0">
          <el-table
            ref="singleTable"
            :data="lists[0]"
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              type="datelineReadable"
              label="注册时间"
              width="300"
            />
            <el-table-column property="amount" label="用户名" width="320" />
            <el-table-column property="typeText" label="下家数"  width="320"/>
          </el-table>
          <Pagination
            @handleNumber="changeNumber($event)"
            :number="number[0]"
            :item="0"
          />
        </el-tab-pane>
        <el-tab-pane label="二级下家" name="second" :item="1">
          <el-table
            ref="singleTable"
            :data="lists[0]"
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              type="datelineReadable"
              label="注册时间"
              width="300"
            />
            <el-table-column property="amount" label="用户名" width="320" />
            <el-table-column property="typeText" label="下家数" width="320" />
          </el-table>
          <Pagination
            @handleNumber="changeNumber($event)"
            :number="number[1]"
            :item="1"
          />
        </el-tab-pane>
        <el-tab-pane label="三级下家" name="third" :item="2">
          <el-table
            ref="singleTable"
            :data="lists[0]"
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              type="datelineReadable"
              label="注册时间"
              width="300"
            />
            <el-table-column property="amount" label="用户名" width="320" />
            <el-table-column property="typeText" label="下家数" width="320" />
          </el-table>
          <Pagination
            @handleNumber="changeNumber($event)"
            :number="number[2]"
            :item="2"
          />
        </el-tab-pane>
      </el-tabs>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/card";
import Pagination from "@/components/Pagination";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      number: [1, 1, 1],
      lists: [[], [], []],
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
    Pagination,
  },
  computed: {
    ...mapState({
      balanceTotal: (state) => state.balance.balanceTotal,
    }),
  },
  created() {
    this.$store.dispatch("balance/detail");
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
</style>