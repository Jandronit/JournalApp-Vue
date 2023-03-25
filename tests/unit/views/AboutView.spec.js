import { shallowMount } from '@vue/test-utils'
import AboutView from '@/views/AboutView.vue'

describe('Test in component AboutView', () => {
  test('render the component correctly', () => {
    const wrapper = shallowMount(AboutView)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
