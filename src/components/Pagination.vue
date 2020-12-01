<template>
  <div class="pagination">
      <div class="prov">
          上一页
      </div>
      <div class="number">1/3</div>
      <div class="next">下一页</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .pagination{
        display: flex;
        width: 100%;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
    }
    .prov{
        width: 93px;
        height: 36px;
        background: #CECECE;
        text-align: center;
        padding: 4px 10px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1B1B1B;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }
    .number{
        width: 100px;
        height: 36px;
        display: flex;
        background: #fff;
        border: 1px solid #5F5F5F;
        margin: 0px 4px;
        justify-content: center;
        align-items: center;
        color: #1B1B1B;
        letter-spacing: 4px;
    }
    .next{
        width: 93px;
        height: 36px;
        background: #014785;
        text-align: center;
        padding: 4px 10px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #fff; 
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }
</style>