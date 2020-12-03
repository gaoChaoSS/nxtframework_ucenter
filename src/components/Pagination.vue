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
        width: 80px;
        height: 32px;
        background: #CECECE;
        text-align: center;
        padding: 4px 4px;
        font-size: 10px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1B1B1B;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }
    .number{
        width: 80px;
        height: 32px;
        display: flex;
        background: #fff;
        border: 1px solid #5F5F5F;
        margin: 0px 4px;
        justify-content: center;
        align-items: center;
        color: #1B1B1B;
        letter-spacing: 4px;
        font-size:10px;

    }
    .next{
        width: 80px;
        height: 32px;
        background: #014785;
        text-align: center;
        padding: 4px 10px;
        font-size: 10px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #fff; 
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }
</style>