<template>
  <div class="limiter">
    <div
      class="container-login100"
      style="background-image: url('./assets/bg-01.jpg')"
    >
      <div class="wrap-login100 p-t-30 p-b-50">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "AuthLayout",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "../css/auth.css";
@import "../css/util.css";
</style>
