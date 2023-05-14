import initialStateFake from "../../../../mocks/auth-initialState";
import createVuexStore from "../../../../mocks/mock-store";
import authApi from "@/api/authApi";

describe("Vuex - Test in the Auth Module", () => {
  test("initial state", () => {
    const store = createVuexStore(initialStateFake);
    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticating");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });

  // Mutations
  test("mutations: loginUser", () => {
    const store = createVuexStore(initialStateFake);
    const payload = {
      user: {
        name: "Test",
        email: "test@test.es",
      },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    };

    store.commit("auth/loginUser", payload);

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toEqual(payload.user);
    expect(idToken).toBe(payload.idToken);
    expect(refreshToken).toBe(payload.refreshToken);
  });

  test("mutations: logoutUser", () => {
    const store = createVuexStore({
      status: "authenticated",
      user: { name: "Test", email: "test@test.es" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    });
    localStorage.setItem("idToken", "ABC-123");
    localStorage.setItem("refreshToken", "XYZ-123");

    store.commit("auth/logoutUser");

    expect(store.state.auth.status).toBe("not-authenticated");
    expect(store.state.auth.user).toBe(null);
    expect(store.state.auth.idToken).toBe(null);
    expect(store.state.auth.refreshToken).toBe(null);

    expect(localStorage.getItem("idToken")).toBe(null);
    expect(localStorage.getItem("refreshToken")).toBe(null);
  });

  // Getters
  test("getters: userName currentState", () => {
    const store = createVuexStore({
      status: "authenticated",
      user: { name: "Test", email: "test@test.es" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    });

    expect(store.getters["auth/currentState"]).toBe("authenticated");
    expect(store.getters["auth/userName"]).toBe("Test");
  });

  // Actions
  test("Actions: createUser - Error user exist", async () => {
    const store = createVuexStore(initialStateFake);
    const newUser = {
      name: "test",
      email: "test@test.es",
      password: "123456",
    };

    // Preparamos la respuesta del mock de authApi(Firebase)
    const dataFailFake = {
      data: {
        error: {
          message: "EMAIL_EXISTS",
        },
      },
    };

    // Simulamos la llamada y respuesta del mock de authApi(Firebase)
    authApi.post = jest.fn();
    authApi.post.mockReturnValueOnce(
      Promise.reject({ response: dataFailFake })
    );

    const resp = await store.dispatch("auth/createUser", newUser);
    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });
  });
});
