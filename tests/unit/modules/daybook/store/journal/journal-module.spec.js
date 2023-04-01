
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../../mocks/test-journal-state';

const createVuexStore = ( initialState ) =>  createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})
describe('Vuex - Test in the Journal Module', () => {
    // Basics
    test('This initial status, should have this state', async () => {

        const store = createVuexStore( journalState )

        const { isLoading, entries } = store.state.journal

        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries)
    })

    // Mutations
    test('mutations: setEntries', async () => {
        const store = createVuexStore( {isLoading: true, entries: []} )

        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length ).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()

    })
})
