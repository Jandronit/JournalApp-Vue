import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";

import journal from "@/modules/daybook/store/journal";
import EntryView from "@/modules/daybook/views/EntryView.vue";

import { journalState } from "../../../../mocks/test-journal-state";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });
describe("Test in component EntryView", () => {
  const store = createVuexStore(journalState);
  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: journalState.entries[0].id,
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test("You must remove the user because the id does not exist", () => {
    shallowMount(EntryView, {
      props: {
        id: "ID not exists in the store",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });

  test("You must show the entry", () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
