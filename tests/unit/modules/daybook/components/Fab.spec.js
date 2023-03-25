import  { shallowMount } from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab.vue'

describe('Test in component Fab', () => {
  test('debe de mostrar el icono por defecto', () => {
    const wrapper = shallowMount(Fab)
    const icon = wrapper.find('i')

    expect(icon.classes('fa-plus')).toBeTruthy()
  })
  test('should display the icon per argument: fa-circle', () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: 'fa-circle'
      }
    })
    const icon = wrapper.find('i')

    expect(icon.classes('fa-circle')).toBeTruthy()
  })
  test('must emit the on:click event on click', () => {
    const wrapper = shallowMount(Fab)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('on:click')).toHaveLength(1)
  })
})
