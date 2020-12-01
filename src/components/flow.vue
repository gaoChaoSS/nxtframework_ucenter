<template>
  <div class="flow">
    <div class="flow-item">
      <img  :src="icon" class="flow-icon" />
      <p class="title">{{ title }}</p>
      <img :src="arrorImg" alt="" class="flow-arror" v-if="arrorImg" />
    </div>
    <div class="time">{{ time }}</div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    arrorImg: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.flow {
  display: flex;
  flex-direction: column;
  width: 260px;
  margin-left: 20px;
  /* align-items: center; */
}
.flow-item {
    display: flex;
    /* flex-direction: column; */
    width: 260px;
    align-items: center;
    margin-bottom: 6px;
    height: 80px;
}
.flow-arror {
    padding: 10px 6px;
    height: 60px;
    box-sizing: border-box;
}
.time{
    width: 100%;    
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 26px;
    color: #5F5F5F;
}
.flow-icon{
    width: 40px;
    height: 40px;
}
.title{
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 31px;
    color: #014785;
    padding: 0px;
    margin: 0px;
    width: 130px;
    margin-left: 18px;
}
</style>