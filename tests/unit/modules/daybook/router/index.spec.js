import daybookRouter from '@/modules/daybook/router'
describe('Test in router module to Daybook', () => {
    test('the router must have this configuration', async () => {
        expect(daybookRouter).toMatchObject({
            name: 'daybook',
            component: expect.any(Function),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any(Function)
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any(Function),
                    props: expect.any(Function)
                }
            ]
        })
        const promiseRoutes = []
        daybookRouter.children.forEach(child => promiseRoutes.push(child.component()))

        const routes = (await Promise.all(promiseRoutes)).map(promise => promise.default.name)

        expect(routes).toContain('NoEntrySelected')
        expect(routes).toContain('EntryView')

    })

    test('should return the id of the route', async () => {
        const route = {
            params: {
                id: 'ABC-123'
            }
        }

        const entryRoute = daybookRouter.children.find(child => child.name === 'entry')
        expect(entryRoute.props(route)).toEqual({ id: 'ABC-123' })
    })
})
