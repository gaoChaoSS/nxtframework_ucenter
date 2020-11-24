<template>
  <div>login12312111</div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "nxtframework.com",
      },
    };
  },
  created() {
    console.log(this.$store.getters.token);
    this.$store.dispatch("user/login", this.loginForm)
      .then(() => {
        console.log('yes');
        console.log(this.$store);
        // this.$store.dispatch("user/logout")
        //   .then(() => {
        //     console.log('yes')
        //     // console.log(this.$store.getters.token)
        //   })
        //   .catch(() => {
        //     console.log("no");
        //   })
      })
      .catch(() => {
        console.log('no');
        // this.loading = false;
      });
    
  },
};
</script>

<style>
</style>