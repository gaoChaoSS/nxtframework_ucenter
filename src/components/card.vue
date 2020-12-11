<template>
    <div class="info-card">
        <div class="info-title" v-if="title">
            <slot name="header">{{title}}</slot>
        </div>
        <div class="info-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
.info-card{
    background: #fff;
    width: 100%;
    /* height: 200px; */
    padding: 20px 0px;
    margin-top: 20px;
}
.info-title{
    /* font-size: 24px;
    font-weight: 600;
     */
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40px;
    color: #014785;
    padding-left: 60px;
    padding-right: 40px;
    margin-bottom: 20px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    flex-direction: column;
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 0px;
    justify-content:  flex-start;
    align-items: flex-start;
    /* align-items: center; */
    box-sizing: border-box;
    /* flex-wrap: wrap; */
}
</style>