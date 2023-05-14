import { useStore } from "vuex";
import { signInUser } from "@/modules/auth/store/actions";
import { computed } from "vue";

const useAuth = () => {
  const store = useStore();

  const createUser = async (user) => {
    const response = await store.dispatch("auth/createUser", user);
    return response;
  };
  const signInUser = async (user) => {
    const response = await store.dispatch("auth/signInUser", user);
    return response;
  };
  const checkAuthentication = async () => {
    const response = await store.dispatch("auth/checkAuthentication");
    return response;
  };

  return {
    createUser,
    signInUser,
    checkAuthentication,

    authStatus: computed(() => store.getters["auth/authStatus"]),
  };
};
export default useAuth;
