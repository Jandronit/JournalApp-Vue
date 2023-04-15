import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";

import journal from "@/modules/daybook/store/journal";
import EntryList from "@/modules/daybook/components/EntryList.vue";

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
describe("Test in component EntryList", () => {
  const store = createVuexStore(journalState);
  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryList, {
      props: {
        entry: journalState.entries[0],
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test("It must show the getEntriesByTerm without term and show 2 entries", () => {
    expect(wrapper.findAll("entry-stub").length).toBe(2);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("It must show the getEntriesByTerm and filter the entries", async () => {
    const input = wrapper.find("input");
    await input.setValue("1");
    expect(wrapper.findAll("entry-stub").length).toBe(1);
  });

  test("Should button new redirect to /new ", () => {
    wrapper.find("button").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: "new" },
    });
  });
});
