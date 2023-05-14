<template>
  <h1 v-if="authStatus === 'authenticating'">{{ authStatus }}</h1>
  <router-view v-else />
</template>
<script>
import useAuth from "@/modules/auth/composables/useAuth";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const { authStatus, checkAuthentication } = useAuth();
    checkAuthentication();
    return {
      authStatus,
    };
  },
});
</script>
