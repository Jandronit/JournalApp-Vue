import { useStore } from "vuex";
const useAuth = () => {
  const store = useStore();

  const createUser = async (user) => {
    console.log(store);
    console.log("user", user);
  };

  return {
    createUser,
  };
};
export default useAuth;
