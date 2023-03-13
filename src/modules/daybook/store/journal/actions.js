import journalApi from '@/api/journalApi';

// export const myAction = async ({ commit }) => {
//   // do something
// }

export const loadEntries = async ( { commit } ) => {
    const { data } = await journalApi.get('/entries.json')
    if ( !data ) {
        commit('setEntries', []);
        return
    }
    const entries = []
    for ( let id of Object.keys( data ) ) {
        entries.push({
            id,
            ...data[id]
        })
    }
    commit('setEntries', entries)
}

export const updateEntry = async ({ commit }, entry) => {
    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }

    const resp = await journalApi.put(`/entries/${ entry.id }.json`, dataToSave)

    resp.status === 200 && commit('updateEntry', { ...entry })
}

export const createEntry = async ({ commit }, entry) => {
    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }

    const resp = await journalApi.post(`/entries.json`, dataToSave)

    resp.status === 200 && commit('addEntry', { ...dataToSave, id: resp.data.name })

    return resp.data.name
}

export const deleteEntry = async ({ commit }, id) => {
    const resp = await journalApi.delete(`/entries/${ id }.json`)
    resp.status === 200 && commit('deleteEntry', id)

    return id
}
