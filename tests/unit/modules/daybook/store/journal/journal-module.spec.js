
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
    test('mutations: setEntries',  () => {
        const store = createVuexStore( {isLoading: true, entries: []} )

        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length ).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()

    })
    test('mutations: updateEntry',  () => {
        const store = createVuexStore( journalState )

        const updatedEntry = {
            id: "-NQR_93QmkLPzTzQPdY0",
            date: 1678737966001,
            text: "Hola mundo desde las pruebas"
        }

        store.commit('journal/updateEntry', updatedEntry)

        const entries = store.state.journal.entries
        expect(entries.length).toBe(2)
        expect(entries).toEqual( expect.arrayContaining([ updatedEntry ]) )
    })
    test('mutations: addEntry deleteEntry',  () => {
        const store = createVuexStore( journalState )

        const newEntry = {
            id: "-NQRmzEsKr2E6KwDXqW1",
            date: 1678741597748,
            text: "Hola mundo 3"
        }
        store.commit('journal/addEntry', newEntry)

        const stateEntries = store.state.journal.entries

        expect(stateEntries.length).toBe(3)
        expect(stateEntries).toEqual( expect.arrayContaining([ newEntry ]) )

        store.commit('journal/deleteEntry', newEntry.id)
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries).toEqual( expect.not.arrayContaining([ newEntry ]) )

    })
})
