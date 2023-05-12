import authApi from "@/api/authApi";

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;
  try {
    const { data } = await authApi.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });
    // TODO: Mutation: loginUser
    return { ok: true, message: "User created" };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};
