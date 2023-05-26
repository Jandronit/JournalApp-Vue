import { shallowMount } from "@vue/test-utils";
import Navbar from "@/modules/daybook/components/Navbar.vue";
import createVuexStore from "../../../../mocks/mock-store";

const mockRouter = {
  push: jest.fn(),
};
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
