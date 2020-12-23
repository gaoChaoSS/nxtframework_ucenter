<template>
  <img :src="ImgSrc" alt="" class="preview">
</template>

<script>
export default {
    props: {
        ImgSrc: {
            default: '',
            type: String
        }
    }
}
</script>
