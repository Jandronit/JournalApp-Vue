import {shallowMount} from '@vue/test-utils'
import Entry from '@/modules/daybook/components/Entry.vue'
import {journalState} from '../../../../mocks/test-journal-state';

describe('Test in component Entry', () => {
    //mockRouter
    const mockRouter = {
        push: jest.fn()
    }
    const wrapper = shallowMount(Entry, {
        props: {
            entry: journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })

    test('should match with the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('should redirect when clicking on the entry-container', () => {
        wrapper.find('.entry-container').trigger('click')
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({
            name: 'entry',
            params: {
                id: journalState.entries[0].id
            }
        })
    })
    test('show the correct computed properties', () => {
        expect(wrapper.vm.day).toBe(13)
        expect(wrapper.vm.month).toBe('Marzo')
        expect(wrapper.vm.yearDay).toBe('2023, Lunes')
    })
})
