<script>
import { defineComponent } from "vue";
import useAuth from "@/modules/auth/composables/useAuth";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Navbar",
  setup() {
    const router = useRouter();
    const { username, logout } = useAuth();
    return {
      username,
      onLogout: () => {
        router.push({ name: "login" });
        logout();
      },
    };
  },
});
</script>
<template>
  <nav class="navbar bg-primary">
    <a class="navbar-brand text-white" href="">
      <img
        src="@/assets/logo.png"
        alt="Vue logo"
        height="24"
        class="d-inline-block align-text-top mx-2"
      />
      {{ username }}
    </a>

    <div class="d-flex">
      <button @click="onLogout" class="btn btn-outline-light mx-2">
        <i class="fas fa-sign-out-alt"></i>
      </button>
      <button class="btn btn-outline-light mx-2">Register</button>
    </div>
  </nav>
</template>
