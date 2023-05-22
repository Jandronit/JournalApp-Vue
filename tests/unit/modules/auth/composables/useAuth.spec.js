import useAuth from "@/modules/auth/composables/useAuth";

const mockStore = {
  dispatch: jest.fn(),
  commit: jest.fn(),
};
jest.mock("vuex", () => ({
  useStore: () => mockStore,
}));
describe("Test in useAuth", () => {
  beforeEach(() => jest.clearAllMocks());

  test("createUser success", async () => {
    const { createUser } = useAuth();

    const newUser = { name: "test", email: "test@test.es" };
    mockStore.dispatch.mockReturnValue({ ok: true });

    const response = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser);
    expect(response).toEqual({ ok: true });
  });

  test("createUser error, user already exist", async () => {
    const { createUser } = useAuth();

    const newUser = { name: "test", email: "test@test.es" };
    mockStore.dispatch.mockReturnValue({ ok: false, message: "EMAIL_EXISTS" });

    const resp = await createUser(newUser);
    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser);
    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });
  });

  test("signInUser success", async () => {
    const { signInUser } = useAuth();
    const loginForm = { email: "test@test.es", password: "123456" };
    mockStore.dispatch.mockReturnValue({ ok: true });

    const resp = await signInUser(loginForm);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "auth/signInUser",
      loginForm
    );
    expect(resp).toEqual({ ok: true });
  });

  test("signInUser error", async () => {
    const { signInUser } = useAuth();
    const loginForm = { email: "test@test.es", password: "123456" };
    mockStore.dispatch.mockReturnValue({
      ok: false,
      message: "EMAIL_NOT_FOUND",
    });

    const resp = await signInUser(loginForm);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "auth/signInUser",
      loginForm
    );
    expect(resp).toEqual({
      ok: false,
      message: "EMAIL_NOT_FOUND",
    });
  });

  test("authStatus", async () => {
    const { checkAuthentication } = useAuth();
    mockStore.dispatch.mockReturnValue({ ok: true });

    const resp = await checkAuthentication();
    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/checkAuthentication");
    expect(resp).toEqual({ ok: true });
  });

  test("logout", () => {
    const { logout } = useAuth();
    logout();
    expect(mockStore.commit).toHaveBeenCalledWith("auth/logoutUser");
    expect(mockStore.commit).toHaveBeenCalledWith("journal/clearEntries");
  });
});
