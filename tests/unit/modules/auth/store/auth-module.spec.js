import initialStateFake from "../../../../mocks/auth-initialState";
import createVuexStore from "../../../../mocks/mock-store";

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
});
