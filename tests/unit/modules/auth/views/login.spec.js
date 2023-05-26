import { shallowMount } from "@vue/test-utils";
import Login from "@/modules/auth/views/Login.vue";
import createVuexStore from "../../../../mocks/mock-store";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe("Tests Login Component", () => {
  const store = createVuexStore({
    status: "not-authenticated",
    user: null,
    idToken: null,
    refreshToken: null,
  });
  store.dispatch = jest.fn();
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

  test("incorrect credentials, dispatch the SWAL ", async () => {
    store.dispatch.mockReturnValueOnce({
      ok: false,
      message: "Bad credentials",
    });

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
        mocks: {
          $router: useRouter(),
        },
      },
    });

    await wrapper.find("form").trigger("submit.prevent");

    expect(store.dispatch).toHaveBeenCalledWith("auth/signInUser", {
      email: "",
      password: "",
    });

    expect(Swal.fire).toHaveBeenCalledWith("Error", "Bad credentials", "error");
  });

  test("correct credentials, should be redirect to route no-entry", async () => {
    store.dispatch.mockReturnValueOnce({
      ok: true,
    });

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
        mocks: {
          $router: useRouter(),
        },
      },
    });

    const [txtEmail, txtPassword] = wrapper.findAll("input");
    await txtEmail.setValue("test@test.es");
    await txtPassword.setValue("123456");

    await wrapper.find("form").trigger("submit.prevent");

    expect(store.dispatch).toHaveBeenCalledWith("auth/signInUser", {
      email: "test@test.es",
      password: "123456",
    });

    expect(Swal.fire).not.toHaveBeenCalled();
  });
});
