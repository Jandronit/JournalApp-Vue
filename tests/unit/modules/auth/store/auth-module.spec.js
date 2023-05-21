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
  test("Actions: createUser - Error user already exists", async () => {
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

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticating");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });

  test("Actions: createUser - signInUser", async () => {
    const store = createVuexStore(initialStateFake);
    const newUser = {
      name: "test",
      email: "test@test.es",
      password: "123456",
    };
    // Preparamos la respuesta del mock de authApi(Firebase)
    const dataSuccessFake = {
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    };

    // Simulamos la llamada y respuesta del mock de authApi(Firebase)
    authApi.post = jest.fn();
    authApi.post.mockReturnValueOnce(
      Promise.resolve({ data: dataSuccessFake })
    );

    const resp = await store.dispatch("auth/createUser", newUser);

    expect(resp).toEqual({ ok: true, message: "User created" });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toEqual({ name: newUser.name, email: newUser.email });
    expect(idToken).toBe(dataSuccessFake.idToken);
    expect(refreshToken).toBe(dataSuccessFake.refreshToken);
  });

  test("Actions:  checkAuthentication - Positive", async () => {
    const store = createVuexStore(initialStateFake);

    // Preparamos la respuesta del mock de authApi(Firebase)
    const dataSuccessFake = {
      displayName: "test",
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
      users: [
        {
          displayName: "test",
          email: "test@test.es",
        },
      ],
    };

    // Simulamos la llamada y respuesta del mock de authApi(Firebase)
    authApi.post = jest.fn();
    authApi.post.mockReturnValueOnce(
      Promise.resolve({ data: dataSuccessFake })
    );

    const signInResp = await store.dispatch("auth/signInUser", {
      email: "test@test.es",
      password: "123456",
    });
    const { idToken } = store.state.auth;
    store.commit("auth/logoutUser");

    localStorage.setItem("idToken", idToken);

    // Simulamos la llamada y respuesta del mock de authApi(Firebase)
    authApi.post = jest.fn();
    authApi.post.mockReturnValueOnce(
      Promise.resolve({ data: dataSuccessFake })
    );

    const checkResp = await store.dispatch("auth/checkAuthentication");
    const { status, user, idToken: token } = store.state.auth;

    expect(checkResp).toEqual({ ok: true });
    expect(status).toBe("authenticated");
    expect(user).toEqual({
      name: dataSuccessFake.displayName,
      email: "test@test.es",
    });
    expect(token).toBe(dataSuccessFake.idToken);
  });

  test("Actions:  checkAuthentication - Negative", async () => {
    const store = createVuexStore(initialStateFake);

    localStorage.removeItem("idToken");
    const checkResp = await store.dispatch("auth/checkAuthentication");
    expect(checkResp).toEqual({ ok: false, message: "No token" });
    expect(store.state.auth.status).toBe("not-authenticated");

    // Preparamos la respuesta del mock de authApi(Firebase)
    const dataFailFake = {
      data: {
        error: {
          message: "INVALID_ID_TOKEN",
        },
      },
    };

    // Simulamos la llamada y respuesta del mock de authApi(Firebase)
    authApi.post = jest.fn();
    authApi.post.mockReturnValueOnce(
      Promise.reject({ response: dataFailFake })
    );

    localStorage.setItem("idToken", "ABC-123");
    const checkResp2 = await store.dispatch("auth/checkAuthentication");
    expect(checkResp2).toEqual({ ok: false, message: "INVALID_ID_TOKEN" });
  });
});
