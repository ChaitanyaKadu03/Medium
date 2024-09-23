import { Hono } from 'hono'

const app = new Hono()

app.get('/:id', async (c) => {
    const theId = c.req.param('id')

    return c.text(theId)
    // return c.text("Hello")
})

export default app