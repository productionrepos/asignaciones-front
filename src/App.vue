<template>
  <Login v-if="!logged"></Login>
  <Home v-else></Home>
</template>

<script>

import Login from "@/views/Login";
import Home from "@/views/Home";
export default {
  name: 'App',
  components: {Home, Login},
  data: () => ({
    //
  }),
  computed: {
    logged() {
      return this.$store.getters['logged'];
    }
  }

};
</script>
