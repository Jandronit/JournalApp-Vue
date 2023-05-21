import useAuth from "@/modules/auth/composables/useAuth";

const mockStore = {
  dispatch: jest.fn(),
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
});
