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
  width: 200px;
  margin-left: 20px;
  /* align-items: center; */
}
.flow-item {
    display: flex;
    /* flex-direction: column; */
    width: 200px;
    align-items: center;
    margin-bottom: 2px;
    height: 30px;
}
.flow-arror {
    padding: 2px 2px;
    height: 30px;
    box-sizing: border-box;
}
.time{
    width: 100%;    
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 26px;
    color: #5F5F5F;
}
.flow-icon{
    width: 22px;
    height: 22px;
}
.title{
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 31px;
    color: #014785;
    padding: 0px;
    margin: 0px;
    width: 120px;
    margin-left: 8px;
}
</style>