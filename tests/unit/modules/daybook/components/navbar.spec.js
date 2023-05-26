import { shallowMount } from "@vue/test-utils";
import Navbar from "@/modules/daybook/components/Navbar.vue";
import { useRouter } from "vue-router";

import createVuexStore from "../../../../mocks/mock-store";

const mockRouter = {
  push: jest.fn(),
};
jest.mock("vue-router", () => ({
  useRouter: jest.fn(),
}));
describe("Tests Navbar Component", () => {
  const store = createVuexStore({
    user: {
      name: "Test",
      email: "test@test.es",
    },
    status: "authenticated",
    idToken: "ABC",
    refreshToken: "XYZ",
  });

  test("should match snapshot", () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
        mocks: {
          $router: useRouter(),
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // test("click on logout, you must close the session and redirect", async () => {
  //   const wrapper = shallowMount(Navbar, {
  //     global: {
  //       plugins: [store],
  //       mocks: {
  //         $router: mockRouter,
  //       },
  //     },
  //   });
  //   await wrapper.find("button").trigger("click");
  //
  //   expect(mockRouter.push).toHaveBeenCalled();
  // });
});
