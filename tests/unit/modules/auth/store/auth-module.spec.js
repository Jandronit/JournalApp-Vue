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
});
