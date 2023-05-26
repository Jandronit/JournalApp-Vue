import { shallowMount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import Login from "@/modules/auth/views/Login.vue";
import createVuexStore from "../../../../mocks/mock-store";
jest.mock("vue-router", () => ({
  useRouter: jest.fn(),
}));

describe("Tests Login Component", () => {
  const store = createVuexStore({
    status: "not-authenticated",
    user: null,
    idToken: null,
    refreshToken: null,
  });
  beforeEach(() => jest.clearAllMocks());

  test("should match snapshot", () => {
    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
        mocks: {
          $router: useRouter(),
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
