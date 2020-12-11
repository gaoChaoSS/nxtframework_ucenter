<template>
  <div class="button" :class="{'solid': solid}">
    <slot></slot>
  </div>
</template>

<script>
export default {
    props:{
        solid:{
            type: Boolean,
            defalut: false
        },

    }
}
</script>

<style scoped>
.button{
    color: #fff;
    width: 100px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* text-align: center; */
    line-height: 32px;
    /* letter-spacing: 20px; */
    background: #014785;
    font-size: 12px;
}
.solid{
    color: #333;
}
</style>